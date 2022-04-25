import { apollo as server } from '../server/index';
import { clean } from '../utils/clean';
import { seed } from '../utils/seed';

beforeAll(async () => {
  await clean();
  await seed();
});
describe('with valid data', () => {
  it('returns user if succeeded', async () => {});
});
const query = `
mutation Mutation($size: Int!, $title: String!, $ownerHandle: String!, $street: String!, $streetNumber: Int!, $zip: Int!, $city: String!, $description: String!, $hourlyPrice: Int!, $serviceFee: Int!, $facilities: [String!]!, $rules: [String!]!, $deposit: Int!, $images: [String!]!, $partialSpace: Boolean!, $startDate: DateTime!, $endDate: DateTime!, $frequency: FrequencyEnum!, $availableDays: [AvailableDay!]!, $pickup: Boolean) {
  createListing(size: $size, title: $title, ownerHandle: $ownerHandle, street: $street, streetNumber: $streetNumber, zip: $zip, city: $city, description: $description, hourlyPrice: $hourlyPrice, serviceFee: $serviceFee, facilities: $facilities, rules: $rules, deposit: $deposit, images: $images, partialSpace: $partialSpace, startDate: $startDate, endDate: $endDate, frequency: $frequency, availableDays: $availableDays, pickup: $pickup) {
    Property {
      title
      handle
      size
      owner {
        id
        fullName
        email
      }
      bookings {
        id
      }
      availabilites {
        startDate
        endDate
        propertyId
        frequency
        availableDays {
          date
          startTime
          endTime
        }
      }
      street
      streetNumber
      zip
      city
      description
      pickup
      deposit
      images
      partialSpace
      isVerified
      hourlyPrice
      serviceFee
      rules
    }
    ClientErrorUserNotExists {
      message
    }
    ClientErrorInvalidInput {
      message
    }
    NoAvailableSlots {
      message
    }
    UnknownError {
      message
    }
  }
}
    `;

/*
date and datetime in daySlots are somewhare parsed false
what if endDate apart from startDate and frequency none => should I throw an error ?

    success 
    sucess all frequencies
    success optionals
    fail, missing non nullable arg
    fail false arg type
    fail => test all validation exeptions
    fail mess with dates and times

    */

const stdVars = {
  // Todo: how to get context id?
  ownerHandle: 'user4',
  size: 0,
  ownerId: '1',
  street: 'FoodleStreet',
  streetNumber: 0, //should throw error
  zip: 0, //should throw error if < 5 digits
  city: 'Germany2', // Should throw error if city contains number
  title: 'titlee',
  description: '',
  rules: [],
  startDate: '2022-03-14T16:02:51.063Z',
  endDate: '2022-05-14T16:02:51.063Z',
  frequency: 'WEEKLY',
  hourlyPrice: 0,
  facilities: [], //Should throw error if less than 1
  deposit: 0,
  images: [''], //Should throw error if less than one or first item is empty string
  pickup: false,
  serviceFee: 0,
  partialSpace: false,
  availableDays: [
    {
      startTime: new Date('2022-01-01T01:00:00').toISOString(),
      endTime: new Date('2022-02-03T01:00:00').toISOString(), // new Date('2000-01-01T' + time + ':00').toISOString()
      weekday: 'MON',
    },
  ],
};

describe(' Property', () => {
  it('can create a listing', async () => {
    const vars = { ...stdVars };
    vars.city = 'Germany2';
    const res = await server.executeOperation({
      query,
      variables: {
        ...vars,
      },
    });
    expect(res).toMatchSnapshot();
  });
  // e.preventDefault();

  //           e.stopPropagation();'
  it('it fails when a listing city string arg out of max range', async () => {
    const vars = { ...stdVars };
    vars.city =
      ';ew;uivhwuhwruiothpiughoreuihtbgoiuherotoibueruihotuihobuiey;ew;uivhwuhwruiothpiughoreuihtbgoiuherotoibueruihotuihobuiey;ew;uivhwuhwruiothpiughoreuihtbgoiuherotoibueruihotuihobuiey;ew;uivhwuhwruiothpiughoreuihtbgoiuherotoibueruihotuihobuiey';

    const res = await server.executeOperation({
      query,
      variables: {
        ...vars,
      },
    });
    expect(res).toMatchSnapshot();
  });

  it('can query a single property by the handle', async () => {
    const query = `
    query Query($handle: String) {
      findProperty(handle: $handle) {
        ClientErrorInvalidHandle {
          message
        }
        Property {
          city
        }
      }
    }
    `;
    const res = await server.executeOperation({
      query,
      variables: { handle: '1' }, //TODO get this from globals
    });
    expect(res).toMatchSnapshot();
  });

  it('can query a list of multiple properties', async () => {
    const query = `
    query Query {
      findAllProperties {
        Properties {
          city
        }
        UnknownError {
          message
        }
      }
    }
    `;
    const res = await server.executeOperation({
      query,
    });
    expect(res).toMatchSnapshot();
  });
});
