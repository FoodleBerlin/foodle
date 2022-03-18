import { apollo as server, app, router } from '../tests/server';
import { seed } from '../utils/seed';
import { clean } from '../utils/clean';

beforeAll(async () => {
  await clean();
  await seed();
});
const query = `mutation Mutation($propertyId: String!, $startDate: String!, $endDate: String!, $tenantHandle: String!, $frequency: Frequency!, $totalPrice: Int, $bookingstatus: BookingStatus!) {
    createBooking(propertyId: $propertyId, startDate: $startDate, endDate: $endDate, tenantHandle: $tenantHandle, frequency: $frequency, totalPrice: $totalPrice, bookingstatus: $bookingstatus) {
      Booking {
        kind
        tenant {
          email
          fullName
        }
        property {
          kind
          size
        }
        bookingStatus
        totalPrice
        startDate
        endDate
        bookingSlot {
          id
        }
        frequency
      }
      UnknownError {
        message
      }
      ClientErrorUserNotExists {
        message
      }
      ClientErrorPropertyNotExists {
        message
      }
    }
  }`;

describe('with valid propertyId and userHandle', () => {
  it('returns created booking', async () => {
    const res = await server.executeOperation({
      query,
      variables: {
        propertyId: '1',
        startDate: '2022-03-16T16:02:51.063Z',
        endDate: '2022-03-16T16:02:51.063Z',
        tenantHandle: 'user1',
        frequency: 'BIWEEKLY',
        totalPrice: 1,
        bookingstatus: 'ACCEPTED',
      },
    });
    expect(res).toMatchSnapshot();
  });
});
describe('with invalid propertyId', () => {
  it('returns ClientErrorPropertyNotExists', async () => {
    const res = await server.executeOperation({
      query,
      variables: {
        propertyId: '10000000000',
        startDate: '2022-03-16T16:02:51.063Z',
        endDate: '2022-03-16T16:02:51.063Z',
        tenantHandle: 'user1',
        frequency: 'BIWEEKLY',
        totalPrice: 1,
        bookingstatus: 'ACCEPTED',
      },
    });
    expect(res).toMatchSnapshot();
  });
});
describe('with invalid userHandle', () => {
  it('returns ClientErrorUserNotExists', async () => {
    const res = await server.executeOperation({
      query,
      variables: {
        propertyId: '1',
        startDate: '2022-03-16T16:02:51.063Z',
        endDate: '2022-03-16T16:02:51.063Z',
        tenantHandle: 'non-existing-user',
        frequency: 'BIWEEKLY',
        totalPrice: 1,
        bookingstatus: 'ACCEPTED',
      },
    });
    expect(res).toMatchSnapshot();
  });
});
