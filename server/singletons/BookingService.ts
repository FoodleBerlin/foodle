import { BookingStatus, Frequency } from '@prisma/client';
import moment from 'moment';
import { compareDateWithDayOfWeek } from '../graphql/types/helperFunctions';
import { DaySlotInterface } from '../graphql/types/Property/Objects';
import prisma from './prisma';

export const bookingService = {
  // update all daySlots with bookingId to mark them as booked
  bookDaySlots: async function (daySlotDates: DaySlotInterface[], propertyId: string, bookingId: string) {
    await Promise.all(
      daySlotDates.map((day) => {
        // updates as transaction => if one update fails all fail
        let id = '';
        if (day.daySlotId !== undefined) {
          id = day.daySlotId;
        }
        console.log('ID: ' + id);
        prisma.$transaction([
          prisma.daySlot.update({
            where: {
              id: id,
            },
            data: {
              bookingId: bookingId,
              bookedStartTime: day.startTime.toISOString(),
              bookedEndTime: day.endTime.toISOString(),
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
    daySlots: {
      endTime: string;
      startTime: string;
      weekday: 7 | 4 | 5 | 6 | 3 | 1 | 2;
    }[],
    startDate: moment.Moment,
    endDate: moment.Moment,
    frequency: Frequency
  ): DaySlotInterface[] {
    let daySlotDates: DaySlotInterface[] = [];

    // loop through availableDays and get all specific dates for each generic day
    daySlots.forEach((availabeDay) => {
      let firstConcreteDate = startDate;
      // find first concrete date for generic weekday (Mon, Tue, etc.) as it does not necessarily match with args.startDate ans save it as nextWeekday
      while (!compareDateWithDayOfWeek(firstConcreteDate, availabeDay.weekday)) {
        firstConcreteDate = moment(firstConcreteDate).add(1, 'days');
      }

      // get all concrete dates for the generic weekday in the timeslot, according to the frequency
      const datesForWeekday = getAllDatesForWeekday(
        firstConcreteDate,
        frequency,
        endDate,
        availabeDay.weekday,
        moment(availabeDay.startTime),
        moment(availabeDay.endTime)
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
  starTime: moment.Moment,
  endTime: moment.Moment
): DaySlotInterface[] {
  let allDates: DaySlotInterface[] = [];
  const copy1 = moment({ ...loopDay });
  const copy2 = moment({ ...loopDay });

  const firstDay: DaySlotInterface = {
    startTime: copy1.set({ hour: starTime.hour(), minute: starTime.minute() }),
    endTime: copy2.set({ hour: endTime.hour(), minute: endTime.minute() }),
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

      loopDay = moment(firstDay.startTime).add(momentCounter, 'month');
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
      const loopDay1 = moment({ ...loopDay });
      const loopDay2 = moment({ ...loopDay });
      allDates.push({
        startTime: loopDay1.set({ hour: starTime.hour(), minute: starTime.minute() }),
        endTime: loopDay2.set({ hour: endTime.hour(), minute: endTime.minute() }),
      });
    }
    if (frequency == Frequency.none) {
      break;
    }
  }
  return allDates;
}

// Only export for unit testing => https://stackoverflow.com/questions/54116070/how-can-i-unit-test-non-exported-functions
export const exportForTesting = { getAllDatesForWeekday };
