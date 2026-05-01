/*
  Warnings:

  - Added the required column `updatedAt` to the `Spot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Spot" ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT NOW();
ALTER TABLE "Spot" ALTER COLUMN "updatedAt" DROP DEFAULT;
