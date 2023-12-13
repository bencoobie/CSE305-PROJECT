import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { ChatOpenAI } from "langchain/chat_models/openai";
import zod from "zod";
import { loadSummarizationChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";
import { mongoDBConnection } from "./config/db.connection.js";
import { router } from "./routes/index.js";
mongoDBConnection();
// const zodSchema = zod.object({
//   kaza_il: zod.string().optional(),
//   kaza_ilçe: zod.string().optional(),
// });
app.use(express.urlencoded());
app.use(express.json());
app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on ${process.env.PORT}`);
});

/*onst schema={
    "properties":{
        "where_traffic_accident_happened":{"type":"string"},
        "reason_of_accident":{"type":"string"}
    },
    "required":["where_traffic_accident_happened","reason_of_accident   "]
}
*/

// async function getData() {
//   /*const response=await axios.get('https://www.aydindenge.com.tr/aydin/17/10/2023/aydinda-feci-kaza-1-kisi-oldu-2-kisi-yaralandi')

// const $=cheerio.load(response.data)
// const p=$('p').text()
// console.log(p)*/
//   const loader = new CheerioWebBaseLoader(
//     "https://www.aydindenge.com.tr/aydin/17/10/2023/aydinda-feci-kaza-1-kisi-oldu-2-kisi-yaralandi",
//     {
//       selector: "p",
//     }
//   );
//   const docs = await loader.load();

//   const llm = new ChatOpenAI({
//     temperature: 0,
//     openAIApiKey: process.env.OPENAI_API_KEY,
//     modelName: "gpt-3.5-turbo",
//   });
//   /*
// const cevap=await createExtractionChain(zodSchema,llm).run(docs[0].pageContent)
// console.log(cevap)*/
//   const prompt = PromptTemplate.fromTemplate(
//     "Sana verilen haberden sadece kazanın yerini ve kazanın sebebini bana ver."
//   );

//   const chain = loadSummarizationChain(llm, { type: "stuff" });
//   const cevap = await chain.run(docs);
//   console.log(docs[0].pageContent);
//   console.log(cevap);
// }
// getData();
