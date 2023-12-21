import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { SerpAPILoader } from "langchain/document_loaders/web/serpapi";
import OpenAI from "openai";

const outputSchema = {
  reason: "Reason of accident",
  location: "District/Town/City",
  date: "Date of accident",
};

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
    console.log("first");
    const loader = new SerpAPILoader({
      q: query,
      apiKey: process.env.SERPAPI_KEY,
    });
    const documents = await loader.load();

    documents.forEach((d) => {
      links.push(JSON.parse(d.pageContent).link);
    });
  }

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

  //console.log(searchs);
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
    console.log(docs);
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      max_tokens: 500,
      messages: [
        {
          role: "system",
          content: `You are accident summarizer.Just give me a reason of an accident,accident location and accident date/time like this schema ${outputSchema}.If any of these infos not given just put it as N/A.`,
        },
        {
          role: "user",
          content: `${docs[0].pageContent}`,
        },
      ],
      temperature: 0,
    });

    console.log(completion.choices[0]);
  }
}
getResponse();
