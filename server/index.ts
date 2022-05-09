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
const port = process.env.PORT || 5000;
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

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', (req: any, res: any, next) => {
  passport.authenticate('google', async (err: any, user: any) => {
    const token = await forgeJWT(user);//user
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: false, // true in prod,
      sameSite: 'lax', // 'strict' in prod,
      domain: process.env.CLIENT_URL,
    });
    return res.redirect(process.env.CLIENT_URL);
  })(req, res, next);
});
//{scope: ['profile', 'email']}

router.get('/auth/facebook',
  passport.authenticate('facebook')
)



router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/error'
  }));


  //This site can’t provide a secure connectionlocalhost sent an invalid response.  ERR_SSL_PROTOCOL_ERROR


  
/* router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),
function(req, res) {
   res.redirect('/');
}); */
    /* async (err: any, user: any) => { // user always undefined
      const token = await forgeJWT(user);
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: false, // true in prod,
        sameSite: 'lax', // 'strict' in prod,
        domain: process.env.CLIENT_URL,
      });
      console.log("authentication finished")
      return res.redirect(process.env.CLIENT_URL);
    })(req, res, next); 
});*/