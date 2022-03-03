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
      //expect(res).toMatchSnapshot();
    });
  });
  