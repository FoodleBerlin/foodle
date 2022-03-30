/*
  Warnings:

  - You are about to drop the column `frequency` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `minimumBookings` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `bookingSlotId` on the `PropertySlot` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `PropertySlot` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `PropertySlot` table. All the data in the column will be lost.
  - You are about to drop the column `weekday` on the `PropertySlot` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[propertyId]` on the table `PropertySlot` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `createdAt` to the `PropertySlot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `PropertySlot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `frequency` to the `PropertySlot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `PropertySlot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `PropertySlot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "ModelKind" ADD VALUE 'daySlot';

-- DropForeignKey
ALTER TABLE "BookingSlot" DROP CONSTRAINT "BookingSlot_propertySlotInstanceId_fkey";

-- DropForeignKey
ALTER TABLE "PropertySlot" DROP CONSTRAINT "PropertySlot_propertyId_fkey";

-- DropIndex
DROP INDEX "BookingSlot_propertySlotInstanceId_key";

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "frequency",
DROP COLUMN "minimumBookings";

-- AlterTable
ALTER TABLE "PropertySlot" DROP COLUMN "bookingSlotId",
DROP COLUMN "endTime",
DROP COLUMN "startTime",
DROP COLUMN "weekday",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "frequency" "Frequency" NOT NULL,
ADD COLUMN     "minimumBookings" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "DaySlot" (
    "kind" "ModelKind" NOT NULL DEFAULT E'propertySlot',
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "weekday" TEXT NOT NULL,
    "propertySlotId" TEXT NOT NULL,
    "bookingSlotId" TEXT,

    CONSTRAINT "DaySlot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PropertySlot_propertyId_key" ON "PropertySlot"("propertyId");

-- AddForeignKey
ALTER TABLE "DaySlot" ADD CONSTRAINT "DaySlot_propertySlotId_fkey" FOREIGN KEY ("propertySlotId") REFERENCES "PropertySlot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DaySlot" ADD CONSTRAINT "DaySlot_bookingSlotId_fkey" FOREIGN KEY ("bookingSlotId") REFERENCES "BookingSlot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertySlot" ADD CONSTRAINT "PropertySlot_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
