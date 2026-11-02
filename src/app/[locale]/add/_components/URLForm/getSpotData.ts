"use server";

import { Spot } from "@/model/Spot";
import { prisma } from "@/lib/prisma";
import { getSpotPageInfo } from "../../../_util/getSpotPageInfo";
import { getSpotBirds } from "../../../_util/getSpotBirds";

export async function getSpotData(
  id: string
): Promise<Omit<Spot, "id" | "updatedAt" | "heatIndexId"> & { heatIndexId: string }> {
  try {
    const [pageInfo, birds] = await Promise.all([
      getSpotPageInfo(id),
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
      name: pageInfo.name,
      address: pageInfo.address,
      ...pageInfo.monthlyCounts,
      heatIndexId: "",
      birds,
    };
  } catch (error) {
    console.error("Error fetching URL:", error);
    throw new Error("Failed to fetch URL");
  }
}
