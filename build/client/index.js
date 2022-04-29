"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@apollo/client");
var apolloHttpLink = (0, client_1.createHttpLink)({
    uri: 'http://localhost:5000/graphql',
    //   credentials: "include",
});
var client = new client_1.ApolloClient({
    link: client_1.ApolloLink.from([apolloHttpLink]),
    cache: new client_1.InMemoryCache(),
});
exports.default = client;
