import { Frequency, WeekDay } from '@prisma/client';
import moment from 'moment';

export interface DaySlot {
  date: moment.Moment;
  startTime: string;
  endTime: string;
}

export function checkForSameWeekday(date: moment.Moment, weekday: WeekDay): boolean {
  if (date.isoWeekday() === weekdayToInt(weekday)) {
    return true;
  } else {
    return false;
  }
}

export function getAllDatesForWeekday(
  loopDay: moment.Moment,
  frequency: number,
  endDate: moment.Moment,
  weekday: number,
  startTime: string,
  endTime: string
): DaySlot[] {
  let allDates: DaySlot[] = [];
  const firstDay: DaySlot = { date: loopDay, startTime: startTime, endTime: endTime };
  allDates.push(firstDay);
  while (moment(loopDay).isBefore(endDate)) {
    if (frequency < 15) {
      loopDay = moment(loopDay).add(frequency, 'days');
    } else {
      loopDay = moment(loopDay).add(1, 'month');
      while (loopDay.isoWeekday() != weekday) {
        loopDay = moment(loopDay).add(1, 'days');
      }
    }
    if (moment(loopDay).isBefore(endDate)) {
      const daySlot: DaySlot = { date: loopDay, startTime: startTime, endTime: endTime };
      allDates.push(daySlot);
    }
  }
  return allDates;
}

export function frequencyToInt(frequency: Frequency): number {
  switch (frequency) {
    case Frequency.biweekly: {
      return 14;
    }
    case Frequency.weekly: {
      return 7;
    }
    case Frequency.monthly: {
      return 30;
    }
    default: {
      return 0;
    }
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
