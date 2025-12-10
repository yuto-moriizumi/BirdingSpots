"use server";

import { Bird } from "@/model/Bird";
import { prisma } from "@/lib/prisma";
import { JSDOM } from "jsdom";

export async function getBird(id: number): Promise<Bird | undefined> {
  const bird = await prisma.bird.findUnique({ where: { id } });
  if (bird) return bird;

  const info = await fetchInfo(id);
  if (!info) return;
  return await prisma.bird.create({ data: { id, ...info } });
}

async function fetchInfo(
  id: number
): Promise<{ name: string; imageUrl: string } | undefined> {
  const response = await fetch("https://zoopicker.com/animals/" + id);
  if (!response.ok) return;
  const data = await response.text();
  const dom = new JSDOM(data);
  const document = dom.window.document;
  const name = document.querySelector("h1")?.textContent ?? undefined;
  const imageUrl =
    document.querySelector("article .first-image img")?.getAttribute("src") ??
    undefined;
  if (!name || !imageUrl) return;
  return { name, imageUrl };
}
