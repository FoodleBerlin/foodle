-- CreateEnum
CREATE TYPE "ModelKind" AS ENUM ('user', 'property', 'booking', 'bookingDay', 'propertyAvailability', 'facility', 'payment', 'paymentMethod', 'genericDaySlot', 'bookingSlot', 'propertySlot');

-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun');

-- CreateEnum
CREATE TYPE "Frequency" AS ENUM ('none', 'weekly', 'biweekly', 'triweekly');

-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('reservation', 'fee', 'refund');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('pending', 'paid', 'rejected');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('tenant', 'landlord', 'tenantLandlord');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('accepted', 'pending', 'rejected');

-- CreateTable
CREATE TABLE "User" (
    "kind" "ModelKind" NOT NULL DEFAULT E'user',
    "handle" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "stripeId" TEXT,
    "email" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "image" TEXT,
    "dob" TIMESTAMP(3),
    "zip" INTEGER,
    "description" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "role" "Role" NOT NULL,
    "superOwner" BOOLEAN NOT NULL DEFAULT false,
    "passportS3Id" TEXT,
    "passportVerified" BOOLEAN NOT NULL DEFAULT false,
    "licenseS3Id" TEXT,
    "licenseVerified" BOOLEAN NOT NULL DEFAULT false,
    "solvencyS3Id" TEXT,
    "solvencyVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertySlot" (
    "kind" "ModelKind" NOT NULL DEFAULT E'propertySlot',
    "id" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "minMonths" INTEGER NOT NULL DEFAULT 0,
    "frequency" "Frequency" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "propertyId" TEXT NOT NULL,

    CONSTRAINT "PropertySlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GenericDaySlot" (
    "kind" "ModelKind" NOT NULL DEFAULT E'genericDaySlot',
    "id" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "weekday" TEXT NOT NULL,
    "propertySlotId" TEXT NOT NULL,
    "bookingSlotId" TEXT,

    CONSTRAINT "GenericDaySlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Property" (
    "kind" "ModelKind" NOT NULL DEFAULT E'property',
    "id" TEXT NOT NULL,
    "handle" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "ownerId" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "streetNumber" INTEGER NOT NULL,
    "zip" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "pickup" BOOLEAN NOT NULL DEFAULT false,
    "facilities" TEXT[],
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "hourlyPrice" INTEGER NOT NULL DEFAULT 0,
    "serviceFee" INTEGER NOT NULL,
    "rules" TEXT[],
    "deposit" INTEGER NOT NULL,
    "images" TEXT[],
    "partialSpace" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingSlot" (
    "kind" "ModelKind" NOT NULL DEFAULT E'bookingSlot',
    "id" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "frequency" "Frequency" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "bookingId" TEXT NOT NULL,

    CONSTRAINT "BookingSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "kind" "ModelKind" NOT NULL DEFAULT E'booking',
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "bookingStatus" "BookingStatus" NOT NULL,
    "totalPrice" INTEGER NOT NULL DEFAULT 0,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "frequency" "Frequency" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_handle_key" ON "User"("handle");

-- CreateIndex
CREATE UNIQUE INDEX "User_stripeId_key" ON "User"("stripeId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PropertySlot_propertyId_key" ON "PropertySlot"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "Property_handle_key" ON "Property"("handle");

-- AddForeignKey
ALTER TABLE "PropertySlot" ADD CONSTRAINT "PropertySlot_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenericDaySlot" ADD CONSTRAINT "GenericDaySlot_propertySlotId_fkey" FOREIGN KEY ("propertySlotId") REFERENCES "PropertySlot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenericDaySlot" ADD CONSTRAINT "GenericDaySlot_bookingSlotId_fkey" FOREIGN KEY ("bookingSlotId") REFERENCES "BookingSlot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingSlot" ADD CONSTRAINT "BookingSlot_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
