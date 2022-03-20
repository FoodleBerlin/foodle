import { Frequency } from "@prisma/client";
import { enumType } from "nexus";

export const FrequencyEnum = enumType({
    name: 'Frequency',
    members: {
      NONE: Frequency.none,
      WEEKLY: Frequency.weekly,
      BIWEEKLY: Frequency.biweekly,
      TRIWEEKLY: Frequency.none,
    },
  });