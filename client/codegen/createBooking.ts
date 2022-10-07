import gql from 'graphql-tag';

export const CreateBooking = gql`
  mutation CreateBooking(
    $propertyHandle: String!
    $startDate: DateTime!
    $endDate: DateTime!
    $frequency: FrequencyEnum!
    $daySlots: [AvailableDay!]!
  ) {
    createBooking(
      propertyHandle: $propertyHandle
      startDate: $startDate
      endDate: $endDate
      frequency: $frequency
      daySlots: $daySlots
    ) {
      Booking {
        tenant {
          fullName
          handle
          zip
        }
        property {
          handle
          title
          size
        }
        bookingStatus
        frequency
        totalPrice
        startDate
        endDate
      }
      ClientErrorUserNotExists {
        message
      }
      ClientErrorPropertyNotExists {
        message
      }
      ClientErrorInvalidInput {
        message
      }
      NoAvailableSlots {
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
