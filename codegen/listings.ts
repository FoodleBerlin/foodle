import gql from 'graphql-tag';

export const Listings = gql`
  query Listings {
    findAllProperties {
      Properties {
        handle
        title
        size
        owner {
          id
          fullName
          email
          handle
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
        deposit
        images
        partialSpace
        isVerified
        hourlyPrice
        serviceFee
        rules
        availabilities {
          startDate
          endDate
          minMonths
          propertyId
          property {
            handle
            title
            size
            owner {
              id
              fullName
              email
              handle
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
            deposit
            images
            partialSpace
            isVerified
            hourlyPrice
            serviceFee
            rules
            availabilities {
              startDate
              endDate
              minMonths
              propertyId
              property {
                handle
                title
                size
                owner {
                  id
                  fullName
                  email
                  handle
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
                deposit
                images
                partialSpace
                isVerified
                hourlyPrice
                serviceFee
                rules
                availabilities {
                  startDate
                  endDate
                  minMonths
                  propertyId
                  property {
                    handle
                    title
                    size
                  }
                  availableDays {
                    id
                    propertySlotId
                    startTime
                    endTime
                    weekday
                    propertySlot {
                      startDate
                    }
                  }
                  frequency
                }
              }
            }
          }
        }
      }
      UnknownError {
        message
      }
    }
  }
`;
