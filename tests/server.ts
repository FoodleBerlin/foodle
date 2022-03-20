import { ApolloServer } from 'apollo-server-express';
import schema from '../server/schema';
import { createContext } from '../server/context';
import express from 'express';
import session from 'express-session';
import passport from '../server/passport';
import forgeJWT from '../utils/forgeJWT';
import StripeWrapper from '~/server/singletons/stripe/endpoints';
import { DataSources } from 'apollo-server-core/dist/graphqlOptions';
export const app = express();
app.use(passport.initialize());

app.use(
  session({
    secret: process.env.SERVER_SECRET ?? '',
    resave: false,
    saveUninitialized: false,
  })
);
console.log('init');
export const apollo: ApolloServer = new ApolloServer({
  // An executable GraphQL schema.
  schema,
  // An object (or a function that creates an object) that's passed to every resolver that executes for a particular operation.
  introspection: true,
  // This enables resolvers to share helpful context, such as a database connection.
  context: createContext,
  dataSources: () =>
    ({
      stripeWrapper: {
        getCustomer: (params: { customerId: string }) => {
          console.log('MOCK');
          return Promise.resolve({
            response: {
              success: {
                body: {
                  invoice_settings: {
                    default_payment_method: 'customer',
                  },
                },
              },
            },
          });
        },
        getCustomerPaymentMethods: (params: { customerId: string }) => {
          console.log('MOCK');
          return Promise.resolve({
            response: {
              success: {
                body: {
                  data: [
                    {
                      card: {
                        cardNumber: '1234',
                        type: 'visa',
                        exp_month: 1,
                        exp_year: 2020,
                      },
                    },
                  ],
                },
              },
            },
          });
        },
        getCustomerCharges: (params: { customerId: string }) => {
          console.log('MOCK');
          return Promise.resolve({
            response: {
              success: {
                body: {
                  data: [
                    {
                      currency: 'EUR',
                      amount: 10,
                      date: 10,
                      card: '1234',
                      status: 'succeeded',
                      description: 'test',
                      invoiceId: '123',
                    },
                  ],
                },
              },
            },
          });
        },
        createCustomer: (params: { email: string }) => {
          console.log('MOCK');
          return Promise.resolve({
            response: {
              success: {
                body: {
                  id: 'createCustomer',
                },
              },
            },
          });
        },
      },
    } as DataSources<Record<'stripeWrapper', StripeWrapper>>),
});

export const router = express.Router();

export async function main() {
  await apollo.start();
  app.use(router);
  apollo.applyMiddleware({ app });
  app.listen({
    port: 0,
  });
}
main();

router.get('/api/auth', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/api/callback', (req: any, res: any, next) => {
  passport.authenticate('google', async (err: any, user: any) => {
    const token = await forgeJWT(user);
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: false, // true in prod,
      sameSite: 'lax', // 'strict' in prod,
    });
    return res.redirect('http://localhost:3000');
  })(req, res, next);
});
