"use server";

import { Spot } from "@/model/Spot";
import { JSDOM } from "jsdom";
import { imgToMonthRecord } from "./img2numbers";

export async function getSpotData(url: string): Promise<Omit<Spot, "id">> {
  try {
    const response = await fetch(url);
    const data = await response.text();
    const dom = new JSDOM(data);
    const document = dom.window.document;
    const h1Text = document.querySelector("h1")?.textContent || "";
    const address =
      document.querySelector("article div:nth-child(2)")?.textContent || "";
    const canvas = document.getElementsByTagName("canvas");
    if (canvas.length === 0) throw new Error("Canvas not found");
    const canvasImageData = canvas[0].toDataURL("image/png");
    const monthRecord = await imgToMonthRecord(canvasImageData);
    return {
      name: h1Text,
      address: address,
      ...monthRecord,
    };
  } catch (error) {
    console.error("Error fetching URL:", error);
    throw new Error("Failed to fetch URL");
  }
}
