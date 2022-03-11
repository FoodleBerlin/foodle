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
