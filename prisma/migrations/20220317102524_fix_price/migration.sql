/*
  Warnings:

  - Made the column `dailyPrice` on table `Property` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Property" ALTER COLUMN "dailyPrice" SET NOT NULL,
ALTER COLUMN "dailyPrice" DROP DEFAULT,
ALTER COLUMN "serviceFee" DROP DEFAULT;
