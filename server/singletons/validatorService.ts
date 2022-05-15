import { Property } from '.prisma/client';
import { User } from '@prisma/client';
import moment from 'moment';
import prisma from './prisma';

export const ValidatorService = {
  checkForEmptyList: function (list: any[]): boolean {
    return list.length === 0;
  },

  validateStartEndDate: function (starDate: moment.Moment, endDate: moment.Moment): boolean {
    return starDate.isSameOrBefore(endDate);
  },

  propertyExists: async function (handle: string): Promise<Property | null> {
    return await prisma.property.findUnique({
      where: {
        handle: handle,
      },
    });
  },
  userExists: async function (id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  },
  isOverMaxLength: function (str: string, maxLength: number): boolean {
    return str.length > maxLength;
  },
  validateDaySlot: function (day: { endTime: string; startTime: string }): boolean {
    if (moment(day.startTime).isAfter(moment(day.endTime))) {
      return false;
    }
    if (moment(day.startTime).date() !== moment(day.endTime).date()) {
      return false;
    }
    if (moment(day.endTime).isAfter(moment(day.startTime))) {
      return true;
    }
    return false;
  },
};
