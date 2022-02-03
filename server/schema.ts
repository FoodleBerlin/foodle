import { makeSchema } from "nexus";
import * as path from "path";
import * as types from "./graphql/types";

const schema = makeSchema({
  types: [types],
  features: {
    abstractTypeStrategies: {
      isTypeOf: true,
    },
  },
  nonNullDefaults: {
    output: true,
  },
  outputs: {
    schema: path.join(
      __dirname,
      "../node_modules/@types/nexus-typegen/index.d.ts"
    ),
    typegen: path.join(__dirname, "/generated/schema.graphql"),
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
