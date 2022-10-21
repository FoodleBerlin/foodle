/*
  Warnings:

  - Added the required column `frequency` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "facilities" TEXT[],
ADD COLUMN     "frequency" "Frequency" NOT NULL;
