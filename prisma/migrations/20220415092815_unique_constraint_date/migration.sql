/*
  Warnings:

  - A unique constraint covering the columns `[date,propertySlotId]` on the table `DaySlot` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "The_Date_within_same_PropertySlot_unique_constraint" ON "DaySlot"("date", "propertySlotId");
