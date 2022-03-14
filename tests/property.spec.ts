import { apollo as server } from "../server/index";
import { seed } from "../utils/seed";
import { clean } from "../utils/clean";

beforeAll(async () => {
  await clean();
  await seed();
});

describe("Create Property", () => {
    const query = `mutation Mutation($size: Int!, $ownerId: String!, $street: String!, $streetNumber: Int!, $zip: Int!, $city: String!, $description: String!, $thingsToKnow: String!, $rules: String!, $cancellationType: String) {
      createListing($size: Int!, $ownerId: String!, $street: String!, $streetNumber: Int!, $zip: Int!, $city: String!, $description: String!, $thingsToKnow: String!, $rules: String!, $cancellationType: String) {
          Property {
              email
              handle
              fullName
              zip
          }
          ClientErrorUserNotExists {
              message
          }
          ClientErrorInvalidHandle {
              message
          }
          }
      }`;
      //differece to setup test context
      // how to setup test database
    it("can create a listing", async () => {
      const res = await server.executeOperation({
        query,
        variables: {
          zip: 123,
          size: 123,
          ownerId: "123",
          street: "asf",
          streetNumber: 23,
          city: "asf",
          description: "asf",
          pickup: true,
          isVerified: true,
          dailyPrice: 3,
          serviceFee: 5,
          thingsToKnow: "asf",
          rules: "adf",
          cancellationType: "fullRefundBefore1Week",
        },
      });
      expect(res).toMatchSnapshot();
    });
  });
  
  // describe("Find property by id query", () => {
  //   const query = `query Query(handle: String!) {
  //     findProperty(handle: $handle) {
  //       Property {
  //         owner {
  //           id
  //         }
  //       }
  //       ClientErrorPropertyNotExists {
  //         message
  //       }
  //       ClientErrorInvalidHandle {
  //         message
  //       }
  //     }
  //   }`;
  //   it("can query a single property by the handle", async () => {
  //     const res = await server.executeOperation({
  //       query,
  //       variables: { handle: "cl0l2m6sr00074p716hm47ro6" }, //TODO get this from globals
  //     });
  //     expect(res).toMatchSnapshot();
  //   });
  // });


//   exports[`Find property by id query by the handle 1`] = `
// Object {
//   "data": Object {
//     "findProperty": Object {
//       "ClientErrorInvalidHandle": null,
//       "ClientErrorPropertyNotExists": null,
//       "Property": Object {
//         "owner": Object {
//           "id": "cl0l2m6sr00074p716hm47ro6"
//         }
//       },
//     },
//   },
//   "errors": undefined,
//   "extensions": undefined,
//   "http": Object {
//     "headers": Headers {
//       Symbol(map): Object {},
//     },
//   },
// }
// `;