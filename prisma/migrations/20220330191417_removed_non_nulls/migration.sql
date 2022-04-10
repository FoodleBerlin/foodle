/*
  Warnings:

  - Made the column `zip` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `passportS3Id` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `licenseS3Id` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `solvencyS3Id` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "zip" SET NOT NULL,
ALTER COLUMN "passportS3Id" SET NOT NULL,
ALTER COLUMN "licenseS3Id" SET NOT NULL,
ALTER COLUMN "solvencyS3Id" SET NOT NULL;
