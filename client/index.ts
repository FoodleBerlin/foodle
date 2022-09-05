import {
  ApolloClient, ApolloLink, createHttpLink, InMemoryCache
} from "@apollo/client";

const apolloUri = process.env.NEXT_PUBLIC_SERVER_URL+'graphql';
const apolloHttpLink = createHttpLink({
  uri: apolloUri,
//   credentials: "include",
});

const client = new ApolloClient({
  link: ApolloLink.from([apolloHttpLink]),
  cache: new InMemoryCache(),
});

export const mutationObj = (jwt: string) => {
  return {
    endpoint: process.env.NEXT_PUBLIC_SERVER_URL + 'graphql',
    fetchParams: {
      headers: {
        'Content-Type': 'application/json',
        jwt: jwt,
      },
    },
  };
};

export default client;