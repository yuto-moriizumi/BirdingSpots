"use server";

import { Spot } from "@/model/Spot";
import { JSDOM } from "jsdom";
import { imgToMonthRecord } from "./img2numbers";
import { PrismaClient } from "@prisma/client";
import { getSpotBirds } from "../../../_util/getSpotBirds";

const prisma = new PrismaClient();

export async function getSpotData(
  id: string,
  dataURL: string
): Promise<Omit<Spot, "id">> {
  try {
    const [basicInfo, monthRecord, birds] = await Promise.all([
      getBasicInfo(id),
      imgToMonthRecord(dataURL),
      getSpotBirds(id),
    ]);

    // 鳥情報を追加する
    await prisma.bird.createMany({
      data: birds.map((bird) => ({
        id: bird.id,
        name: bird.name,
        imageUrl: bird.imageUrl,
      })),
      skipDuplicates: true,
    });

    return {
      ...basicInfo,
      ...monthRecord,
      birds,
    };
  } catch (error) {
    console.error("Error fetching URL:", error);
    throw new Error("Failed to fetch URL");
  }
}

async function getBasicInfo(id: string): Promise<{
  name: string;
  address: string;
}> {
  const response = await fetch(`https://zoopicker.com/places/${id}`);
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
