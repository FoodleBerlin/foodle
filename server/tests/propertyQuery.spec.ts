import { apollo as server } from '../server/index';
import { clean } from '../utils/clean';
import { seed } from '../utils/seed';

beforeAll(async () => {
  await clean();
  await seed();
});

describe(' Property', () => {
  it('can query a single property by the handle', async () => {
    const query = `
    query FindProperty($handle: String!) {
      findProperty(handle: $handle) {
        Property {
          handle
          title
        }
        ClientErrorPropertyNotExists {
          message
        }
        ClientErrorInvalidInput {
          message
        }
      }
    }
    `;
    const res = await server.executeOperation({
      query,
      variables: { handle: 'prop1' }, //TODO get this from globals
    });
    expect(res).toMatchSnapshot();
  });

  it('can query a list of multiple properties', async () => {
    const query = `
    query Query {
      findAllProperties {
        Properties {
          handle
          title
          owner {
            fullName
          }
          bookings {
            id
          }
          daySlots {
            startTime
            endTime
          }
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
