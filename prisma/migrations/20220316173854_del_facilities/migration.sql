/*
  Warnings:

  - You are about to drop the `Facility` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Facility" DROP CONSTRAINT "Facility_propertyId_fkey";

-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "facilities" TEXT[];

-- DropTable
DROP TABLE "Facility";
