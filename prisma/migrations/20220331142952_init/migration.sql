-- DropForeignKey
ALTER TABLE "GenericDaySlot" DROP CONSTRAINT "GenericDaySlot_propertySlotId_fkey";

-- AlterTable
ALTER TABLE "GenericDaySlot" ALTER COLUMN "propertySlotId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "GenericDaySlot" ADD CONSTRAINT "GenericDaySlot_propertySlotId_fkey" FOREIGN KEY ("propertySlotId") REFERENCES "PropertySlot"("id") ON DELETE SET NULL ON UPDATE CASCADE;
