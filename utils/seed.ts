import prisma from '../server/singletons/prisma';
import {DateTime} from '../server/graphql/types';
export async function seed() {
  const [users] = await Promise.all(
    await prisma.$transaction([
      prisma.user.createMany({
        data: [
          {
            id: '1',
            email: 'user1@gmail.com',
            handle: 'user1',
            fullName: 'User 1',
            role: 'tenant',
            zip: 13000,
            description: "desc",
            passportS3Id: "passS3",
            solvencyS3Id: "solvS3",
            licenseS3Id: "liceS3",
          },
          {
            id: '2',
            email: 'use2@gmail.com',
            handle: 'user2',
            fullName: 'User 2',
            role: 'tenant',
            zip: 14000,
            description: "desc",
            passportS3Id: "passS3",
            solvencyS3Id: "solvS3",
            licenseS3Id: "liceS3",
          },
          {
            id: '3',
            email: 'user3@gmail.com',
            handle: 'user3',
            fullName: 'User 3',
            role: 'tenant',
            zip: 14000,
            description: "desc",
            passportS3Id: "passS3",
            solvencyS3Id: "solvS3",
            licenseS3Id: "liceS3",
          },
          {
            id: '4',
            email: 'user4@gmail.com',
            handle: 'user4',
            fullName: 'User 4',
            role: 'landlord',
            zip: 15000,
            description: "desc",
            passportS3Id: "passS3",
            solvencyS3Id: "solvS3",
            licenseS3Id: "liceS3",
          },
          {
            id: '5',
            email: 'user5@gmail.com',
            handle: 'user5',
            fullName: 'User 5',
            role: 'tenantLandlord',
            zip: 16000,
            description: "desc",
            passportS3Id: "passS3",
            solvencyS3Id: "solvS3",
            licenseS3Id: "liceS3",
          },
        ],
      }),
    ])
  );

  await prisma.property.create({
    data: {
      id: '1',
      size: 30,
      ownerId: '1',
      street: 'Turmstrasse',
      streetNumber: 1233,
      zip: 10210,
      city: 'Berlin',
      description: 'this is the first kitchen on foodle.',
      facilities: ['Dishwasher', 'Oven', 'Elevator'],
      rules: ['Hello its me', 'no smoking'],
      hourlyPrice: 100,
      serviceFee: 50,
      deposit: 500,
      images: ['new image'],
      partialSpace: false,
      pickup: false,
      handle: '1',
      title: 'Industrial Grade Kitchen in Mitte',
      isVerified: true,
      availabilities: {
        create: {
          startDate: new Date('2022-03-25').toISOString(),
          endDate: new Date('2022-04-08').toISOString(),
          minMonths: 1,
          frequency: 'weekly',
          availableDays: {
            createMany: {
              data: [
                {
                  startTime: new Date('1999-01-01T07:00:00').toISOString(),
                  endTime: new Date('1999-01-01T19:00:00').toISOString(),
                  weekday: 'Monday',
                },
              ],
            },
          },
        },
      },
    },
  });
}

export default seed;
