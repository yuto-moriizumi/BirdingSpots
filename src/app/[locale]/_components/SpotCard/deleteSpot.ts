"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { isAllowedDiscordId } from "@/lib/auth-permissions";

/** 許可されたDiscordユーザーが指定したスポットを削除する */
export async function deleteSpot(id: string): Promise<boolean> {
  const session = await auth();
  if (!isAllowedDiscordId(session?.user?.discordId)) {
    throw new Error("You are not authorized to delete spots.");
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
