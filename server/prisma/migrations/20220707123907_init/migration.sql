-- CreateEnum
CREATE TYPE "Frequency" AS ENUM ('none', 'weekly', 'monthly');

-- CreateEnum
CREATE TYPE "ModelKind" AS ENUM ('user', 'property', 'booking', 'bookingDay', 'propertyAvailability', 'payment', 'paymentMethod', 'daySlot');

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
CREATE TABLE "DaySlot" (
    "kind" "ModelKind" NOT NULL DEFAULT E'daySlot',
    "id" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "bookedStartTime" TIMESTAMP(3),
    "bookedEndTime" TIMESTAMP(3),
    "propertyId" TEXT NOT NULL,
    "bookingId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DaySlot_pkey" PRIMARY KEY ("id")
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
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "hourlyPrice" INTEGER NOT NULL,
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
CREATE TABLE "Booking" (
    "kind" "ModelKind" NOT NULL DEFAULT E'booking',
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "bookingStatus" "BookingStatus" NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "frequency" "Frequency" NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_handle_key" ON "User"("handle");

-- CreateIndex
CREATE UNIQUE INDEX "User_stripeId_key" ON "User"("stripeId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "DaySlot_startTime_idx" ON "DaySlot"("startTime");

-- CreateIndex
CREATE INDEX "DaySlot_endTime_idx" ON "DaySlot"("endTime");

-- CreateIndex
CREATE INDEX "DaySlot_propertyId_idx" ON "DaySlot"("propertyId");

-- CreateIndex
CREATE INDEX "DaySlot_bookingId_idx" ON "DaySlot"("bookingId");

-- CreateIndex
CREATE UNIQUE INDEX "Property_handle_key" ON "Property"("handle");

-- CreateIndex
CREATE INDEX "Property_handle_hourlyPrice_idx" ON "Property"("handle", "hourlyPrice");

-- AddForeignKey
ALTER TABLE "DaySlot" ADD CONSTRAINT "DaySlot_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DaySlot" ADD CONSTRAINT "DaySlot_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
