import { clean } from '../utils/clean';
import { seed } from '../utils/seed';
import { apollo as server } from './server/index';

beforeAll(async () => {
  await clean();
  await seed();
});

const query = `mutation CreateBooking($daySlots: [AvailableDay!]!, $frequency: FrequencyEnum!, $endDate: DateTime!, $startDate: DateTime!, $propertyHandle: String!) {
    createBooking(daySlots: $daySlots, frequency: $frequency, endDate: $endDate, startDate: $startDate, propertyHandle: $propertyHandle) {
      Booking {
        tenant {
          fullName
          email
          handle
          zip
        }
        property {
          handle
          title
          size
        }
        bookingStatus
        frequency
        totalPrice
        startDate
        endDate
      }
      ClientErrorUserNotExists {
        message
      }
      ClientErrorPropertyNotExists {
        message
      }
      ClientErrorInvalidInput {
        message
      }
      NoAvailableSlots {
        message
      }
      ClientErrorInvalidPropertyInput {
        message
      }
      UnknownError {
        message
      }
    }
  }`;

describe('Create Booking on Listing success with ', () => {
  it('frequency weekly, one weekday, on property proeprty2', async () => {
    const bookingVars = {
      daySlots: {
        startTime: '2022-06-27T08:00:00.003Z',
        endTime: '2022-06-27T16:00:00.003Z',
      },
      frequency: 'WEEKLY',
      startDate: '2022-06-27T08:00:00.003Z',
      endDate: '2022-07-25T08:00:00.003Z',
      propertyHandle: 'prop1',
    };
    const res = await server.executeOperation({
      query,
      variables: {
        ...bookingVars,
      },
    });
    expect(res).toMatchSnapshot();
  });

  it('frequency monthly, multiple weekdays, varying day time, property 2', async () => {
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
    const res = await server.executeOperation({
      query,
      variables: {
        ...bookingVars,
      },
    });
    expect(res).toMatchSnapshot();
  });

  it('frequency none, one weekday, second booking on one listing, property 2', async () => {
    const bookingVars = {
      daySlots: [
        {
          startTime: '2022-06-27T09:00:00.003Z',
          endTime: '2022-06-27T13:00:00.003Z',
        },
        {
          startTime: '2022-06-27T08:00:00.003Z',
          endTime: '2022-06-27T16:00:00.003Z',
        },
      ],
      frequency: 'NONE',
      startDate: '2022-05-25T08:00:00.003Z',
      endDate: '2022-07-22T08:00:00.003Z',
      propertyHandle: 'prop2',
    };
    const res = await server.executeOperation({
      query,
      variables: {
        ...bookingVars,
      },
    });
    expect(res).toMatchSnapshot();
  });
});
