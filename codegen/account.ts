import gql from 'graphql-tag';

export const FindUser = gql`
  query FindUser($handle: String!) {
    findUser(handle: $handle) {
      __typename
      User {
        __typename
        email
        handle
        fullName
        zip
        charges {
          amount
          date
          card
          status
          description
          invoiceId
          currency
        }
        paymentMethods {
          cardNumber
          expiryMonth
          expiryYear
          type
        }
        defaultPayment {
          cardNumber
          expiryMonth
          expiryYear
          type
        }
      }
      ClientErrorUserNotExists {
        __typename
        message
      }
      ClientErrorInvalidHandle {
        __typename
        message
      }
    }
  }
`;

export const UpdateUser = gql`mutation UpdateUser($id: String, $fullName: String, $zip: Int, $description: String, $dob: String, $passportS3Id: String, $solvencyS3Id: String, $licenseS3Id: String) {
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
`