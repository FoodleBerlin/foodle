import gql from 'graphql-tag';

export const Bookings = gql`
  query FindBookingsOfUser {
    findBookingsOfUser {
      Bookings {
        id
        property {
          handle
          title
        }
        daySlots {
          startTime
          endTime
        }
        bookingStatus
        frequency
        totalPrice
        startDate
        endDate
      }
    }
  }
`;
