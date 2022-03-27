/*
  Warnings:

  - You are about to drop the column `license` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `passport` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `solvency` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "license",
DROP COLUMN "passport",
DROP COLUMN "solvency",
ADD COLUMN     "licenseS3Id" TEXT,
ADD COLUMN     "passportS3Id" TEXT,
ADD COLUMN     "solvencyS3Id" TEXT,
ALTER COLUMN "zip" DROP NOT NULL;
