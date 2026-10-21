"use server";

import { prisma } from "@/lib/prisma";
import { upsertSpot } from "../../_util/upsertSpot";
import { getSpotBirds } from "../../_util/getSpotBirds";

/** 指定したスポットの野鳥情報を更新する */
export async function updateSpot(id: string) {
  const spotBirds = await getSpotBirds(id);
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
  return upsertSpot({ ...spot, birds: spotBirds });
}
