import { BookingSlot, Frequency } from '@prisma/client';
async function main() {
  console.log('done');
}
main();

export default main;

type Weekday = 'Monday' | 'Tuesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
/**
 * A day and time of the week
 */
type DaySlot = {
  day: Weekday;
  startTime: string;
  endTime: string;
};

type Repeats = 'none' | 'twoWeeks' | 'threeWeeks' | 'monthly';
/**
 * The info object that defines when the property starts being available, the days and times per week it is available, and the minimums
 */
type PropertyAvailability = {
  minimums: {
    consecutiveMonths: number;
  } | null;
  originalAvailableStartDate: Date;
  repeats: Repeats;
  originalAvailableDaysPerWeek: DaySlot[];
  // existingBookings: {
  //   startDate: Date;
  //   endDate: Date;
  //   daySlots: DaySlot[];
  // }[];
};
// booking and booking slot
// property property slot

const myPropertyAvailabilities: PropertyAvailability = {
  minimums: {
    consecutiveMonths: 4,
  },
  repeats: 'none',
  originalAvailableStartDate: new Date('2022-2-17T03:24:00'),
  originalAvailableDaysPerWeek: [
    {
      day: 'Monday',
      startTime: '10:30',
      endTime: '15:00',
    },
    {
      day: 'Thursday',
      startTime: '11:30',
      endTime: '19:00',
    },
  ],
  // Ordered most to least recent
  // existingBookings: [
  //   {
  //     startDate: new Date('2022-2-17T03:24:00'),
  //     endDate: new Date('2022-2-17T03:24:00'),
  //     daySlots: [
  //       {
  //         day: 'Monday',
  //         startTime: '10:30',
  //         endTime: '15:00',
  //       },
  //       {
  //         day: 'Thursday',
  //         startTime: '11:30',
  //         endTime: '19:00',
  //       },
  //     ],
  //   },
  // ],
};

interface Length {
  length: number;
}

function identity<Type extends Length>(type: Type): Type {
  return type;
}
let output = identity<string>('hello'); // fine because string has.length

let specificIdentity: <Type extends Length>(arg: Type) => Type = identity;

interface GenericIdentityFunction {
  <Type extends Length>(arg: Type): Type;
}
let specificIdentityUsingInterface: GenericIdentityFunction = identity;

interface GenericIdentityFunctionGlobalParam<Type extends Length> {
  (arg: Type): Type;
}
let specificIdentityUsingInterfaceGlobalParam: GenericIdentityFunctionGlobalParam<string> = identity;

// 3 places to compute availabilities:
// 1. filter
// function filter({ startDate: "", daysOfWeek: ["Mon", "Tues"], frequency: "weekly"})
// {   find all properties,
//     filter out property slots that start after startDate
//     filter out property slots do not have generic day slots with ALL days for frequency equal to param
//     filter out property with booking slots that end after this date, fall on one of these days, and is weekly.
//     filter out property with booking slots that end after this date, fall on one of these days, and is monthly.
//      check start date, find first corresponding day overlap, get date, loop through all until end of the booking and
//      see if they overlap with concrete dates from startdate and end of the week

// {   find all properties,
//     filter out property w property slots that do not have frequency equal to param
//     filter out property w property slots that do not have both property slots availble on both dates starting that day + 7
//}

// 2. the booking page sidebar week by week
// {
//     when hydrated or date changed
//     populate with filter day of week, if none then current day

//     if there is a minimum on the property, auto fill the days of week, frequency, computed until. disable removing days. disable changing frequency. disable shortening until.
//     if there is no minimum, use start week to + 7 days to find the next available days.
//     if no minimum, auto populate options for frequency
//
//     when no minimum and frequency is changed, auto populate
//
//  }
//
// 3. the booking page bottom

/// BOOKING HELPERS

/** finds up the next booking slots starting on or after the startDate until 7 days after  */
// type AvailableBookingDayParams = {
//   startDate: string;
// };
// const availableBookingDays = (params: AvailableBookingDayParams): BookingSlot[] => {};

// /** finds next longest string of consecutive days and groups according to frequency. responsible for frequency options */
// type AvailableBookingFrequenciesParams = {
//   startDate: string;
//   daysOfTheWeek: DayOfWeek[];
// };
// const availableBookingFrequencies = (params: AvailableBookingFrequenciesParams): Frequency[] => {};

// /** finds the latest possible end date */
// type LatestBookingEndDateParams = {
//   startDate: string;
//   daysOfTheWeek: string[];
//   frequency: string;
// };
// /** finds next longest string of consecutive days and groups according to frequency */
// const latestBookingEndDate = (params: LatestBookingEndDateParams): string => {};
