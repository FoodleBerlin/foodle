
import { GraphQLScalarType } from 'graphql';
import { DateTimeResolver } from 'graphql-scalars';
import { asNexusMethod } from 'nexus';
export const DateTime = asNexusMethod(new GraphQLScalarType(DateTimeResolver), 'dateTime');

export * from './Booking';
export * from './DaySlot';
export * from './Error';
export * from './Property';
export * from './PropertySlot';
export * from './User';
export * from "./DateTime"

