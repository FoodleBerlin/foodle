import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { DaySlotInterface } from './Property';

/**
 * This function takes one concrete date as a first argument and a generic weekday (Mon, Tue, etc.) as second argument.
 * It checks if the concrete date matches with the weekday and returns true if they are the same otherwise false.
 */

export function createHandle(title: String): string {
  const id = uuidv4().substring(0, 6);
  const titleFormatted = title.toLowerCase().trim().split(' ').join('_').replace(/\s/g, '');
  return `${titleFormatted}_${id}`;
}

export function calculatePrice(daySlotDates: DaySlotInterface[], price: number): number {
  let hours = 0;
  daySlotDates.forEach((day) => {
    var duration = moment.duration(day.endTime.diff(day.startTime));
    hours += duration.asHours();
  });
  return hours * price;
}
