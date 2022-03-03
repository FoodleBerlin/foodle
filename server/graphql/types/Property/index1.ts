import { CancellationType, Prisma } from "@prisma/client";
import {
  extendType,
  objectType,
  nonNull,
  intArg,
  stringArg,
  booleanArg,
  nullable,
} from "nexus";
import { ClientErrorUserNotExists, ClientErrorInvalidHandle, ClientErrorInvalidPropertyInput, PropertyCreateError } from "../Error";

export const Property = objectType({
  name: "Property",
  definition(p) {
    p.string("id");
    p.int("size");
    p.string("ownerId");
    p.string("kind");

    p.string("street");
    p.int("streetNumber");
    p.int("zip");
    p.string("city");
    p.string("description");
    p.boolean("pickup");

    p.boolean("isVerified");
    p.int("dailyPrice");
    p.int("serviceFee");
    p.string("cancellationType");
    p.string("thingsToKnow");
    p.string("rules");
  },
});

/* export const findPropertyResult = objectType({ //error removed when object type + name renamed??? dame error as in user.index
  name: "findPropertyResult",
  definition(t) {
    t.nullable.field("Property", { type: "Property" });
    t.nullable.field("ClientErrorUserNotExists", {
      type: ClientErrorUserNotExists,
    });
    t.nullable.field("ClientErrorInvalidHandle", {
      type: ClientErrorInvalidHandle,
    });
    t.nullable.field("ClientErrorInvalidPropertyInput", {
      type: ClientErrorInvalidPropertyInput,
    });
    t.nullable.field("PropertyCreateError", {
      type: PropertyCreateError,
    });
  },
}); */

/* export const PropertyQuery = extendType({
  type: "Query",
  definition(p) {
    p.nullable.list.field("propertyList", {
      type: "findPropertyResult",
      resolve() {
        return null;
      },
    });
    p.nullable.field('ClientErrorUserNotExists', {
      type: ClientErrorUserNotExists,
    });
    p.nullable.field('ClientErrorInvalidPropertyInput', {
      type: ClientErrorInvalidPropertyInput,
    });
    p.nullable.field("ClientErrorInvalidHandle", {
      type: ClientErrorInvalidHandle,
    });
  },
}); */





