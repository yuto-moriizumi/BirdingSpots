"use server";

import { Spot } from "@/model/Spot";
import { JSDOM } from "jsdom";
import { imgToMonthRecord } from "./img2numbers";
import { SpotBird } from "@/model/SpotBird";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 何ページ目まで取得するか
const MAX_PAGE = 2;

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

/** 指定したスポットIDの野鳥情報をMAX_PAGE目まで取得する */
export async function getSpotBirds(id: string) {
  return Promise.all(
    [...new Array(MAX_PAGE)].map((_, i) => getSpotBirdsByPage(id, i + 1))
  ).then((arr) => arr.flat());
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

/** @param page 1-indexed */
async function getSpotBirdsByPage(
  id: string,
  page: number
): Promise<SpotBird[]> {
  const response = await fetch(
    `https://zoopicker.com/places/${id}/birds?page=${page}`
  );
  if (!response.ok) return [];
  const data = await response.text();
  const dom = new JSDOM(data);
  const document = dom.window.document;
  const birdList: SpotBird[] = [];
  const listDiv = document.querySelector("div.list.mobile-list");
  if (!listDiv) return [];
  listDiv.querySelectorAll("div.bird-list.list-item").forEach((div) => {
    const birdId =
      div.querySelector("a.link")?.getAttribute("href")?.split("/")[2] || "";
    const birdName = div.querySelector("span")?.textContent || "";
    const birdImageUrl = div.querySelector("img")?.getAttribute("src") || "";

    // 出現率情報を取得する
    const svg = div.querySelector("svg.frequency-graph");
    if (!svg) return;
    const monthElements = Array.from(svg.querySelectorAll("g"));
    const monthHeights: [number, number, number][] = [];
    for (let i = 0; i < monthElements.length; i += 4) {
      const monthParts = monthElements.slice(i + 1, i + 4);
      const frequencies = monthParts.map((part) => {
        const height =
          part.querySelector<SVGRectElement>("rect.frequency")?.style.height ||
          "0%";
        // height値の%は確率の半分の値になっているので、2倍してから百分率にする
        // 非常に小さくても0.1%は表示するように切り上げる
        return Math.ceil(parseFloat(height) * 2 * 10) / 1000;
      }) as [number, number, number];
      monthHeights.push(frequencies);
    }

    birdList.push({
      id: parseInt(birdId),
      name: birdName,
      imageUrl: birdImageUrl,
      JanFrequency: monthHeights[0],
      FebFrequency: monthHeights[1],
      MarFrequency: monthHeights[2],
      AprFrequency: monthHeights[3],
      MayFrequency: monthHeights[4],
      JunFrequency: monthHeights[5],
      JulFrequency: monthHeights[6],
      AugFrequency: monthHeights[7],
      SepFrequency: monthHeights[8],
      OctFrequency: monthHeights[9],
      NovFrequency: monthHeights[10],
      DecFrequency: monthHeights[11],
    });
  });
  return birdList;
}
