"use server";

import { prisma } from "@/lib/prisma";
import { upsertSpot } from "../../_util/upsertSpot";
import { getSpotPageInfo } from "../../_util/getSpotPageInfo";
import { getSpotBirds } from "../../_util/getSpotBirds";

/** 指定したスポットの野鳥情報と月ごとの人気度を更新する */
export async function updateSpot(id: string) {
  const [spotBirds, pageInfo] = await Promise.all([
    getSpotBirds(id),
    // 人気度の取得に失敗しても、野鳥情報の更新は続行する
    getSpotPageInfo(id).catch((error) => {
      console.error(`Failed to fetch spot page info for ${id}:`, error);
      return null;
    }),
  ]);
  // 野鳥情報が1件も取得できなかった場合は更新しない (既存データが失われるのを防ぐため)
  if (spotBirds.length === 0) return false;
  const spot = await prisma.spot.findUnique({ where: { id } });
  if (spot === null) throw new Error("Spot not found");
  await prisma.bird.createMany({
    data: spotBirds.map((bird) => ({
      id: bird.id,
      name: bird.name,
      imageUrl: bird.imageUrl,
    })),
    skipDuplicates: true,
  });
  return upsertSpot({
    ...spot,
    // 取得できなかった場合は既存の人気度を残す
    ...(pageInfo?.monthlyCounts ?? {}),
    birds: spotBirds,
  });
}
