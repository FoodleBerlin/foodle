import { apollo as server } from "../server/index";
beforeAll(async () => {
  // TODO reset()
  // TODO seed
});

describe("Find user query", () => {
  const query = `query Query($handle: String!) {
 findUser(handle: $handle) {
   User {
     id
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
 }`;
  it("can query a single user by the handle", async () => {
    const res = await server.executeOperation({
      query,
      variables: { handle: "user1" }, //TODO get this from globals
    });
    expect(res).toMatchSnapshot();
  });
});
