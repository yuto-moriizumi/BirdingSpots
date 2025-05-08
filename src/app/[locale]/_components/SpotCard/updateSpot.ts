"use server";

import { PrismaClient } from "@prisma/client";
import { upsertSpot } from "../../add/_util/addSpot";
import { getSpotBirds } from "../../add/_util/getSpotData";

const prisma = new PrismaClient();

/** 指定したスポットの野鳥情報を更新する */
export async function updateSpot(id: string) {
  const spotBirds = await getSpotBirds(id);
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
