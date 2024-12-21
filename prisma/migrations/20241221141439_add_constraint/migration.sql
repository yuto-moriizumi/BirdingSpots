/*
  Warnings:

  - A unique constraint covering the columns `[spotId,birdId]` on the table `SpotBird` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "SpotBird_birdId_key";

-- DropIndex
DROP INDEX "SpotBird_spotId_key";

-- CreateIndex
CREATE UNIQUE INDEX "SpotBird_spotId_birdId_key" ON "SpotBird"("spotId", "birdId");
