import { Frequency } from '@prisma/client';
import moment from 'moment';
import { DaySlotInterface } from '../server/graphql/types';
import { BookingService, TestService } from '../server/singletons/bookingService';

const startDate = moment('2022-06-27T10:00:00.000+0200');
const endDate = moment('2022-08-27T10:00:00.000+0200');
const startTime = moment('2022-06-27T10:00:00.000+0200');
const endTime = moment('2022-08-27T18:00:00.000+0200');
const weekDay = 1;

test('tes getAllDatesForWeekday() with frequency = none', () => {
  const actualDates: DaySlotInterface[] = TestService.getAllDatesForWeekday(
    startDate,
    Frequency.none,
    endDate,
    weekDay,
    startTime,
    endTime
  );
  const expectedDates: DaySlotInterface[] = [
    {
      startTime: moment('2022-06-27T10:00:00.000+0200'),
      endTime: moment('2022-06-27T18:00:00.000+0200'),
    },
  ];

  expect(JSON.stringify(expectedDates)).toStrictEqual(JSON.stringify(actualDates));
});

test('tes getAllDatesForWeekday() with frequency = monthly', () => {
  const actualDates: DaySlotInterface[] = TestService.getAllDatesForWeekday(
    startDate,
    Frequency.monthly,
    endDate,
    weekDay,
    startTime,
    endTime
  );
  const expectedDates: DaySlotInterface[] = [
    {
      startTime: moment('2022-06-27T10:00:00.000+0200'),
      endTime: moment('2022-06-27T18:00:00.000+0200'),
    },
    {
      startTime: moment('2022-07-25T10:00:00.000+0200'),
      endTime: moment('2022-07-25T18:00:00.000+0200'),
    },
    {
      startTime: moment('2022-08-22T10:00:00.000+0200'),
      endTime: moment('2022-08-22T18:00:00.000+0200'),
    },
  ];

  expect(JSON.stringify(expectedDates)).toStrictEqual(JSON.stringify(actualDates));
});

test('tes getAllDatesForWeekday() with frequency = weekly', () => {
  const actualDates: DaySlotInterface[] = TestService.getAllDatesForWeekday(
    startDate,
    Frequency.weekly,
    endDate,
    weekDay,
    startTime,
    endTime
  );

  const expectedDates: DaySlotInterface[] = [
    {
      startTime: moment('2022-06-27T10:00:00.000+0200'),
      endTime: moment('2022-06-27T18:00:00.000+0200'),
    },
    {
      startTime: moment('2022-07-04T10:00:00.000+0200'),
      endTime: moment('2022-07-04T18:00:00.000+0200'),
    },
    {
      startTime: moment('2022-07-11T10:00:00.000+0200'),
      endTime: moment('2022-07-11T18:00:00.000+0200'),
    },
    {
      startTime: moment('2022-07-18T10:00:00.000+0200'),
      endTime: moment('2022-07-18T18:00:00.000+0200'),
    },
    {
      startTime: moment('2022-07-25T10:00:00.000+0200'),
      endTime: moment('2022-07-25T18:00:00.000+0200'),
    },
    {
      startTime: moment('2022-08-01T10:00:00.000+0200'),
      endTime: moment('2022-08-01T18:00:00.000+0200'),
    },
    {
      startTime: moment('2022-08-08T10:00:00.000+0200'),
      endTime: moment('2022-08-08T18:00:00.000+0200'),
    },
    {
      startTime: moment('2022-08-15T10:00:00.000+0200'),
      endTime: moment('2022-08-15T18:00:00.000+0200'),
    },
    {
      startTime: moment('2022-08-22T10:00:00.000+0200'),
      endTime: moment('2022-08-22T18:00:00.000+0200'),
    },
  ];

  expect(JSON.stringify(expectedDates)).toStrictEqual(JSON.stringify(actualDates));
});

test('test calculateDates() with single daySlot, startDate = weekDay', () => {
  const actualDates = BookingService.calculateDates(
    [
      {
        startTime: moment('2022-06-27T09:00:00.000+0200'),
        endTime: moment('2022-06-27T16:00:00.000+0200'),
        weekday: 3,
      },
    ],
    moment('2022-10-05T10:00:00.000+0200'),
    moment('2022-11-03T10:00:00.000+0200'),
    Frequency.weekly
  );

  const expectedDates = [
    {
      startTime: moment('2022-10-05T09:00:00.000+0200'),
      endTime: moment('2022-10-05T16:00:00.000+0200'),
    },
    {
      startTime: moment('2022-10-12T09:00:00.000+0200'),
      endTime: moment('2022-10-12T16:00:00.000+0200'),
    },
    {
      startTime: moment('2022-10-19T09:00:00.000+0200'),
      endTime: moment('2022-10-19T16:00:00.000+0200'),
    },
    {
      startTime: moment('2022-10-26T09:00:00.000+0200'),
      endTime: moment('2022-10-26T16:00:00.000+0200'),
    },
    // Time change to winterTime
    {
      startTime: moment('2022-11-02T09:00:00.000+0100'),
      endTime: moment('2022-11-02T16:00:00.000+0100'),
    },
  ];

  expect(JSON.stringify(expectedDates)).toStrictEqual(JSON.stringify(actualDates));
});

test('test calculateDates() with single daySlot, startDate != weekDay', () => {
  const actualDates = BookingService.calculateDates(
    [
      {
        startTime: moment('2022-06-27T09:00:00.000+0200'),
        endTime: moment('2022-06-27T16:00:00.000+0200'),
        weekday: 7,
      },
    ],
    moment('2022-07-04T10:00:00.000+0200'),
    moment('2022-08-20T10:00:00.000+0200'),
    Frequency.weekly
  );

  const expectedDates = [
    {
      startTime: moment('2022-07-10T09:00:00.000+0200'),
      endTime: moment('2022-07-10T16:00:00.000+0200'),
    },
    {
      startTime: moment('2022-07-17T09:00:00.000+0200'),
      endTime: moment('2022-07-17T16:00:00.000+0200'),
    },
    {
      startTime: moment('2022-07-24T09:00:00.000+0200'),
      endTime: moment('2022-07-24T16:00:00.000+0200'),
    },
    {
      startTime: moment('2022-07-31T09:00:00.000+0200'),
      endTime: moment('2022-07-31T16:00:00.000+0200'),
    },
    {
      startTime: moment('2022-08-07T09:00:00.000+0200'),
      endTime: moment('2022-08-07T16:00:00.000+0200'),
    },
    {
      startTime: moment('2022-08-14T09:00:00.000+0200'),
      endTime: moment('2022-08-14T16:00:00.000+0200'),
    },
  ];

  expect(JSON.stringify(expectedDates)).toStrictEqual(JSON.stringify(actualDates));
});

test('test calculateDates() with multiple daySlots', () => {
  const actualDates = BookingService.calculateDates(
    [
      {
        startTime: moment('2022-06-27T09:00:00.000+0200'),
        endTime: moment('2022-06-27T16:00:00.000+0200'),
        weekday: 2,
      },
      {
        startTime: moment('2022-06-27T16:00:00.000+0200'),
        endTime: moment('2022-06-27T23:00:00.000+0200'),
        weekday: 5,
      },
    ],
    moment('2022-10-24T09:00:00.000+0200'),
    moment('2023-02-27T16:00:00.000+0200'),
    Frequency.monthly
  );

  const expectedDates = [
    // first weekday
    {
      startTime: moment('2022-10-25T09:00:00.000+0200'),
      endTime: moment('2022-10-25T16:00:00.000+0200'),
    },
    // time change to winterTime 30.10
    {
      startTime: moment('2022-11-22T09:00:00.000+0100'),
      endTime: moment('2022-11-22T16:00:00.000+0100'),
    },
    {
      startTime: moment('2022-12-20T09:00:00.000+0100'),
      endTime: moment('2022-12-20T16:00:00.000+0100'),
    },
    {
      startTime: moment('2023-01-17T09:00:00.000+0100'),
      endTime: moment('2023-01-17T16:00:00.000+0100'),
    },
    {
      startTime: moment('2023-02-14T09:00:00.000+0100'),
      endTime: moment('2023-02-14T16:00:00.000+0100'),
    },
    // second weekday
    {
      startTime: moment('2022-10-28T16:00:00.000+0200'),
      endTime: moment('2022-10-28T23:00:00.000+0200'),
    },
    // time change to winterTime 30.10
    {
      startTime: moment('2022-11-25T16:00:00.000+0100'),
      endTime: moment('2022-11-25T23:00:00.000+0100'),
    },

    {
      startTime: moment('2022-12-23T16:00:00.000+0100'),
      endTime: moment('2022-12-23T23:00:00.000+0100'),
    },

    {
      startTime: moment('2023-01-20T16:00:00.000+0100'),
      endTime: moment('2023-01-20T23:00:00.000+0100'),
    },

    {
      startTime: moment('2023-02-17T16:00:00.000+0100'),
      endTime: moment('2023-02-17T23:00:00.000+0100'),
    },
  ];
  expect(JSON.stringify(expectedDates)).toStrictEqual(JSON.stringify(actualDates));
});

test('success compareDateWithDayOfWeek', () => {
  expect(TestService.compareDateWithDayOfWeek(moment('2022-11-25T16:00:00.000+0100'), 5)).toBe(true);
});

test('fail compareDateWithDayOfWeek', () => {
  expect(TestService.compareDateWithDayOfWeek(moment('2022-11-25T16:00:00.000+0100'), 1)).toBe(false);
});
