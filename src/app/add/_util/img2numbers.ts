import { MonthRecord } from "@/model/MonthRecord";
import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";

export function img2numbers(img: string): number {
  return img.length;
}

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

const model = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  model: "gpt-4o-2024-11-20",
}).withStructuredOutput(MonthRecordSchema);

export async function imgToMonthRecord(dataURL: string): Promise<MonthRecord> {
  const response = await model.invoke(
    `次の画像は各月の数値を表す棒グラフです。各月の数値を取得してください。\n${dataURL}`
  );
  return response;
}
