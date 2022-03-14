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
    mutation Mutation($size: Int!, $ownerId: String!, $street: String!, $streetNumber: Int!, $zip: Int!, $city: String!, $description: String!, $pickup: Boolean!, $thingsToKnow: String!, $rules: String!, $cancellationType: String!) {
      createListing(size: $size, ownerId: $ownerId, street: $street, streetNumber: $streetNumber, zip: $zip, city: $city, description: $description, pickup: $pickup, thingsToKnow: $thingsToKnow, rules: $rules, cancellationType: $cancellationType) {
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
        thingsToKnow: 'asf',
        rules: 'adf',
        cancellationType: 'fullRefundBefore1Week',
      },
    });
    expect(res).toMatchSnapshot();
  });

  it('can query a single property by the id', async () => {
    const query = `
    query Query($findPropertyId: String) {
      findProperty(id: $findPropertyId) {
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
      variables: { findPropertyId: '1' }, //TODO get this from globals
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
