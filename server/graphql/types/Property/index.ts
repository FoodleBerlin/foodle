import { CancellationType, Prisma } from "@prisma/client";

import { Context } from '../../../context';
import {
  extendType,
  objectType,
  nonNull,
  intArg,
  stringArg,
  booleanArg,
  nullable,
} from "nexus";
import { ClientErrorUserNotExists, ClientErrorInvalidHandle, ClientErrorInvalidPropertyInput, PropertyCreateError, ClientErrorPropertyNotExists } from "../Error";
import { Exception } from "sass";
import { isRegExp } from "util/types";

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




// Query Property By Id
 export const FindPropertyResult = objectType({
  name: 'findPropertyResult',
  definition(t) {
    t.nullable.field('Property', { type: 'Property' });
    t.nullable.field('ClientErrorPropertyNotExists', {
      type: ClientErrorPropertyNotExists,
    });
    t.nullable.field('ClientErrorInvalidHandle', {
      type: ClientErrorInvalidHandle,
    });
  },
});

export const QueryById = extendType({
  type: 'Query',
  definition(t) {
    t.field('findProperty', {
      type: FindPropertyResult,
      description: 'Takes a handle and returns the user',
      args: { id: stringArg() },
      resolve: async (_, args, ctx: Context) => {
        if (!args.id) {
          return {
            ClientErrorInvalidHandle: {
              message: 'id is null',
            },
          };
        } else {
          // TODO validate handle
          try {
            const property = await ctx.prisma.property.findUnique({
              where: {
                id: args.id,
              },
            });
            if (property) {
              return { Property: property };
            } else {
              return {
                ClientErrorPropertyNotExists: {
                  message: `no property exists with id ${args.id}`,
                },
              };
            }
          } catch (e) {
            return {
              ClientErrorPropertyNotExists: {
                message: `no property exists with id ${args.id}`,
              },
            };
          }
        }
      },
    });
  },
});



export const CreatePropertyReturn = objectType({ //error removed when object type + name renamed??? dame error as in user.index
  name: "createPropertyReturn",
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
});


export const CreateListing = extendType({
  type: "Mutation",
  definition(p) {
    p.field("createListing", { 
      type: "createPropertyReturn", // needs to be changed
      args: {
        size: nonNull(intArg()),
        ownerId: nonNull(stringArg()),
        //kind: nullable(stringArg()),
        street: nonNull(stringArg()),
        streetNumber: nonNull(intArg()),
        zip: nonNull(intArg()),
        city: nonNull(stringArg()),
        description: nonNull(stringArg()),
        //pickup: nullable(booleanArg()),
        //isVerified: nullable(booleanArg()),
        //dailyPrice: nullable(intArg()),
        //serviceFee: nullable(intArg()),
        thingsToKnow: nonNull(stringArg()),
        rules: nonNull(stringArg()),
        cancellationType: nonNull(stringArg()),
      },
    
      //check user exists, street length not empty, not longer than 200, zip code lengt, city, enumsn nullable in db? rules
       resolve(_root, args, ctx) {
       function findUser() {
          return ctx.prisma.user.findUnique({
            where: {
              id: args.ownerId,
            },
          });
        }
        function validateCityStreet(): Boolean {
          if (args.street.length > 200 || args.city.length > 200) {
            return true;
          }else {
            return false
          } 
        }
        function validateZippCode(): Boolean {
         if (args.zip.toString().length > 5) {
            return false;
          } else {
            return true;
          } 
        }
        function validateTextLength(): Boolean {
          if (args.description.length > 1000) {
            return false;
          } else {
            return true;
          } 
        }
        if (!(findUser())) {
           return {
            ClientErrorUserNotExists: {
              message: `owner for ownerId ${args.ownerId} does not exist`,
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
        let thisUser =  ctx.prisma.user.findUnique({
          where: {
            id: args.ownerId,
        },})
        const newProperty = {
          size: args.size,
          ownerId: args.ownerId,
          street: args.street,
          streetNumber: args.streetNumber,
          zip: args.zip,
          city: args.city,
          description: args.description,
          thingsToKnow: args.thingsToKnow,
          rules: args.rules,
          cancellationType: CancellationType.fullRefundBefore1Week,
          
        };
        try {
           const prop = ctx.prisma.property.create({ data: newProperty});
          return {'Property': prop}
        } catch (error) {
          let errorMessage = "Unkknown error"
          if(error instanceof Error){
            errorMessage = error.message
          }
          return {
            PropertyCreateError: {
              message: errorMessage,
            },
          };
        }
      }
    }); 
  },
});
// defualts, nullable, enum, nested relationships, tests

export const findAllProperties = objectType({
  name: 'findAllProperties',
  definition(t) {
    t.nullable.field('Property', { type: 'Property' });
    t.nullable.field('ClientErrorInvalidHandle', {
      type: ClientErrorInvalidHandle,
    });
  },
});

export const Query2 = extendType({
  type: 'Query',
  definition(t) {
    t.field('findAllProperties', {
      type: 'findAllProperties',
      description: 'Takes a handle and returns the user',
      resolve: async (_, args, ctx: Context) => {
        let a = await ctx.prisma.property.findFirst()
        if(a){
          return {'Property': a}
        }else {
          return   {ClientErrorInvalidHandle: {
            message: 'No properties found',
          },
        };
      }
      },
    });
  },
});