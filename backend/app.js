import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { SerpAPILoader } from "langchain/document_loaders/web/serpapi";
import OpenAI from "openai";

import { mongoDBConnection } from "./config/db.connection.js";
import { router } from "./routes/index.js";
import cookikeParser from "cookie-parser";
import { accidentservice } from "./Services/AccidentService.js";
import { schedule } from "node-cron";
import cors from "cors";
import { getJson } from "serpapi";

mongoDBConnection();
app.use(express.urlencoded());
app.use(express.json());
app.use(cookikeParser());
app.use(cors());
app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on ${process.env.PORT}`);
});

async function scrapeOld() {
  try {
    const result = await getJson({
      engine: "google_news",
      api_key: process.env.SERPAPI_KEY,
      q: "aydın trafik kazaları www.aydindenge.com.tr EKİM 2023",
    });

    for await (let link of result.news_results) {
      console.log(link);
      if (link.position <= 30 && link.position > 22) {
        const htmlloader = new CheerioWebBaseLoader(link.link, {
          selector: "p,time,span.date",
        });
        const docs = await htmlloader.load();
        console.log(docs[0].pageContent);
        if (docs[0].pageContent) {
          const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-1106",
            max_tokens: 500,
            messages: [
              {
                role: "system",
                content:
                  "You are a helpful assistant designed to output like : title: { type: String , `kazanın başlığı gibi düşünebilirsin.` },detail_location :{type : String}description: { type: String },date: { type: date, yoksa hiç girme},license_plate: [{type:String},yoksa boş array olsun.], JSON.",
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
          let data = JSON.parse(completion.choices[0].message.content);
          await accidentservice.insert(data);
        }
      }
    }
  } catch (err) {
    console.log(`Hata meydana geldi`);
  }
}
//scrapeOld();

let date = new Date();
date.setDate(date.getDate() - 1);
let query = `Aydın trafik kazaları ${date.toLocaleDateString()}`;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log(query);

async function getResponse() {
  try {
    let links = [];
    let searchs = [];

    const loader = new SerpAPILoader({
      q: query,
      apiKey: process.env.SERPAPI_KEY,
    });
    const documents = await loader.load();

    documents.forEach((d) => {
      links.push(JSON.parse(d.pageContent).link);
    });

    //console.log(links);
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
    //console.log(searchs);

    for await (let link of searchs) {
      console.log(searchs);
      const htmlloader = new CheerioWebBaseLoader(link, {
        selector: "p,time",
      });
      const docs = await htmlloader.load();
      console.log(docs[0].pageContent);
      if (docs[0].pageContent) {
        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo-1106",
          max_tokens: 500,
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant designed to output like : title: { type: String , `kazanın başlığı gibi düşünebilirsin.` },detail_location :{type : String}description: { type: String },date: { type: date, yoksa hiç girme},license_plate: [{type:String}], JSON.",
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
        let data = JSON.parse(completion.choices[0].message.content);
        await accidentservice.insert(data);
      }
    }
  } catch (err) {
    console.log(`Hata meydana geldi.${err}`);
  }
}

schedule("0 0 * * *", () => {
  getResponse();
});
