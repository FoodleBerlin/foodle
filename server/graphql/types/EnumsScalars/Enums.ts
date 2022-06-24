import { BookingStatus, Frequency } from '@prisma/client';
import { enumType } from 'nexus';

export const WeekDayEnum = enumType({
  name: 'WeekDays',
  description: 'map nexus WeekDay to prisma enum',
  members: {
    MON: 1,
    TUE: 2,
    WED: 3,
    THU: 4,
    FRI: 5,
    SAT: 6,
    SUN: 7,
  },
});

export const BookingStatusEnum = enumType({
  name: 'BookingStatus',
  description: 'map nexus BookingStatus to prisma enum',
  members: {
    ACCEPTED: BookingStatus.accepted,
    PENDING: BookingStatus.pending,
    REJECTED: BookingStatus.rejected,
  },
});

export const FrequencyEnum = enumType({
  name: 'FrequencyEnum',
  description: 'map nexus frequency to prisma enum',
  members: {
    NONE: Frequency.none,
    WEEKLY: Frequency.weekly,
    MONTHLY: Frequency.monthly,
  },
});
