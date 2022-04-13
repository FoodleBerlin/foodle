import { BookingStatus, Frequency, WeekDay } from '@prisma/client';
import { enumType } from 'nexus';

export const WeekDayEnum = enumType({
  name: 'WeekDays',

  members: {
    MON: WeekDay.mon,
    TUE: WeekDay.thu,
    WED: WeekDay.wed,
    THU: WeekDay.thu,
    FRI: WeekDay.fri,
    SAT: WeekDay.sat,
    SUN: WeekDay.sun,
  },
});

export const BookingStatusEnum = enumType({
  name: 'BookingStatus',
  members: {
    ACCEPTED: BookingStatus.accepted,
    PENDING: BookingStatus.pending,
    REJECTED: BookingStatus.rejected,
  },
});

export const FrequencyEnum = enumType({
  name: 'FrequencyEnum',
  // description: 'map nexus frequency to prisma enum',
  members: {
    NONE: Frequency.none,
    WEEKLY: Frequency.weekly,
    BIWEEKLY: Frequency.biweekly,
    MONTHLY: Frequency.monthly,
  },
});
