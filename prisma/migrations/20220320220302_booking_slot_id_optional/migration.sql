-- DropForeignKey
ALTER TABLE "GenericDaySlot" DROP CONSTRAINT "GenericDaySlot_bookingSlotId_fkey";

-- AlterTable
ALTER TABLE "GenericDaySlot" ALTER COLUMN "bookingSlotId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "GenericDaySlot" ADD CONSTRAINT "GenericDaySlot_bookingSlotId_fkey" FOREIGN KEY ("bookingSlotId") REFERENCES "BookingSlot"("id") ON DELETE SET NULL ON UPDATE CASCADE;
