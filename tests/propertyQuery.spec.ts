import { clean } from '../utils/clean';
import { seed } from '../utils/seed';

beforeAll(async () => {
  await clean();
  await seed();
});

describe(' Property', () => {
  it('can query a single property by the handle', async () => {
    /*   const query = `
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
    expect(res).toMatchSnapshot(); */
  });

  /*  it('can query a list of multiple properties', async () => {
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
  }); */
});
