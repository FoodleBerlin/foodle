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
          description
          dob
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
        facilities
        frequency
        startDate
        endDate
      }
    }
  }
`;
