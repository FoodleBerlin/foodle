/*
  Warnings:

  - You are about to drop the column `bookedEndTime` on the `DaySlot` table. All the data in the column will be lost.
  - You are about to drop the column `propertySlotId` on the `DaySlot` table. All the data in the column will be lost.
  - You are about to drop the `PropertySlot` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[date,propertyId]` on the table `DaySlot` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `propertyId` to the `DaySlot` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DaySlot" DROP CONSTRAINT "DaySlot_propertySlotId_fkey";

-- DropForeignKey
ALTER TABLE "PropertySlot" DROP CONSTRAINT "PropertySlot_propertyId_fkey";

-- DropIndex
DROP INDEX "DaySlot_date_propertySlotId_key";

-- DropIndex
DROP INDEX "DaySlot_propertySlotId_idx";

-- AlterTable
ALTER TABLE "DaySlot" DROP COLUMN "bookedEndTime",
DROP COLUMN "propertySlotId",
ADD COLUMN     "bookedDuration" INTEGER,
ADD COLUMN     "propertyId" TEXT NOT NULL;

-- DropTable
DROP TABLE "PropertySlot";

-- CreateIndex
CREATE INDEX "DaySlot_propertyId_idx" ON "DaySlot"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "DaySlot_date_propertyId_key" ON "DaySlot"("date", "propertyId");

-- AddForeignKey
ALTER TABLE "DaySlot" ADD CONSTRAINT "DaySlot_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
