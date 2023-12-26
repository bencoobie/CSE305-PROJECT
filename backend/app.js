import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();

import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { SerpAPILoader } from "langchain/document_loaders/web/serpapi";
import OpenAI from "openai";
import { examples } from "./dummyNews.js";

const outputSchema = {
  reason: "Reason of accident",
  location: "District/Town/City",
  date_time: "Date of accident",
};

import { mongoDBConnection } from "./config/db.connection.js";
import { router } from "./routes/index.js";
import cookikeParser from "cookie-parser";
mongoDBConnection();
app.use(express.urlencoded());
app.use(express.json());
app.use(cookikeParser());
app.use(router);


app.listen(process.env.PORT, () => {
  console.log(`Server listening on ${process.env.PORT}`);
});


let date = new Date();
date.setDate(date.getDate() - 1);
let query = `Aydın trafik kazaları ${date.toLocaleDateString()}`;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log(query);
let searchs = [];
async function getResponse() {
  let links = [];
  if (searchs.length < 1) {
    const loader = new SerpAPILoader({
      q: query,
      apiKey: process.env.SERPAPI_KEY,
    });
    const documents = await loader.load();

    documents.forEach((d) => {
      links.push(JSON.parse(d.pageContent).link);
    });
  }
  console.log(links);
  const filteredLinks = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    max_tokens: 500,
    messages: [
      {
        role: "system",
        content:
          "You are accident detector.Your purpose is detect accidents which happened only in Aydın and filter duplicate news(just give one of them from duplicate news) from given news links and response as a JSON output.Please be aware of that accidents happened in Aydın!",
      },
      {
        role: "user",
        content: `${links}`,
      },
    ],
    response_format: { type: "json_object" },
    temperature: 0,
  });

  JSON.parse(filteredLinks.choices[0].message.content).accidents.forEach(
    (l) => {
      searchs.push(l.source);
    }
  );

  //console.log(JSON.parse(searchs[0].pageContent));
  console.log(searchs);

  for await (let link of searchs) {
    const htmlloader = new CheerioWebBaseLoader(link, {
      selector: "p,time",
    });
    const docs = await htmlloader.load();
    //console.log(docs);
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      max_tokens: 500,
      messages: [
        {
          role: "system",
          content: `You are accident summarizer.Your main tasks are these below:
          1-Just give me a reason of an accident,accident location and accident date/time like this schema ${outputSchema} from given accident new.
          2-If any of these infos not given just put it as N/A except date/time.
          3-If date time not exist on given accident new put date of ${query}.      
          4- Give me output JSON.There is a output example ${examples}`,
        },
        {
          role: "user",
          content: `${docs[0].pageContent}`,
        },
      ],
      temperature: 0,
      response_format: { type: "json_object" },
    });

    console.log(completion.choices[0]);
  }
}
//getResponse();

