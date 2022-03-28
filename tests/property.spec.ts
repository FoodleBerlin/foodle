import { apollo as server } from '../server/index';
import { seed } from '../utils/seed';
import { clean } from '../utils/clean';

beforeAll(async () => {
  await clean();
  await seed();
});

describe(' Property', () => {
  it('can create a listing', async () => {
    const query = `
    mutation Mutation($size: Int!, $ownerId: String!, $street: String!, $streetNumber: Int!, $zip: Int!, $city: String!, $description: String!, $pickup: Boolean!, $rules: [String!]!, $title: String!, $hourlyPrice: Int!, $serviceFee: Int!, $facilities: [String!]!, $deposit: Int!, $images: [String!]!, $partialSpace: Boolean!, $availabilities: PropertySlotInput!) {
      createListing(size: $size, ownerId: $ownerId, street: $street, streetNumber: $streetNumber, zip: $zip, city: $city, description: $description, pickup: $pickup, rules: $rules, title: $title, hourlyPrice: $hourlyPrice, serviceFee: $serviceFee, facilities: $facilities, deposit: $deposit, images: $images, partialSpace: $partialSpace, availabilities: $availabilities) {
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
      variables: {
        zip: 123,
        size: 123,
        ownerId: '1',
        street: 'asf',
        streetNumber: 23,
        city: 'asf',
        description: 'asf',
        pickup: true,
        rules: ['adf'],
        title: 'amazing title',
        hourlyPrice: 10,
        serviceFee: 10,
        facilities: [],
        deposit: 13,
        images: [],
        partialSpace: true,
        frequency: 'none',
        availableDays: {
          startDate: '2022-03-24T13:31:22.356Z',
          endDate: '2022-03-24T13:31:22.356Z',
          weekday: 'M',
        },
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
