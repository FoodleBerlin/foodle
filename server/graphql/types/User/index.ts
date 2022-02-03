import { extendType, objectType } from "nexus";

export const User = objectType({
  name: "User",
  definition(t) {
    t.string("id");
  },
});

export const FindUser = extendType({
  type: "Query",
  definition(t) {},
});

export const CreateUser = extendType({
  type: "Mutation",
  definition(t) {},
});
