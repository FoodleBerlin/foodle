import moment from 'moment';
import { DaySlotInterface } from '../server/graphql/types';
import { calculatePrice, createHandle } from '../server/graphql/types/helperFunctions';

test('test createHandle', () => {
  const handle = createHandle('My Amazing Kitchen');
  expect(handle).toContain('my_amazing_kitchen_');
  expect(handle.length).toBe(25);
});

test('calculatePrice', () => {
  const days: DaySlotInterface[] = [
    {
      startTime: moment('2022-08-27T10:00:00.000+0200'),
      endTime: moment('2022-08-27T18:00:00.000+0200'),
    },
    {
      startTime: moment('2022-08-28T09:00:00.000+0200'),
      endTime: moment('2022-08-28T12:00:00.000+0200'),
    },
    {
      startTime: moment('2022-08-29T11:00:00.000+0200'),
      endTime: moment('2022-08-29T20:00:00.000+0200'),
    },
  ];
  const expectedPrice: number = 2419.6;
  const actualPrice = calculatePrice(days, 120.98);
  expect(actualPrice).toBe(expectedPrice);
});
