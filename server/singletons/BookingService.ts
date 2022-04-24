import { BookingStatus, Frequency } from '@prisma/client';
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
                date: day.date.toISOString(),
                propertySlotId: propertyId,
              },
            },
            data: {
              bookingId: bookingId,
              bookedStartTime: day.startTime,
              bookedEndTime: day.endTime,
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
    daySlots: { endTime: string; startTime: string; weekday: 'fri' | 'mon' | 'sat' | 'sun' | 'thu' | 'wed' }[],
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
        availabeDay.startTime,
        availabeDay.endTime
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
  startTime: string,
  endTime: string
): DaySlotInterface[] {
  let allDates: DaySlotInterface[] = [];
  const firstDay: DaySlotInterface = { date: loopDay, startTime: startTime, endTime: endTime };
  allDates.push(firstDay);
  let momentCounter = 1;
  while (moment(loopDay).isBefore(endDate)) {
    if (frequency == Frequency.weekly) {
      loopDay = moment(loopDay).add(7, 'days');
    } else if (frequency == Frequency.monthly) {
      loopDay = moment(firstDay.date).add(momentCounter, 'month');
      momentCounter++;
      while (loopDay.isoWeekday() != weekday) {
        loopDay = moment(loopDay).add(1, 'days');
      }
    }
    if (moment(loopDay).isBefore(endDate)) {
      const daySlot: DaySlotInterface = { date: loopDay, startTime: startTime, endTime: endTime };
      allDates.push(daySlot);
    }
    if (frequency == Frequency.none) {
      break;
    }
  }
  return allDates;
}
