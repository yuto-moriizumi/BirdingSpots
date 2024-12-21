"use server";

import { PrismaClient } from "@prisma/client";
import { MonthRecord } from "./model/MonthRecord";
import { SpotBird } from "./model/SpotBird";

const prisma = new PrismaClient();

export type SpotCreate = MonthRecord & {
  id: string;
  name: string;
  address: string;
  birds: Omit<SpotBird, "name" | "imageUrl">[];
};

export const addSpot = async (spotData: SpotCreate) => {
  try {
    const spot = {
      id: spotData.id,
      name: spotData.name,
      address: spotData.address,
      Jan: spotData.Jan,
      Feb: spotData.Feb,
      Mar: spotData.Mar,
      Apr: spotData.Apr,
      May: spotData.May,
      Jun: spotData.Jun,
      Jul: spotData.Jul,
      Aug: spotData.Aug,
      Sep: spotData.Sep,
      Oct: spotData.Oct,
      Nov: spotData.Nov,
      Dec: spotData.Dec,
    };
    await prisma.spot.upsert({
      where: { id: spotData.id },
      create: spot,
      update: spot,
    });
    await prisma.spotBird.createMany({
      data: spotData.birds.map((bird) => ({
        spotId: spotData.id,
        birdId: bird.id,
        JanFrequency: bird.JanFrequency,
        FebFrequency: bird.FebFrequency,
        MarFrequency: bird.MarFrequency,
        AprFrequency: bird.AprFrequency,
        MayFrequency: bird.MayFrequency,
        JunFrequency: bird.JunFrequency,
        JulFrequency: bird.JulFrequency,
        AugFrequency: bird.AugFrequency,
        SepFrequency: bird.SepFrequency,
        OctFrequency: bird.OctFrequency,
        NovFrequency: bird.NovFrequency,
        DecFrequency: bird.DecFrequency,
      })),
      skipDuplicates: true,
    });
    return true;
  } catch (error) {
    console.error("Error adding spot:", error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
};
