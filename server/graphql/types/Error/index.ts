import { objectType } from "nexus";

export const ClientErrorUserNotExists = objectType({
  name: "ClientErrorUserNotExists",
  definition(t) {
    t.string("message");
  },
});

export const ClientErrorInvalidPropertyInput =  objectType({
  name: "ClientErrorInvalidPropertyInput",
  definition(t) {
    t.string("message");
  },
});

export const ClientErrorInvalidHandle = objectType({
  name: "ClientErrorInvalidHandle",
  definition(t) {
    t.string("message");
  },
});


export const PropertyCreateError = objectType({
  name: "PropertyCreateError",
  definition(t) {
    t.string("message");
  },
});
