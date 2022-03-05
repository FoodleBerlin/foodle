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
