import { apollo as server, app, router } from '../server/index';
import { seed } from '../utils/seed';
import { clean } from '../utils/clean';
import forgeJWT from '../utils/forgeJWT';

beforeAll(async () => {
  await clean();
  await seed();
});

describe('Update User', ()=>{
  const mutation = `mutation UpdateUser($id: String, $fullName: String, $zip: Int, $description: String, $dob: String, $passportS3Id: String, $solvencyS3Id: String, $licenseS3Id: String) {
  updateUser(id: $id, fullName: $fullName, zip: $zip, description: $description, dob: $dob, passportS3Id: $passportS3Id, solvencyS3Id: $solvencyS3Id, licenseS3Id: $licenseS3Id) {
    User {
      fullName
      email
      handle
      zip
      id
      dob
      description
      passportS3Id
      solvencyS3Id
      licenseS3Id
    }
  }
}
`;
describe('with valid data', () => {
    it('returns user if succeeded', async () => {
      const res = await server.executeOperation(
        {
          query: mutation,
          variables: { 
            
           }, //TODO get this from globals
        },
        {
          req: {
            headers: {
              jwt: await forgeJWT({
                id: '1',
                fullName: 'test',
                email: 'user1@gmail.com',
                stripeId: 'cus_Kza1oi2OTlvcpb',
              }),
            },
          },
        } as any // because expecting request
      );
      expect(res).toMatchSnapshot();
    });
    it('does not return payment data if the user is not me', async () => {
      const res = await server.executeOperation(
        {
          query,
          variables: { handle: 'user1' }, //TODO get this from globals
        },
        {
          req: {
            headers: {
              jwt: await forgeJWT({
                id: '2',
                fullName: 'user 2',
                email: 'user2@gmail.com',
                stripeId: 'cus_Kza1oi2OTlvcpb',
              }),
            },
          },
        } as any // because expecting request
      );
      expect(res).toMatchSnapshot();
    });
  });
})
