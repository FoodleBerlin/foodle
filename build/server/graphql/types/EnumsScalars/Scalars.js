"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTime = void 0;
var graphql_1 = require("graphql");
var graphql_scalars_1 = require("graphql-scalars");
var nexus_1 = require("nexus");
exports.DateTime = (0, nexus_1.asNexusMethod)(new graphql_1.GraphQLScalarType(graphql_scalars_1.DateTimeResolver), 'dateTime');
