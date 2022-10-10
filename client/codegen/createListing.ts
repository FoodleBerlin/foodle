import gql from 'graphql-tag';

export const CreateListing = gql`
  mutation CreateListing($size: Int!, $title: String!, $ownerHandle: String!, $street: String!, $streetNumber: String!, $zip: Int!, $city: String!, $description: String!, $hourlyPrice: Int!, $serviceFee: Int!, $rules: [String!]!, $deposit: Int!, $images: [String!]!, $partialSpace: Boolean!, $startDate: DateTime!, $endDate: DateTime!, $frequency: FrequencyEnum!, $availableDays: [AvailableDay!]!, $pickup: Boolean) {
  createListing(size: $size, title: $title, ownerHandle: $ownerHandle, street: $street, streetNumber: $streetNumber, zip: $zip, city: $city, description: $description, hourlyPrice: $hourlyPrice, serviceFee: $serviceFee, rules: $rules, deposit: $deposit, images: $images, partialSpace: $partialSpace, startDate: $startDate, endDate: $endDate, frequency: $frequency, availableDays: $availableDays, pickup: $pickup) {
    Property {
      kind
      rules
      handle
      daySlots {
        startTime
        endTime
      }
      title
      size
      owner {
        dob
      }
      street
      streetNumber
      zip
      city
      description
      images
      partialSpace
      deposit
      pickup
      isVerified
      hourlyPrice
      serviceFee
    }
    ClientErrorUserNotExists {
      message
    }
    ClientErrorInvalidInput {
      message
    }
    NoAvailableSlots {
      message
    }
    UnknownError {
      message
    }
  }
}
`;
