/*
  Warnings:

  - Made the column `handle` on table `Property` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Property" ALTER COLUMN "handle" SET NOT NULL;
