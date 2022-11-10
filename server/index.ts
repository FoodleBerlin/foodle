import { DataSources } from 'apollo-server-core/dist/graphqlOptions';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import { createContext } from './context';
import passport from './passport';
import schema from './schema';
import datasources from './singletons/datasources';
import StripeWrapper from './singletons/stripe/endpoints';
import forgeJWT from './utils/forgeJWT';
export const app = express();
app.use(passport.initialize());

export const isProduction = process.env.NEXT_PUBLIC_SERVER_URL !== 'http://localhost:5000/';
if (isProduction) {
  // Sets CSP header, enforces HTTPS, sets X-Frame-Options Header
  app.use(helmet());
}
app.use(
  session({
    // Default name makes it easier for attackers to fingerprint server
    name: 'SecureSession',
    secret: process.env.SERVER_SECRET ?? '',
    resave: false,
    saveUninitialized: false,
  })
);

export const apollo: ApolloServer = new ApolloServer({
  // An executable GraphQL schema.
  schema,
  // @ts-ignore
  // Need to check whet
  csrfPrevention: true,
  // An object (or a function that creates an object) that's passed to every resolver that executes for a particular operation.
  // Turned off for production to prevent accidentally sharing business secrets
  introspection: isProduction ? false : true,
  // This enables resolvers to share helpful context, such as a database connection.
  context: createContext,
  dataSources: () => datasources() as DataSources<Record<'stripeWrapper', StripeWrapper>>,
});

const corsOptions = {
  origin: [process.env.CLIENT_URL!, 'https://studio.apollographql.com'],
};
export const router = express.Router();
const port = process.env.PORT || 5000;
export async function main() {
  await apollo.start();
  app.use(router);
  apollo.applyMiddleware({ app, cors: corsOptions });
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
      // Is session cookie, expires on client shutdown
      httpOnly: true, // prevents scripts from reading cookie
      secure: isProduction ? true : false, // prevents cookie from being sent over unencrypted connection
      sameSite: isProduction ? 'strict' : 'lax', // Strict=browser will not send the cookie to our website if the request comes from a different domain,
      //Lax= Browser only blocks cookies with unsafe HTTP methods like POST
    });
    return res.redirect(process.env.CLIENT_URL);
  })(req, res, next);
});
