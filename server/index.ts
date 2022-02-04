import { ApolloServer } from "apollo-server";
import schema from "./schema";
import { createContext } from "./context";

export const apollo = new ApolloServer({
  // An executable GraphQL schema.
  schema,
  introspection: true,
  // An object (or a function that creates an object) that's passed to every resolver that executes for a particular operation.
  // This enables resolvers to share helpful context, such as a database connection.
  context: createContext,
});

export async function main() {
  await apollo.listen({
    port: 5000,
  });
}

main();
