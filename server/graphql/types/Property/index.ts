import { CancellationType } from "@prisma/client";
import {
  extendType,
  objectType,
  nonNull,
  intArg,
  stringArg,
  booleanArg,
  nullable,
} from "nexus";
import { ClientErrorUserNotExists, ClientErrorInvalidHandle } from "../Error";

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
    // ('rules');
  },
});

export const findPropertyResult = objectType({
  name: "findPropertyResult",
  definition(t) {
    t.nullable.field("Property", { type: "Property" });
    t.nullable.field("ClientErrorUserNotExists", {
      type: ClientErrorUserNotExists,
    });
    t.nullable.field("ClientErrorInvalidHandle", {
      type: ClientErrorInvalidHandle,
    });
  },
});

export const PropertyQuery = extendType({
  type: "Query",
  definition(p) {
    p.nullable.list.field("propertyList", {
      type: "findPropertyResult",
      resolve() {
        return null;
      },
    });
  },
});

export const CreateListing = extendType({
  type: "Mutation",
  definition(p) {
    p.nonNull.field("createListing", {
      type: "findPropertyResult",
      args: {
        size: nonNull(intArg()),
        ownerId: nonNull(stringArg()),
        kind: nullable(stringArg()),
        street: nonNull(stringArg()),
        streetNumber: nonNull(intArg()),
        zip: nonNull(intArg()),
        city: nonNull(stringArg()),
        description: nonNull(stringArg()),
        pickup: nullable(booleanArg()),
        isVerified: nullable(booleanArg()),
        dailyPrice: nullable(intArg()),
        serviceFee: nullable(intArg()),
        thingsToKnow: nonNull(stringArg()),
        rules: nonNull(stringArg()),
        cancellationType: nonNull(stringArg()),
      },
      //check user exists, street length not empty, not longer than 200, zip code lengt, city, enumsn nullable in db? rules
      async resolve(_root, args, ctx) {
        async function findUser() {
          return await ctx.prisma.user.findUnique({
            where: {
              id: args.ownerId,
            },
          });
        }
        function validateCityStreet(): Boolean {
          if (args.street.lengt > 200) {
            return false;
          }
          if (args.street.hasNumber()) {
            return false;
          } else {
            return true;
          }
        }
        function validateZippCode(): Boolean {
          if (args.zip.toString().lengt > 5) {
            return false;
          } else {
            return true;
          }
        }
        function validateTextLength(): Boolean {
          if (args.description.lengt > 1000) {
            return false;
          } else {
            return true;
          }
        }
        if (!(await findUser())) {
          return {
            ClientErrorUserNotExists: {
              message: `owner for ownerId ${args.ownerId} does not exist`,
            },
          };
        }
        if (!validateCityStreet) {
          return {
            ClientErrorInvalidPropertyInput: {
              message: `street name ${args.street} must not contain numbers and should have a max. length of 200 characters`,
            },
          };
        }
        if (!validateZippCode) {
          return {
            ClientErrorInvalidPropertyInput: {
              message: `zip code ${args.zip} is invalid, must have a max length of 5`,
            },
          };
        }
        if(validateCityStreet()){
          return {
            ClientErrorInvalidPropertyInput: {
              message: `city name ${args.city} must not contain numbers and should have a max. length of 200 characters`,
            },
          };
        }
        if (!validateTextLength) {
          return {
            ClientErrorInvalidPropertyInput: {
              message: `description ${args.description} should have a max. length of 1000 characters`,
            },
          };
        }
        if (!validateTextLength) {
          return {
            ClientErrorInvalidPropertyInput: {
              message: `description ${args.description} should have a max. length of 1000 characters`,
            },
          };
        }

        const newProperty = {
          size: args.size,
          ownerId: args.ownerId,
          street: args.street,
          streetNumber: args.streetNumber,
          zip: args.zip,
          city: args.city,
          description: args.description,
          thingsToKnow: args.thingsToKnow,
          rules: args.rules.list,
          cancellationType: args.cancellationType,
        };
        //push to db
        try {
          let a = ctx.prisma.property.create({ data: newProperty });
          return a;
        } catch (e) {
          // catch enum parse error
          return {
            ClientErrorUserNotExists: {
              message: "no user exists with this handle",
            },
          };
        }
      },
    });
  },
});

// enum
// list of rules
// error handling
// which ones nullable

/*   kind             ModelKind        @default(property)
  id               String           @id @default(cuid())
  size             Int // will be sq.ft
  ownerId          String           @unique
  owner            User             @relation(name: "owner", fields: [ownerId], references: [id])
  bookings         Booking[]        @relation("property")
  street           String
  streetNumber     Int
  zip              Int
  city             String
  description      String
  pickup           Boolean          @default(false)
  facilities       Facility[]
  isVerified       Boolean          @default(false)
  dailyPrice       BigInt           @default(0)
  serviceFee       BigInt           @default(0)
  cancellationType CancellationType
  thingsToKnow     String
  rules            String[]
  createdAt        DateTime         @default(now())
  updatedAt        DateTime         @updatedAt */
