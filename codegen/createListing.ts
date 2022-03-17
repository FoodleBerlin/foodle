import gql from 'graphql-tag';

export const CreateListing = gql`
  mutation CreateListing($size: Int!, $ownerId: String!, $street: String!, $streetNumber: Int!, $zip: Int!, $city: String!, $description: String!, $pickup: Boolean!, $dailyPrice: Int!, $facilities: [String!]!, $rules: [String!]!, $serviceFee: Int!) {
  createListing(size: $size, ownerId: $ownerId, street: $street, streetNumber: $streetNumber, zip: $zip, city: $city, description: $description, pickup: $pickup, dailyPrice: $dailyPrice, facilities: $facilities, rules: $rules, serviceFee: $serviceFee) {
    Property {
      size
      owner {
        id
        fullName
        email
      }
      kind
      bookings {
        id
      }
      street
      streetNumber
      zip
      city
      description
      pickup
      facilities
      isVerified
      dailyPrice
      serviceFee
      rules
      availabilities {
        id
      }
    }
  }
}
`;
