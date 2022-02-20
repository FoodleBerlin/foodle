 import { extendType, objectType, nonNull, intArg, stringArg, booleanArg } from "nexus";
/*
export const Property = objectType({
  name: "Property",
  definition(p) {
    p.int("id");
    p.int("size");
    p.string("ownerId");
    // bookings ??
    // owner
    p.string("street");
    p.int("streetNumber");
    p.int("zip");
    p.string("city");
    p.string("description");
    p.boolean("pickup");
    // facilities
    p.boolean("isVerified");
    p.int("dailyPrice");
    p.int("serviceFee");
    // cancellation Type
    p.string("thingsToKnow");
    // ('rules');
    // created at updated at
  },
});

export const PropertyQuery = extendType({
  type: "Query",
  definition(p) {
    p.nullable.list.field("propertyList", {
      type: "Property",
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
      type: "Property",
      args: {
        size: nonNull(intArg()),
        ownerId: nonNull(stringArg()),
        // owner
        street: nonNull(stringArg()),
        streetNumber: nonNull(intArg()),
        zip: nonNull(intArg()),
        city: nonNull(stringArg()),
        description: nonNull(stringArg()),
        pickup: nonNull(booleanArg()),
        isVerified: nonNull(booleanArg()),
        dailyPrice: nonNull(intArg()),
        serviceFee: nonNull(intArg()),
        thingsToKnow: nonNull(stringArg()),
      },
      resolve(_root, args, ctx){
        const newProperty = {
          //createId
          size: args.size,
          ownerId: args.ownerId,
          street: args.street,
          streetNumber: args.streetNumber,
          zip: args.zip,
          city: args.city,
          description: args.description,
          pickup: args.pickup,
          isVerified: args.isVerified,
          dailyPrice: args.dailyPrice,
          serviceFee: args.serviceFee,
          thingsToKnow: args.thingsToKnow
        }
        //push to db
        return newProperty
      }
    });
  },
});

 */


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
