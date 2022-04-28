import { ApolloServer } from 'apollo-server-express';
import schema from './schema';
import { createContext } from './context';
import express from 'express';
import session from 'express-session';
import passport from './passport';
import forgeJWT from '../utils/forgeJWT';
import { DataSources } from 'apollo-server-core/dist/graphqlOptions';
import StripeWrapper from './singletons/stripe/endpoints';
import datasources from './singletons/datasources';

const port = process.env.PORT || 5000

export const app = express();
app.use(passport.initialize());

app.use(
  session({
    secret: process.env.SERVER_SECRET ?? '',
    resave: false,
    saveUninitialized: false,
  })
);
export const apollo: ApolloServer = new ApolloServer({
  // An executable GraphQL schema.
  schema,
  // An object (or a function that creates an object) that's passed to every resolver that executes for a particular operation.
  introspection: true,
  // This enables resolvers to share helpful context, such as a database connection.
  context: createContext,
  dataSources: () => datasources() as DataSources<Record<'stripeWrapper', StripeWrapper>>,
});

export const router = express.Router();

export async function main() {
  await apollo.start();
  app.use(router);
  apollo.applyMiddleware({ app });
  app.listen({
    port: port,
  });
}
if (!process.env.TEST) {
  main();
}

router.get('/api/auth', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/api/callback', (req: any, res: any, next) => {
  passport.authenticate('google', async (err: any, user: any) => {
    const token = await forgeJWT(user);
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: false, // true in prod,
      sameSite: 'lax', // 'strict' in prod,
    });
    return res.redirect(process.env.CLIENT_URL);
  })(req, res, next);
});
