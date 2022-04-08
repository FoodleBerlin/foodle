import { Frequency } from '@prisma/client';
import { enumType } from 'nexus';

export const WeekDayEnum = enumType({
  name: 'WeekDays',
  /* ['MON', 'TUE'],
   */
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
