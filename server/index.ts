import { ApolloServer } from "apollo-server-express";
import schema from "./schema";
import { createContext } from "./context";
import express from "express";
import ApolloServerPluginDrainHttpServer from "apollo-server-core";
import { Server } from "http";
import session from "express-session";
import {v4 as uuidv4} from "uuid";
import passport from "./passport";

export const apollo: ApolloServer = new ApolloServer({
  // An executable GraphQL schema.
  schema,
  // An object (or a function that creates an object) that's passed to every resolver that executes for a particular operation.
  introspection: true,
  // This enables resolvers to share helpful context, such as a database connection.
  context: createContext,
});
const router = express.Router();

const app = express();
const SESSION_SECRET =  'keyboard cat';

app.use(session(
  { secret: SESSION_SECRET,
    resave:false ,
    saveUninitialized: false,
  }
));
app.use(passport.initialize());
app.use(passport.session());

export async function main() {
  await apollo.start();
  app.use(router);
  apollo.applyMiddleware({app});
  await app.listen({
    port:5000,
  })
}
main();

router.get('/api/auth',
  passport.authenticate('google', { scope: ['profile'] }));

router.get('/api/callback', 
  passport.authenticate('google', { 
    failureMessage: true, 
    failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:3000');
  });