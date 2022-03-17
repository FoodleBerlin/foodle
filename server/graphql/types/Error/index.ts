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


export const UnknownError = objectType({
  name: "UnknownError",
  definition(t) {
    t.string("message");
  },
});

export const ClientErrorPropertyNotExists = objectType({
  name: "ClientErrorPropertyNotExists",
  definition(t) {
    t.string("message");
  },
});