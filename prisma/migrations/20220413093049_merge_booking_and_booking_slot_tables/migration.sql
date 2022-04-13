/*
  Warnings:

  - You are about to drop the column `bookingSlotId` on the `DaySlot` table. All the data in the column will be lost.
  - You are about to drop the `BookingSlot` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `endTime` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BookingSlot" DROP CONSTRAINT "BookingSlot_bookingId_fkey";

-- DropForeignKey
ALTER TABLE "DaySlot" DROP CONSTRAINT "DaySlot_bookingSlotId_fkey";

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "weekdays" "WeekDay"[],
ALTER COLUMN "totalPrice" SET DEFAULT 0,
ALTER COLUMN "totalPrice" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "DaySlot" DROP COLUMN "bookingSlotId",
ADD COLUMN     "bookingId" TEXT;

-- DropTable
DROP TABLE "BookingSlot";

-- CreateIndex
CREATE INDEX "DaySlot_propertySlotId_idx" ON "DaySlot"("propertySlotId");

-- CreateIndex
CREATE INDEX "Property_handle_idx" ON "Property"("handle");

-- CreateIndex
CREATE INDEX "PropertySlot_propertyId_idx" ON "PropertySlot"("propertyId");

-- AddForeignKey
ALTER TABLE "DaySlot" ADD CONSTRAINT "DaySlot_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;
