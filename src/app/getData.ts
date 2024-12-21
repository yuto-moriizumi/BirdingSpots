import { PrismaClient } from "@prisma/client";
import { Spot } from "../model/Spot";

const prisma = new PrismaClient();

export async function getBirdwatchingSpots(): Promise<Spot[]> {
  try {
    const spots = await prisma.spot.findMany({
      include: { spotbirds: { include: { bird: true } } },
    });
    return spots.map((spot) => ({
      ...spot,
      birds: [
        {
          name: "bird",
          JanFrequency: [1],
          FebFrequency: [1],
          MarFrequency: [1],
          AprFrequency: [1],
          MayFrequency: [1],
          JunFrequency: [1],
          JulFrequency: [1],
          AugFrequency: [1],
          SepFrequency: [1],
          OctFrequency: [1],
          NovFrequency: [1],
          DecFrequency: [1],
        },
      ],
    }));
  } catch (error) {
    console.error("Error fetching data from Prisma:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
