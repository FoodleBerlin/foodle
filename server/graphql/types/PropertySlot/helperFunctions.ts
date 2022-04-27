import { Property, WeekDay } from '@prisma/client';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { DaySlotInterface } from '../Property/Objects';

/**
 * This function takes one concrete date as a first argument and a generic weekday (Mon, Tue, etc.) as second argument.
 * It checks if the concrete date matches with the weekday and returns true if they are the same otherwise false.
 */
export function compareDateWithDayOfWeek(date: moment.Moment, weekday: WeekDay): boolean {
  if (date.isoWeekday() === weekdayToInt(weekday)) {
    return true;
  } else {
    return false;
  }
}

export function weekdayToInt(weekday: WeekDay): number {
  switch (weekday) {
    case WeekDay.mon: {
      return 1;
    }
    case WeekDay.tue: {
      return 2;
    }
    case WeekDay.wed: {
      return 3;
    }
    case WeekDay.thu: {
      return 4;
    }
    case WeekDay.fri: {
      return 5;
    }
    case WeekDay.sat: {
      return 6;
    }
    default: {
      return 7;
    }
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
    // Todo: adapt
    /*   let start = moment(day.startTime);
    let end = moment(day.endTime);
    hours += start.diff(end, 'hours'); */
  });
  return hours * property.hourlyPrice;
}
