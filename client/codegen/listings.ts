import gql from 'graphql-tag';

export const Listings = gql`
query FindAllProperties {
  findAllProperties {
    Properties {
      kind
      handle
      title
      owner {
        fullName
      }
      size
      bookings {
        tenant {
          fullName
        }
      }
      daySlots {
        startTime
        endTime
      }
      street
      streetNumber
      zip
      city
      description
      pickup
      deposit
      images
      partialSpace
      isVerified
      hourlyPrice
      serviceFee
      rules
    }
    UnknownError {
      message
    }
  }
}
`;
