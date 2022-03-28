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
    data : {
        size: 123,
        ownerId: '1',
        street: 'testhbdbjkfsdbjf',
        streetNumber: 1233,
        zip: 123445,
        city: 'berlin',
        description: 'testhbdbjkfsdbjf',
        rules: ['fffff'],
        hourlyPrice: 100,
        serviceFee: 0,
<<<<<<< HEAD
        deposit: 500,
        images: [],
        partialSpace: false,
        handle: '1',
        title: '1',
      },
    ],
=======
        deposit:500,
        images:["heyy"],
        pickup:false,
        facilities: ["heeyy"],
        partialSpace: false,
        availabilities:  {
          create: {
            startDate: new Date("1999-01-01T00:00:00").toISOString(),
            endDate: new Date("1999-01-01T00:00:00").toISOString(),
            minMonths: 0,
            availableDays:
            {createMany:
              {data:
                [
                  {
                  startTime:new Date("1999-01-01T00:00:00").toISOString(),
                  endTime: new Date("1999-01-01T00:00:00").toISOString(),
                  weekday:"Monday"
                  }
                ],
              },
            },
            frequency: "weekly"
          
        }
      }
      
          
    }
>>>>>>> d6af851b12f6f6407f986f8079482a7bc31d7735
  });
}
export default seed;
