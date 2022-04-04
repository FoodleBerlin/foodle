import { Kind } from 'graphql';
import { scalarType } from 'nexus';

//export const DateTime = asNexusMethod(new GraphQLScalarType(DateTimeResolver), 'dateTime');

// https://fullstackdatasolutions.com/creating-datetime-scalar-with-nexus-graphql/
export const DateTimeScalar = scalarType({
  name: 'Date',
  asNexusMethod: 'date',
  description: 'Date custom scalar type',
  parseValue(value) {
    return new Date(value);
  },
  serialize(value) {
    return value.getTime();
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    return null;
  },
});
