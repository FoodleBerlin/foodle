import { Frequency } from '@prisma/client';
import { enumType } from 'nexus';

export const WeekDayEnum = enumType({
  name: 'WeekDays',
  members: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
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
