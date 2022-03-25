import { enumType } from 'nexus';
import { Frequency as PrismaFrequency } from '@prisma/client';
export const Frequency = enumType({ name: 'Frequency', members: Object.values(PrismaFrequency).map((f) => f) });

import { GraphQLScalarType } from 'graphql';
import { DateTimeResolver } from 'graphql-scalars';
import { asNexusMethod } from 'nexus';
export const DateTime = asNexusMethod(new GraphQLScalarType(DateTimeResolver), 'dateTime');

export * from './User';
export * from './Error';
export * from './Property';
export * from './PropertySlot';
export * from './GenericDaySlot';
export * from './BookingSlot';
export * from './Mutation';
export * from './DateTime';
