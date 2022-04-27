import { clean } from '../utils/clean';
import { seed } from '../utils/seed';

beforeAll(async () => {
  await clean();
  await seed();
});

const descriptionToLong =
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nsdfsfsfsdfsdf';

// Todo handle and propertyId missing
const query = `
mutation Mutation($size: Int!, $title: String!, $ownerHandle: String!, $street: String!, $streetNumber: Int!, $zip: Int!, $city: String!, $description: String!, $hourlyPrice: Int!, $serviceFee: Int!, $facilities: [String!]!, $rules: [String!]!, $deposit: Int!, $images: [String!]!, $partialSpace: Boolean!, $startDate: DateTime!, $endDate: DateTime!, $frequency: FrequencyEnum!, $availableDays: [AvailableDay!]!, $pickup: Boolean) {
  createListing(size: $size, title: $title, ownerHandle: $ownerHandle, street: $street, streetNumber: $streetNumber, zip: $zip, city: $city, description: $description, hourlyPrice: $hourlyPrice, serviceFee: $serviceFee, facilities: $facilities, rules: $rules, deposit: $deposit, images: $images, partialSpace: $partialSpace, startDate: $startDate, endDate: $endDate, frequency: $frequency, availableDays: $availableDays, pickup: $pickup) {
    Property {
      title
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
        frequency
        availableDays {
          date
          duration
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
date and datetime in daySlots are somewhere parsed false
what if endDate apart from startDate and frequency none => should I throw an error ?

  X success 
    success multiple days a week
    sucess all frequencies
  X success optionals
    unit test helper functions
  X fail, missing non nullable arg => not possible compiler error
  X fail false arg type => not possible compiler error
  X fail => test all validation exeptions
  X fail mess with dates and times
    user from context

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
  serviceFee: 0,
  partialSpace: false,
  availableDays: [
    {
      dateTime: '2022-01-01T09:00:00',
      duration: 3, // new Date('2000-01-01T' + time + ':00').toISOString()
      weekday: 'MON',
    },
  ],
};

describe(' Property', () => {
  it('can create a listing, frequency weekly', async () => {
    /*  const vars = { ...stdVars };
    vars.city = 'Germany2';
    const res = await server.executeOperation({
      query,
      variables: {
        ...vars,
      },
    });
    expect(res).toMatchSnapshot();*/
  });

  /*  it('can create a listing, frequency monthly', async () => {
    const vars = { ...stdVars };
    vars.frequency = 'MONTHLY';
    const res = await server.executeOperation({
      query,
      variables: {
        ...vars,
      },
    });
    expect(res).toMatchSnapshot();
  });

  it('can create a listing, frequency none', async () => {
    const vars = { ...stdVars };
    vars.frequency = 'NONE';
    const res = await server.executeOperation({
      query,
      variables: {
        ...vars,
      },
    });
    expect(res).toMatchSnapshot();
  });

  describe(' Property', () => {
    it('can create a listing, frequency weekly and multiple days per week', async () => {
      const vars = { ...stdVars };
      vars.availableDays = [
        {
          dateTime: '2022-01-01T10:00:00',
          duration: 3,
          weekday: 'MON',
        },
        {
          dateTime: '2022-01-01T08:00:00',
          duration: 6,
          weekday: 'WED',
        },
      ];
      const res = await server.executeOperation({
        query,
        variables: {
          ...vars,
        },
      });
      expect(res).toMatchSnapshot();
    });

    it('can create a listing with optional arg', async () => {
      let vars = { ...stdVars, pickup: true };

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

    // test validation

    it('it fails when a listing city string arg out of max range', async () => {
      const vars = { ...stdVars };
      vars.city =
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean mm';

      const res = await server.executeOperation({
        query,
        variables: {
          ...vars,
        },
      });
      expect(res).toMatchSnapshot();
    });

    it('it fails when a listing zip code arg out of max range', async () => {
      const vars = { ...stdVars };
      vars.zip = 123456;
      const res = await server.executeOperation({
        query,
        variables: {
          ...vars,
        },
      });
      expect(res).toMatchSnapshot();
    });
    it('it fails when a listing street arg out of max range', async () => {
      const vars = { ...stdVars };
      vars.street =
        'Lorem ipsum dolor sit amet, consectetsuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean mm';
      const res = await server.executeOperation({
        query,
        variables: {
          ...vars,
        },
      });
      expect(res).toMatchSnapshot();
    });

    it('it fails when a listing descriptiosn arg out of max range', async () => {
      const vars = { ...stdVars };
      vars.description = descriptionToLong;
      const res = await server.executeOperation({
        query,
        variables: {
          ...vars,
        },
      });
      expect(res).toMatchSnapshot();
    });

    it('it fails when startDate is after endDate', async () => {
      const vars = { ...stdVars };
      vars.startDate = '2022-05-15T16:02:51.063Z';
      const res = await server.executeOperation({
        query,
        variables: {
          ...vars,
        },
      });
      expect(res).toMatchSnapshot();
    });

    it('it fails when availableDays is empty', async () => {
      const vars = { ...stdVars };
      vars.availableDays = [];
      const res = await server.executeOperation({
        query,
        variables: {
          ...vars,
        },
      });
      expect(res).toMatchSnapshot();
    });

    it('it fails when wrong DateTime format', async () => {
      const vars = { ...stdVars };
      vars.startDate = '2022-05-15T16:051.0';
      const res = await server.executeOperation({
        query,
        variables: {
          ...vars,
        },
      });
      expect(res).toMatchSnapshot();
    });

    /*   it('can query a single property by the handle', async () => {
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
  }); */
});
