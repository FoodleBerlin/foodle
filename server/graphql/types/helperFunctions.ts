import { Property } from '@prisma/client';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { DaySlotInterface } from './Property';

/**
 * This function takes one concrete date as a first argument and a generic weekday (Mon, Tue, etc.) as second argument.
 * It checks if the concrete date matches with the weekday and returns true if they are the same otherwise false.
 */
export function compareDateWithDayOfWeek(date: moment.Moment, weekday: number): boolean {
  console.log(date.isoWeekday() + '   ' + weekday);
  if (date.isoWeekday() === weekday) {
    return true;
  } else {
    return false;
  }
}

export function createHandle(title: String): string {
  const id = uuidv4().substring(0, 6);
  const titleFormatted = title.toLowerCase().trim().split(' ').join('_').replace(/\s/g, '');
  return `${titleFormatted}_${id}`;
}

export function calculatePrice(daySlotDates: DaySlotInterface[], property: Property): number {
  let hours = 0;
  daySlotDates.forEach((day) => {
    var duration = moment.duration(day.startTime.diff(day.endTime));
    hours += duration.asHours();
  });
  return hours * property.hourlyPrice;
}

export function validateDaySlot(day: {
  endTime: string;
  startTime: string;
  weekday: 7 | 4 | 5 | 6 | 3 | 1 | 2;
}): boolean {
  if (moment(day.startTime).isAfter(moment(day.endTime))) {
    return false;
  }
  if (moment(day.startTime).date() !== moment(day.endTime).date()) {
    return false;
  }
  return true;
}
