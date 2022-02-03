import { ApolloServer } from "apollo-server-express";
import express from "Express";
import { createServer } from "http";
import schema from "./schema";
import { createContext } from "./context";

const { PORT = 5000 } = process.env;
const app = express();
app.use(express.json());

const server = createServer(app);
const corsOptions = {
  credentials: true,
};

export const apollo = new ApolloServer({
  schema,
  introspection: true,
  apollo: {},
  context: createContext,
});

export async function main() {
  await apollo.start();
  apollo.applyMiddleware({ app, cors: corsOptions });
  server.listen({ port: PORT }, () => {
    `Server read at http://localhost${PORT}${apollo.graphqlPath}`;
  });
}

main();
