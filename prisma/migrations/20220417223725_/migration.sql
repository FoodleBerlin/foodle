/*
  Warnings:

  - A unique constraint covering the columns `[date,propertySlotId]` on the table `DaySlot` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DaySlot_date_propertySlotId_key" ON "DaySlot"("date", "propertySlotId");
