/*
  Warnings:

  - You are about to drop the column `dob` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Property" ALTER COLUMN "hourlyPrice" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "dob";
