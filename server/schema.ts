import { makeSchema } from "nexus";
import * as path from "path";
import * as types from "./graphql/types";
import * as PrismaScalars from "nexus-prisma/scalars";

const schema = makeSchema({
  prettierConfig: path.join(process.cwd(), ".prettierrc"),
  types: [types, PrismaScalars.DateTime],
  // TODO implement isTypeOf field in all objects
  // https://nexusjs.org/docs/guides/abstract-types
  features: {
    abstractTypeStrategies: {
      isTypeOf: true,
    },
  },
  nonNullDefaults: {
    output: true,
  },
  outputs: {
    typegen: path.join(
      process.cwd(),
      "/node_modules/@types/nexus-typegen/index.d.ts"
    ),
    schema: path.join(__dirname, "/generated/schema.graphql"),
  },
  contextType: {
    export: "Context",
    module: path.join(__dirname, "/context.ts"),
  },
  sourceTypes: {
    modules: [{ module: ".prisma/client", alias: "PrismaClient" }],
  },
});

export default schema;
