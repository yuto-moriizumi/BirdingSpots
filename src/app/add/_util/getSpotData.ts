"use server";

import { Spot } from "@/model/Spot";
import { JSDOM } from "jsdom";
import { imgToMonthRecord } from "./img2numbers";

export async function getSpotData(
  url: string,
  dataURL: string
): Promise<Omit<Spot, "id">> {
  try {
    const [basicInfo, monthRecord] = await Promise.all([
      getBasicInfo(url),
      imgToMonthRecord(dataURL),
    ]);
    return {
      ...basicInfo,
      ...monthRecord,
    };
  } catch (error) {
    console.error("Error fetching URL:", error);
    throw new Error("Failed to fetch URL");
  }
}

async function getBasicInfo(url: string) {
  const response = await fetch(url);
  const data = await response.text();
  const dom = new JSDOM(data);
  const document = dom.window.document;
  const h1Text = document.querySelector("h1")?.textContent || "";
  const address =
    document.querySelector("article > div.mb-s")?.textContent || "";
  return {
    name: h1Text,
    address: address,
  };
}
