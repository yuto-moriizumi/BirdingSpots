/*
  Warnings:

  - Added the required column `imageUrl` to the `Bird` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bird" ADD COLUMN     "imageUrl" TEXT NOT NULL;
