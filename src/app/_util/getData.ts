import { PrismaClient } from "@prisma/client";
import { Spot } from "../../model/Spot";

const prisma = new PrismaClient();

export async function getBirdwatchingSpots(): Promise<Spot[]> {
  try {
    const spots = await prisma.spot.findMany({
      include: { spotbirds: { include: { bird: true } } },
    });
    return spots.map((spot) => ({
      ...spot,
      birds: spot.spotbirds.map((spotbird) => ({
        ...spotbird,
        id: spotbird.bird.id,
        name: spotbird.bird.name,
        imageUrl: spotbird.bird.imageUrl,
      })),
    }));
  } catch (error) {
    console.error("Error fetching data from Prisma:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
