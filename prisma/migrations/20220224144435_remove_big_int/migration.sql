/*
  Warnings:

  - You are about to alter the column `dailyPrice` on the `Property` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `serviceFee` on the `Property` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Property" ALTER COLUMN "dailyPrice" SET DEFAULT 0,
ALTER COLUMN "dailyPrice" SET DATA TYPE INTEGER,
ALTER COLUMN "serviceFee" SET DEFAULT 0,
ALTER COLUMN "serviceFee" SET DATA TYPE INTEGER;
