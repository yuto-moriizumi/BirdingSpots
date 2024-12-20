"use server";

import { PrismaClient } from "@prisma/client";
import { Spot } from "./model/Spot";

const prisma = new PrismaClient();

export const addSpot = async (spotData: Spot) => {
  try {
    await prisma.spot.create({
      data: spotData,
    });
    return true;
  } catch (error) {
    console.error("Error adding spot:", error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
};
