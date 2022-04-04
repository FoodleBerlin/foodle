import { GraphQLScalarType } from 'graphql';
import { DateTimeResolver } from 'graphql-scalars';
import { asNexusMethod } from 'nexus';
export const DateTime = asNexusMethod(new GraphQLScalarType(DateTimeResolver), 'dateTime');

export * from './BookingSlot';
export * from './Error';
export * from './Property';
export * from './PropertySlot';
export * from './User';
