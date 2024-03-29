import { apollo as server } from '../server/index';
import { clean } from '../utils/clean';
import { seed } from '../utils/seed';

beforeAll(async () => {
  await clean();
  await seed();
});

const descriptionToLong =
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nsdfsfsfsdfsdf';

const query = `
mutation CreateListing($size: Int!, $title: String!, $ownerHandle: String!, $street: String!, $streetNumber: String!, $zip: Int!, $city: String!, $description: String!, $hourlyPrice: Int!, $serviceFee: Int!, $rules: [String!]!, $deposit: Int!, $images: [String!]!, $partialSpace: Boolean!, $startDate: DateTime!, $endDate: DateTime!, $frequency: FrequencyEnum!, $availableDays: [AvailableDay!]!) {
  createListing(size: $size, title: $title, ownerHandle: $ownerHandle, street: $street, streetNumber: $streetNumber, zip: $zip, city: $city, description: $description, hourlyPrice: $hourlyPrice, serviceFee: $serviceFee, rules: $rules, deposit: $deposit, images: $images, partialSpace: $partialSpace, startDate: $startDate, endDate: $endDate, frequency: $frequency, availableDays: $availableDays) {
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
 AvailableDays are not tested, as they are retrieved from the db in a different order each time therefore
 snaps are never equal. DaySlot logic is tested separately in unit tests
  Todo: test if daySlots get saved to db correctly => user different owners
*/

const stdVars = {
  ownerHandle: 'user4',
  size: 0,
  ownerId: '1',
  street: 'FoodleStreet',
  streetNumber: 0,
  zip: 0,
  city: 'Germany',
  title: 'titlee',
  description: '',
  rules: [],
  startDate: '2022-03-14T16:02:51.063Z',
  endDate: '2022-05-14T16:02:51.063Z',
  frequency: 'WEEKLY',
  hourlyPrice: 0,
  deposit: 0,
  images: [''],
  serviceFee: 0,
  partialSpace: false,
  availableDays: [
    {
      startTime: '2022-01-07T09:00:00.000Z',
      endTime: '2022-01-07T12:00:00.000Z',
    },
  ],
};

describe(' Property', () => {
  it('can create a listing, frequency weekly', async () => {
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

  it('can create a listing, frequency monthly', async () => {
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
          startTime: '2022-01-01T10:00:00.000Z',
          endTime: '2022-01-01T13:00:00.000Z',
        },
        {
          startTime: '2022-01-01T08:00:00.000Z',
          endTime: '2022-01-01T14:00:00.000Z',
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
  });
});
