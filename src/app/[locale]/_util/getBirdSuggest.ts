"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getBirdSuggest(str: string) {
  const birds = await prisma.bird.findMany({
    where: { name: { startsWith: str } },
  });
  await prisma.$disconnect();
  return birds;
}
