-- CreateTable
CREATE TABLE "Spot" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "Jan" INTEGER NOT NULL,
    "Feb" INTEGER NOT NULL,
    "Mar" INTEGER NOT NULL,
    "Apr" INTEGER NOT NULL,
    "May" INTEGER NOT NULL,
    "Jun" INTEGER NOT NULL,
    "Jul" INTEGER NOT NULL,
    "Aug" INTEGER NOT NULL,
    "Sep" INTEGER NOT NULL,
    "Oct" INTEGER NOT NULL,
    "Nov" INTEGER NOT NULL,
    "Dec" INTEGER NOT NULL,

    CONSTRAINT "Spot_pkey" PRIMARY KEY ("id")
);
