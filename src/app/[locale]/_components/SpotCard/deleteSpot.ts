"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/** 指定したスポットを削除する (開発モードのみ) */
export async function deleteSpot(id: string): Promise<boolean> {
  if (process.env.NODE_ENV !== "development") {
    throw new Error("This action is only available in development mode.");
  }

  try {
    await prisma.$transaction(async (tx) => {
      // 1. 関連するSpotBirdレコードを削除
      await tx.spotBird.deleteMany({
        where: { spotId: id },
      });
      // 2. Spotレコードを削除
      await tx.spot.delete({
        where: { id },
      });
    });

    revalidatePath("/");
    return true;
  } catch (error) {
    console.error("Error deleting spot:", error);
    return false;
  }
}
