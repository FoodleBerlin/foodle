"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@apollo/client");
var apolloUri = process.env.NEXT_PUBLIC_SERVER_URL + 'graphql';
var apolloHttpLink = (0, client_1.createHttpLink)({
    uri: apolloUri,
    //   credentials: "include",
});
var client = new client_1.ApolloClient({
    link: client_1.ApolloLink.from([apolloHttpLink]),
    cache: new client_1.InMemoryCache(),
});
exports.default = client;
