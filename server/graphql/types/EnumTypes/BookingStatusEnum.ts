import { BookingStatus } from "@prisma/client";
import { enumType } from "nexus";

export const BookingStatusEnum = enumType({
    name: 'BookingStatus',
    members: {
      ACCEPTED: BookingStatus.accepted,
      PENDING: BookingStatus.pending,
      REJECTED: BookingStatus.rejected,
    },
  });
  