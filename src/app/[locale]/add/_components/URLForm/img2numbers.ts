import { MonthRecord } from "@/model/MonthRecord";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "@langchain/core/messages";
import { z } from "zod";

const MonthRecordSchema = z.object({
  Jan: z.number(),
  Feb: z.number(),
  Mar: z.number(),
  Apr: z.number(),
  May: z.number(),
  Jun: z.number(),
  Jul: z.number(),
  Aug: z.number(),
  Sep: z.number(),
  Oct: z.number(),
  Nov: z.number(),
  Dec: z.number(),
});

const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "gemini-3-flash-preview",
}).withStructuredOutput(MonthRecordSchema);

/** 1月～12月の各月に1つの数字が含まれる画像をdataURL形式で受け取り、AIで認識し、JSONとして返却する */
export async function imgToMonthRecord(dataURL: string): Promise<MonthRecord> {
  const message = new HumanMessage({
    content: [
      {
        type: "text",
        text: "画像はグラフです。各月に対応する数字を読み取ってください。",
      },
      { type: "image_url", image_url: { url: dataURL } },
    ],
  });
  const response = await model.invoke([message]);
  return response;
}
