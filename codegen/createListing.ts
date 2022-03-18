import gql from 'graphql-tag';

export const CreateListing = gql`
mutation CreateListing($size: Int!, $ownerId: String!, $street: String!, $streetNumber: Int!, $zip: Int!, $city: String!, $description: String!, $pickup: Boolean!, $facilities: [String!]!, $rules: [String!]!, $serviceFee: Int!, $hourlyPrice: Int!, $deposit: Int!, $images: [String!]!, $partialSpace: Boolean!, $minStayHours: Int!, $minStayWeeks: Int!, $availabilities: PropertySlotInput!) {
  createListing(size: $size, ownerId: $ownerId, street: $street, streetNumber: $streetNumber, zip: $zip, city: $city, description: $description, pickup: $pickup,  facilities: $facilities, rules: $rules, serviceFee: $serviceFee, hourlyPrice: $hourlyPrice, deposit: $deposit, images: $images, partialSpace: $partialSpace, minStayHours: $minStayHours, minStayWeeks: $minStayWeeks, availabilities: $availabilities) {
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
        repeats
        minimumMonth
        frequency
        availableDays {
          weekday
          bookingSlot {
            id
          }
          startTime
          endTime
        }
      }
    }
    ClientErrorUserNotExists {
      message
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
