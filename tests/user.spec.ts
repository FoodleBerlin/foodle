import { apollo as server, app, router } from '../tests/server';
import { seed } from '../utils/seed';
import { clean } from '../utils/clean';
import forgeJWT from '../utils/forgeJWT';

beforeAll(async () => {
  await clean();
  await seed();
});

describe('Find user by handle', () => {
  const query = `query Query($handle: String!) {
    findUser(handle: $handle) {
        User {
            email
            handle
            fullName
            zip
            charges {
              amount
              date
              card
              status
              description
              invoiceId
              currency
            }
            paymentMethods {
              cardNumber
              expiryMonth
              expiryYear
              type
            }
            defaultPayment {
              cardNumber
              expiryMonth
              expiryYear
              type
            }
        }
        ClientErrorUserNotExists {
            message
        }
        ClientErrorInvalidHandle {
            message
        }
        }
    }`;

  describe('with valid cookie', () => {
    it('returns payment data if the user is me', async () => {
      const res = await server.executeOperation(
        {
          query,
          variables: { handle: 'user1' }, //TODO get this from globals
        },
        {
          req: {
            headers: {
              jwt: await forgeJWT({
                id: '1',
                fullName: 'test',
                email: 'user1@gmail.com',
                stripeId: 'cus_Kza1oi2OTlvcpb',
              }),
            },
          },
        } as any // because expecting request
      );
      expect(res).toMatchSnapshot();
    });
    it('does not return payment data if the user is not me', async () => {
      const res = await server.executeOperation(
        {
          query,
          variables: { handle: 'user1' }, //TODO get this from globals
        },
        {
          req: {
            headers: {
              jwt: await forgeJWT({
                id: '2',
                fullName: 'user 2',
                email: 'user2@gmail.com',
                stripeId: 'cus_Kza1oi2OTlvcpb',
              }),
            },
          },
        } as any // because expecting request
      );
      expect(res).toMatchSnapshot();
    });
  });
  describe('without valid cookie', () => {
    it('does not return payment data if there is no valid cookie', async () => {
      const res = await server.executeOperation({
        query,
        variables: { handle: 'user1' }, //TODO get this from globals
      });
      expect(res).toMatchSnapshot();
    });
  });
});
