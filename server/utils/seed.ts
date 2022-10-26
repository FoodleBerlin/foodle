import prisma from '../singletons/prisma';
import { clean } from './clean';
export async function seed() {
  await clean();
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
            description: 'desc',
            passportS3Id: 'passS3',
            solvencyS3Id: 'solvS3',
            licenseS3Id: 'liceS3',
          },
          {
            id: '2',
            email: 'use2@gmail.com',
            handle: 'user2',
            fullName: 'User 2',
            role: 'tenant',
            zip: 14000,
            description: 'desc',
            passportS3Id: 'passS3',
            solvencyS3Id: 'solvS3',
            licenseS3Id: 'liceS3',
          },
          {
            id: '3',
            email: 'user3@gmail.com',
            handle: 'user3',
            fullName: 'User 3',
            role: 'tenant',
            zip: 14000,
            description: 'desc',
            passportS3Id: 'passS3',
            solvencyS3Id: 'solvS3',
            licenseS3Id: 'liceS3',
          },
          {
            id: '4',
            email: 'user4@gmail.com',
            handle: 'user4',
            fullName: 'User 4',
            role: 'landlord',
            zip: 15000,
            description: 'desc',
            passportS3Id: 'passS3',
            solvencyS3Id: 'solvS3',
            licenseS3Id: 'liceS3',
          },
          {
            id: '5',
            email: 'user5@gmail.com',
            handle: 'user5',
            fullName: 'User 5',
            role: 'tenantLandlord',
            zip: 16000,
            description: 'desc',
            passportS3Id: 'passS3',
            solvencyS3Id: 'solvS3',
            licenseS3Id: 'liceS3',
          },
        ],
      }),
    ])
  );

  await prisma.$transaction([
    prisma.property.createMany({
      data: [
        {
          zip: 1355,
          size: 123,
          street: 'sample-street',
          streetNumber: '23',
          city: 'Berlin',
          description: 'user1-listing',
          serviceFee: 5,
          rules: ['rule-1', 'rule-2'],
          title: 'prop title',
          hourlyPrice: 12,
          deposit: 2,
          images: ['test-image-url'],
          partialSpace: false,
          ownerId: '1',
          handle: 'prop1',
          frequency: 'weekly',
          facilities: ['Unfurnished'],
          startDate: '2022-06-27T08:00:00.003Z',
          endDate: '2022-06-30T08:00:00.003Z',
        },
        {
          zip: 1355,
          size: 123,
          street: 'sample-street',
          streetNumber: '23',
          city: 'Berlin',
          description: 'user1-listing',
          serviceFee: 5,
          rules: ['rule-1', 'rule-2'],
          title: 'prop title',
          hourlyPrice: 12,
          deposit: 2,
          images: ['test-image-url'],
          partialSpace: false,
          ownerId: '2',
          handle: 'prop2',
          frequency: 'weekly',
          facilities: ['Elevator', 'Parking', 'Dishwasher'],
          startDate: '2022-08-27T08:00:00.003Z',
          endDate: '2022-09-30T08:00:00.003Z',
        },
        {
          zip: 1355,
          size: 123,
          street: 'sample-street',
          streetNumber: '23',
          city: 'Berlin',
          description: 'user1-listing',
          serviceFee: 5,
          rules: ['rule-1', 'rule-2'],
          title: 'prop title',
          hourlyPrice: 12,
          deposit: 2,
          images: ['test-image-url'],
          partialSpace: false,
          ownerId: '2',
          handle: 'prop3',
          frequency: 'weekly',
          facilities: ['Elevator', 'Parking'],
          startDate: '2022-10-27T08:00:00.003Z',
          endDate: '2022-11-30T08:00:00.003Z',
        },
      ],
    }),
  ]);

  const prop1 = await prisma.property.findUnique({
    where: {
      handle: 'prop1',
    },
  });
  if (prop1 == null) {
    throw Error('Error while seeding db, property with handle prop1 does not exist.');
  }
  const prop2 = await prisma.property.findUnique({
    where: {
      handle: 'prop2',
    },
  });
  if (prop2 == null) {
    throw Error('Error while seeding db, property with handle prop2 does not exist.');
  }
  // seeding for booking request
  /*  
      test weekly, one weekday
      {
        daySlots: {
          startTime: '2022-06-27T08:00:00.003Z',
          endTime: '2022-06-27T16:00:00.003Z',
        },
        frequency: 'NONE',
        startDate: '2022-06-27T08:00:00.003Z',
        endDate: '2022-07-25T08:00:00.003Z',
        propertyHandle: 'prop1',
      } */
  await prisma.$transaction([
    prisma.daySlot.createMany({
      data: [
        {
          startTime: '2022-06-27T08:00:00.003Z',
          endTime: '2022-06-27T16:00:00.003Z',
          propertyId: prop1.id,
        },
        {
          startTime: '2022-07-04T08:00:00.003Z',
          endTime: '2022-07-04T16:00:00.003Z',
          propertyId: prop1.id,
        },
        {
          startTime: '2022-07-11T08:00:00.003Z',
          endTime: '2022-07-11T16:00:00.003Z',
          propertyId: prop1.id,
        },
        {
          startTime: '2022-07-18T08:00:00.003Z',
          endTime: '2022-07-18T16:00:00.003Z',
          propertyId: prop1.id,
        },
        {
          startTime: '2022-07-25T08:00:00.003Z',
          endTime: '2022-07-25T16:00:00.003Z',
          propertyId: prop1.id,
        },

        /* 
          test monthly + multiple weekdays + varying day time
          
          const bookingVars = {
            daySlots: [
              {
                startTime: '2022-05-23T10:00:00.003Z',
                endTime: '2022-05-23T16:00:00.003Z',
              },
              {
                startTime: '2022-05-25T08:00:00.003Z',
                endTime: '2022-05-25T16:00:00.003Z',
              },
            ],
            frequency: 'MONTHLY',
            startDate: '2022-05-25T08:00:00.003Z',
            endDate: '2022-07-22T08:00:00.003Z',
            propertyHandle: 'prop2',
          };
        */

        {
          startTime: '2022-05-25T08:00:00.003Z',
          endTime: '2022-05-25T16:00:00.003Z',
          propertyId: prop2.id,
        },
        {
          startTime: '2022-05-23T08:00:00.003Z',
          endTime: '2022-05-23T16:00:00.003Z',
          propertyId: prop2.id,
        },
        {
          startTime: '2022-06-20T08:30:00.003Z',
          endTime: '2022-06-20T16:00:00.003Z',
          propertyId: prop2.id,
        },
        {
          startTime: '2022-06-22T08:00:00.003Z',
          endTime: '2022-06-22T16:00:00.003Z',
          propertyId: prop2.id,
        },
        {
          startTime: '2022-07-18T09:00:00.003Z',
          endTime: '2022-07-18T16:00:00.003Z',
          propertyId: prop2.id,
        },
        {
          startTime: '2022-07-20T08:00:00.003Z',
          endTime: '2022-07-20T16:00:00.003Z',
          propertyId: prop2.id,
        },
        /* 
          test frequency none
          {
          "daySlots": {
            "startTime": "2022-06-27T09:00:00.003Z",
            "endTime": "2022-06-27T13:00:00.003Z",
            "weekday": "FRI"
          },
           {
            "startTime": "2022-06-27T08:00:00.003Z",
            "endTime": "2022-06-27T16:00:00.003Z",
            "weekday": "WED"
          },
          "frequency": "NONE",
          "startDate": "2022-05-25T08:00:00.003Z",
          "endDate": "2022-07-22T08:00:00.003Z",
          "propertyHandle": "prop2"
        } */

        {
          startTime: '2022-08-19T08:00:00.003Z',
          endTime: '2022-08-19T16:00:00.003Z',
          propertyId: prop2.id,
        },
      ],
    }),
  ]);
}
