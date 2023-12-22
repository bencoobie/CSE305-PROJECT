import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { ChatOpenAI } from "langchain/chat_models/openai";
import zod from "zod";
import { loadSummarizationChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";
import OpenAI from "openai";

async function getData() {
  let openai = new OpenAI();
  const zodSchema = zod.object({
    kaza_il: zod.string().optional(),
    kaza_ilçe: zod.string().optional(),
  });
  /*const response=await axios.get('https://www.aydindenge.com.tr/aydin/17/10/2023/aydinda-feci-kaza-1-kisi-oldu-2-kisi-yaralandi')
  const $=cheerio.load(response.data)
  const p=$('p').text()
  console.log(p)*/
  const loader = new CheerioWebBaseLoader(
    "https://www.aydinhedef.com.tr/aydinda-iki-otomobil-carpisti-6-yarali-59511h.htm",
    {
      selector: "p",
    }
  );
  const docs = await loader.load();
  console.log(docs[0].pageContent);
  const llm = new ChatOpenAI({
    temperature: 0,
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: "gpt-3.5-turbo",
  });
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant designed to output like : title: { type: String , `kısaca kaza özeti` },x_coordinat: { type: String },x_coordinat: { type: String },detail_location :{type : String}description: { type: String },date: { type: String },license_plate: [{type:String}], JSON.",
      },
      {
        role: "user",
        content: ` asagidaki paragraftan bana kazanın detaylı google maps x y koordinatlarını  ,  plaka  varsa plakayı ve kazanın kısaca nedne olduğunu söyle ${docs[0].pageContent}`,
      },
    ],
    model: "gpt-3.5-turbo-1106",
    response_format: { type: "json_object" },
  });
  return completion.choices[0].message.content;
}
export { getData };
