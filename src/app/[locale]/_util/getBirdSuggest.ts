"use server";

import prisma from "@/lib/prisma";

export async function getBirdSuggest(str: string) {
  const birds = await prisma.bird.findMany({
    where: { name: { startsWith: str } },
  });
  return birds;
}
