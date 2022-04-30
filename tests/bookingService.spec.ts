import { Frequency, WeekDay } from '@prisma/client';
import moment from 'moment';
import { DaySlotInterface } from '../server/graphql/types';
import { bookingService, exportForTesting } from '../server/singletons/BookingService';

const startDate = moment('2022-06-27T10:00:00.000Z');
const endDate = moment('2022-08-27T10:00:00.000Z');
const weekDay = 1;
const time = moment('2022-06-27T08:00:00');
const duration = 8;

test('tes getAllDatesForWeekday() with frequency = none', () => {
  const actualDates: DaySlotInterface[] = exportForTesting.getAllDatesForWeekday(
    startDate,
    Frequency.none,
    endDate,
    weekDay,
    time,
    duration
  );
  const expectedDates: DaySlotInterface[] = [
    {
      dateTime: startDate.hour(time.hour()).minute(time.minute()),
      duration: duration,
    },
  ];

  expect(expectedDates).toStrictEqual(actualDates);
});

test('tes getAllDatesForWeekday() with frequency = monthly', () => {
  const actualDates: DaySlotInterface[] = exportForTesting.getAllDatesForWeekday(
    startDate,
    Frequency.monthly,
    endDate,
    weekDay,
    time,
    duration
  );
  const expectedDates: DaySlotInterface[] = [
    {
      dateTime: startDate.hour(time.hour()).minute(time.minute()),
      duration: duration,
    },
    {
      dateTime: moment('2022-07-25T06:00:00.000Z'),
      duration: duration,
    },
  ];

  expect(JSON.stringify(expectedDates)).toStrictEqual(JSON.stringify(actualDates));
});

test('tes getAllDatesForWeekday() with frequency = weekly', () => {
  const actualDates: DaySlotInterface[] = exportForTesting.getAllDatesForWeekday(
    startDate,
    Frequency.weekly,
    endDate,
    weekDay,
    time,
    duration
  );

  const expectedDates: DaySlotInterface[] = [
    {
      dateTime: startDate.hour(time.hour()).minute(time.minute()),
      duration: duration,
    },
    {
      dateTime: moment('2022-07-04T06:00:00.000Z'),
      duration: duration,
    },
    {
      dateTime: moment('2022-07-11T06:00:00.000Z'),
      duration: duration,
    },

    {
      dateTime: moment('2022-07-18T06:00:00.000Z'),
      duration: duration,
    },
    {
      dateTime: moment('2022-07-25T06:00:00.000Z'),
      duration: duration,
    },
    {
      dateTime: moment('2022-08-01T06:00:00.000Z'),
      duration: duration,
    },
    {
      dateTime: moment('2022-08-08T06:00:00.000Z'),
      duration: duration,
    },
    {
      dateTime: moment('2022-08-15T06:00:00.000Z'),
      duration: duration,
    },
    {
      dateTime: moment('2022-08-22T06:00:00.000Z'),
      duration: duration,
    },
  ];

  expect(JSON.stringify(expectedDates)).toStrictEqual(JSON.stringify(actualDates));
});

test('test calculateDates() with single daySlot, startDate = weekDay', () => {
  const actualDates = bookingService.calculateDates(
    [
      {
        duration: 5,
        dateTime: '2022-08-22T06:00:00.000Z',
        weekday: WeekDay.mon,
      },
    ],
    startDate,
    endDate,
    Frequency.weekly
  );

  const expectedDates = [
    { dateTime: '2022-06-27T06:00:00.000Z', duration: 5 },
    { dateTime: '2022-07-04T06:00:00.000Z', duration: 5 },
    { dateTime: '2022-07-11T06:00:00.000Z', duration: 5 },
    { dateTime: '2022-07-18T06:00:00.000Z', duration: 5 },
    { dateTime: '2022-07-25T06:00:00.000Z', duration: 5 },
    { dateTime: '2022-08-01T06:00:00.000Z', duration: 5 },
    { dateTime: '2022-08-08T06:00:00.000Z', duration: 5 },
    { dateTime: '2022-08-15T06:00:00.000Z', duration: 5 },
    { dateTime: '2022-08-22T06:00:00.000Z', duration: 5 },
  ];

  expect(JSON.stringify(expectedDates)).toStrictEqual(JSON.stringify(actualDates));
});

test('test calculateDates() with single daySlot, startDate != weekDay', () => {
  const actualDates = bookingService.calculateDates(
    [
      {
        duration: 5,
        dateTime: '2022-08-22T06:00:00.000Z',
        weekday: WeekDay.fri,
      },
    ],
    startDate,
    endDate,
    Frequency.weekly
  );

  const expectedDates = [
    { dateTime: '2022-07-01T06:00:00.000Z', duration: 5 },
    { dateTime: '2022-07-08T06:00:00.000Z', duration: 5 },
    { dateTime: '2022-07-15T06:00:00.000Z', duration: 5 },
    { dateTime: '2022-07-22T06:00:00.000Z', duration: 5 },
    { dateTime: '2022-07-29T06:00:00.000Z', duration: 5 },
    { dateTime: '2022-08-05T06:00:00.000Z', duration: 5 },
    { dateTime: '2022-08-12T06:00:00.000Z', duration: 5 },
    { dateTime: '2022-08-19T06:00:00.000Z', duration: 5 },
    { dateTime: '2022-08-26T06:00:00.000Z', duration: 5 },
  ];

  expect(JSON.stringify(expectedDates)).toStrictEqual(JSON.stringify(actualDates));
});

test('test calculateDates() with multiple daySlots', () => {
  const actualDates = bookingService.calculateDates(
    [
      {
        duration: 5,
        dateTime: '2022-08-22T06:00:00.000Z',
        weekday: WeekDay.mon,
      },
      {
        duration: 5,
        dateTime: '2022-08-22T06:00:00.000Z',
        weekday: WeekDay.fri,
      },
    ],
    startDate,
    endDate,
    Frequency.weekly
  );

  const expectedDates = [
    { dateTime: '2022-06-27T06:00:00.000Z', duration: 5 },
    { dateTime: '2022-07-04T06:00:00.000Z', duration: 5 },
    { dateTime: '2022-07-11T06:00:00.000Z', duration: 5 },
    { dateTime: '2022-07-18T06:00:00.000Z', duration: 5 },
    { dateTime: '2022-07-25T06:00:00.000Z', duration: 5 },
    { dateTime: '2022-08-01T06:00:00.000Z', duration: 5 },
    { dateTime: '2022-08-08T06:00:00.000Z', duration: 5 },
    { dateTime: '2022-08-15T06:00:00.000Z', duration: 5 },
    { dateTime: '2022-08-22T06:00:00.000Z', duration: 5 },
    { dateTime: '2022-07-01T06:00:00.000Z', duration: 5 },
    { dateTime: '2022-07-08T06:00:00.000Z', duration: 5 },
    { dateTime: '2022-07-15T06:00:00.000Z', duration: 5 },
    { dateTime: '2022-07-22T06:00:00.000Z', duration: 5 },
    { dateTime: '2022-07-29T06:00:00.000Z', duration: 5 },
    { dateTime: '2022-08-05T06:00:00.000Z', duration: 5 },
    { dateTime: '2022-08-12T06:00:00.000Z', duration: 5 },
    { dateTime: '2022-08-19T06:00:00.000Z', duration: 5 },
    { dateTime: '2022-08-26T06:00:00.000Z', duration: 5 },
  ];

  expect(JSON.stringify(expectedDates)).toStrictEqual(JSON.stringify(actualDates));
});
