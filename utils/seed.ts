import prisma from '../server/singletons/prisma';
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
          },
          {
            id: '2',
            email: 'use2@gmail.com',
            handle: 'user2',
            fullName: 'User 2',
            role: 'tenant',
            zip: 14000,
          },
          {
            id: '3',
            email: 'user3@gmail.com',
            handle: 'user3',
            fullName: 'User 3',
            role: 'tenant',
            zip: 14000,
          },
          {
            id: '4',
            email: 'user4@gmail.com',
            handle: 'user4',
            fullName: 'User 4',
            role: 'landlord',
            zip: 15000,
          },
          {
            id: '5',
            email: 'user5@gmail.com',
            handle: 'user5',
            fullName: 'User 5',
            role: 'tenantLandlord',
            zip: 16000,
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
                {
                  startTime: new Date('1999-01-01T07:00:00').toISOString(),
                  endTime: new Date('1999-01-01T19:00:00').toISOString(),
                  weekday: 'Wednesday',
                },
                {
                  startTime: new Date('1999-01-01T07:00:00').toISOString(),
                  endTime: new Date('1999-01-01T19:00:00').toISOString(),
                  weekday: 'Friday',
                },
              ],
            },
          },
        },
      },
    },
  });

  await prisma.property.create({
    data: {
      id: '2',
      size: 20,
      ownerId: '2',
      street: 'Piratenstrasse',
      streetNumber: 12,
      zip: 10247,
      city: 'Munich',
      description: 'This is the second kitchen on foodle.',
      facilities: ['Unfurnished'],
      rules: ['ggggg', 'zeah zeah', 'no smoking', 'no pets'],
      hourlyPrice: 200,
      serviceFee: 10,
      deposit: 450,
      images: ['heyy'],
      partialSpace: false,
      pickup: false,
      handle: '2',
      title: 'Small Kitchen in Munich Schwabing',
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
                {
                  startTime: new Date('1999-01-01T07:00:00').toISOString(),
                  endTime: new Date('1999-01-01T19:00:00').toISOString(),
                  weekday: 'Wednesday',
                },
                {
                  startTime: new Date('1999-01-01T07:00:00').toISOString(),
                  endTime: new Date('1999-01-01T19:00:00').toISOString(),
                  weekday: 'Friday',
                },
              ],
            },
          },
        },
      },
    },
  });

  await prisma.property.create({
    data: {
      id: '3',
      size: 45,
      ownerId: '3',
      street: 'Gleimstrasse',
      streetNumber: 44,
      zip: 12437,
      city: 'Berlin',
      description:
        'A modern kitchen in Prenzlauer Berg. You will find a nice view of the city and a lot of modern appliances.',
      facilities: ['Dishwasher', 'Oven', 'A/C', 'Elevator', 'Water'],
      rules: ['nonono', 'that', 'this', 'is', 'a', 'test'],
      hourlyPrice: 100,
      serviceFee: 200,
      deposit: 1000,
      images: ['test0', 'test', 'test2'],
      partialSpace: true,
      pickup: false,
      handle: '3',
      title: 'Modern Kitchen in Berlin Prenzlauer Berg',
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
                {
                  startTime: new Date('1999-01-01T07:00:00').toISOString(),
                  endTime: new Date('1999-01-01T19:00:00').toISOString(),
                  weekday: 'Wednesday',
                },
                {
                  startTime: new Date('1999-01-01T07:00:00').toISOString(),
                  endTime: new Date('1999-01-01T19:00:00').toISOString(),
                  weekday: 'Friday',
                },
              ],
            },
          },
        },
      },
    },
  });

  await prisma.property.create({
    data: {
      id: '4',
      size: 8910,
      ownerId: '4',
      street: 'Rigaer Strasse',
      streetNumber: 18,
      zip: 10247,
      city: 'Berlin',
      description: 'A alternative kitchen in the heart of Friedrichshain.',
      facilities: ['Dishwasher', 'Oven'],
      rules: ['no smoking', 'cleaning'],
      hourlyPrice: 150,
      serviceFee: 60,
      deposit: 300,
      images: ['bam', 'wham'],
      partialSpace: false,
      pickup: false,
      handle: '4',
      title: 'Alternative Kitchen in Berlin Friedrichshain',
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
                {
                  startTime: new Date('1999-01-01T07:00:00').toISOString(),
                  endTime: new Date('1999-01-01T19:00:00').toISOString(),
                  weekday: 'Wednesday',
                },
                {
                  startTime: new Date('1999-01-01T07:00:00').toISOString(),
                  endTime: new Date('1999-01-01T19:00:00').toISOString(),
                  weekday: 'Friday',
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
