import { BookingStatus, Frequency, WeekDay } from '@prisma/client';
import moment from 'moment';
import { DaySlotInterface } from '../graphql/types/Property/Objects';
import { compareDateWithDayOfWeek, weekdayToInt } from '../graphql/types/PropertySlot/helperFunctions';
import prisma from './prisma';

export const bookingService = {
  // update all daySlots with bookingId to mark them as booked
  bookDaySlots: async function (daySlotDates: DaySlotInterface[], propertyId: string, bookingId: string) {
    await Promise.all(
      daySlotDates.map((day) => {
        // updates as transaction => if one update fails all fail
        prisma.$transaction([
          prisma.daySlot.update({
            where: {
              date_propertySlotId: {
                date: day.dateTime.toISOString(),
                propertySlotId: propertyId,
              },
            },
            data: {
              bookingId: bookingId,
              bookedStartTime: day.dateTime.toISOString(),
              bookedEndTime: day.dateTime.add(day.duration, 'hours').toISOString(),
            },
          }),
        ]);
      })
    );
  },

  createBooking: async function (
    userId: string,
    propertyId: string,
    price: number,
    startDate: moment.Moment,
    endDate: moment.Moment,
    frequency: Frequency
  ) {
    return prisma.booking.create({
      data: {
        tenantId: userId,
        propertyId: propertyId,
        bookingStatus: BookingStatus.pending,
        totalPrice: price,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        frequency: frequency,
      },
    });
  },

  calculateDates: function (
    daySlots: { duration: number; dateTime: string; weekday: WeekDay }[],
    startDate: moment.Moment,
    endDate: moment.Moment,
    frequency: Frequency
  ): DaySlotInterface[] {
    let daySlotDates: DaySlotInterface[] = [];
    // loop through availableDays and get all specific dates for each generic day
    daySlots.forEach((availabeDay) => {
      let firstConcreteDate = startDate;
      // find first concrete date for generic weekday (Mon, Tue, etc.) as it does not necessarily match with args.startDate ans save it as nextWeekday
      while (compareDateWithDayOfWeek(firstConcreteDate, availabeDay.weekday)) {
        firstConcreteDate = moment(firstConcreteDate).add(1, 'days');
      }
      // get all concrete dates for the generic weekday in the timeslot, according to the frequency
      const datesForWeekday = getAllDatesForWeekday(
        firstConcreteDate,
        frequency,
        endDate,
        weekdayToInt(availabeDay.weekday),
        moment(availabeDay.dateTime),
        availabeDay.duration
      );
      datesForWeekday.forEach((date) => {
        daySlotDates.push(date);
      });
    });
    return daySlotDates;
  },
};

function getAllDatesForWeekday(
  loopDay: moment.Moment,
  frequency: Frequency,
  endDate: moment.Moment,
  weekday: number,
  time: moment.Moment,
  duration: number
): DaySlotInterface[] {
  let allDates: DaySlotInterface[] = [];
  const firstDay: DaySlotInterface = {
    dateTime: loopDay.hour(time.hour()).minute(time.minute()),
    duration: duration,
  };
  allDates.push(firstDay);
  let momentCounter = 1;
  while (moment(loopDay).isBefore(endDate)) {
    if (frequency == Frequency.weekly) {
      loopDay = moment(loopDay).add(7, 'days');
    } else if (frequency == Frequency.monthly) {
      loopDay = moment().endOf('month');
      while (loopDay.day() !== weekday) {
        loopDay.subtract(1, 'day');
      }

      loopDay = moment(firstDay.dateTime).add(momentCounter, 'month');
      const month = loopDay.month();
      momentCounter++;
      while (loopDay.isoWeekday() != weekday) {
        loopDay = moment(loopDay).add(1, 'days');
      }
      // if loopDay is already in next month
      if (loopDay.month() !== month) {
        loopDay = loopDay.subtract(1, 'days');
        while (loopDay.isoWeekday() !== weekday) {
          loopDay = loopDay.subtract(1, 'days');
        }
      }
    }
    if (moment(loopDay).isBefore(endDate) && frequency != Frequency.none) {
      const daySlot: DaySlotInterface = {
        dateTime: loopDay.hour(time.hour()).minute(time.minute()),
        duration: duration,
      };
      allDates.push(daySlot);
    }
    if (frequency == Frequency.none) {
      break;
    }
  }
  return allDates;
}
// Only export for unit testing => https://stackoverflow.com/questions/54116070/how-can-i-unit-test-non-exported-functions
export const exportForTesting = { getAllDatesForWeekday };
