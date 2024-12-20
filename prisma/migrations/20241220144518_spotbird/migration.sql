-- CreateTable
CREATE TABLE "Bird" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Bird_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpotBird" (
    "spotId" TEXT NOT NULL,
    "birdId" INTEGER NOT NULL,
    "JanFrequency" DOUBLE PRECISION[],
    "FebFrequency" DOUBLE PRECISION[],
    "MarFrequency" DOUBLE PRECISION[],
    "AprFrequency" DOUBLE PRECISION[],
    "MayFrequency" DOUBLE PRECISION[],
    "JunFrequency" DOUBLE PRECISION[],
    "JulFrequency" DOUBLE PRECISION[],
    "AugFrequency" DOUBLE PRECISION[],
    "SepFrequency" DOUBLE PRECISION[],
    "OctFrequency" DOUBLE PRECISION[],
    "NovFrequency" DOUBLE PRECISION[],
    "DecFrequency" DOUBLE PRECISION[]
);

-- CreateIndex
CREATE UNIQUE INDEX "SpotBird_spotId_key" ON "SpotBird"("spotId");

-- CreateIndex
CREATE UNIQUE INDEX "SpotBird_birdId_key" ON "SpotBird"("birdId");

-- AddForeignKey
ALTER TABLE "SpotBird" ADD CONSTRAINT "SpotBird_spotId_fkey" FOREIGN KEY ("spotId") REFERENCES "Spot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpotBird" ADD CONSTRAINT "SpotBird_birdId_fkey" FOREIGN KEY ("birdId") REFERENCES "Bird"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
