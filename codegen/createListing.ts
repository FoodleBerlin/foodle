import gql from 'graphql-tag';

export const CreateListing = gql`
<<<<<<< HEAD
mutation CreateListing($size: Int!,$title: String!, $ownerId: String!, $street: String!, $streetNumber: Int!, $zip: Int!, $city: String!, $description: String!, $pickup: Boolean!, $facilities: [String!]!, $rules: [String!]!, $serviceFee: Int!, $hourlyPrice: Int!, $deposit: Int!, $images: [String!]!, $partialSpace: Boolean!, $availabilities: PropertySlotInput!) {
  createListing(size: $size, ownerId: $ownerId, street: $street, streetNumber: $streetNumber, zip: $zip,title: $title, city: $city, description: $description, pickup: $pickup,  facilities: $facilities, rules: $rules, serviceFee: $serviceFee, hourlyPrice: $hourlyPrice, deposit: $deposit, images: $images, partialSpace: $partialSpace, availabilities: $availabilities) {
    Property {
      size
      owner {
        id
        fullName
        email
      }
      title
      kind
      bookings {
        id
=======
  mutation CreateListing(
    $size: Int!
    $ownerId: String!
    $street: String!
    $streetNumber: Int!
    $zip: Int!
    $city: String!
    $description: String!
    $pickup: Boolean!
    $rules: [String!]!
    $title: String!
    $hourlyPrice: Int!
    $serviceFee: Int!
    $facilities: [String!]!
    $deposit: Int!
    $images: [String!]!
    $partialSpace: Boolean!
    $availabilities: PropertySlotInput!
  ) {
    createListing(
      size: $size
      ownerId: $ownerId
      street: $street
      streetNumber: $streetNumber
      zip: $zip
      city: $city
      description: $description
      pickup: $pickup
      rules: $rules
      title: $title
      hourlyPrice: $hourlyPrice
      serviceFee: $serviceFee
      facilities: $facilities
      deposit: $deposit
      images: $images
      partialSpace: $partialSpace
      availabilities: $availabilities
    ) {
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
        hourlyPrice
        serviceFee
        deposit
        rules
        availabilities {
          startDate
          endDate
          minMonths
          frequency
          availableDays {
            weekday
            startTime
            endTime
          }
        }
      }
      ClientErrorUserNotExists {
        message
>>>>>>> a4671e885b26de6b50ac7ca12af132af8ab3984f
      }
      ClientErrorInvalidHandle {
        message
      }
      ClientErrorInvalidPropertyInput {
        message
      }
      UnknownError {
        message
      }
    }
  }
`;
