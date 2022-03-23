/*
  Warnings:

  - Added the required column `deposit` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "deposit" INTEGER NOT NULL,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "minStayHours" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "minStayWeeks" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "partialSpace" BOOLEAN NOT NULL DEFAULT false;
