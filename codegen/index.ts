import { useQuery, UseQueryOptions, useMutation, UseMutationOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(endpoint: string, requestInit: RequestInit, query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  findAllProperties: FindAllPropertiesReturn;
  /** Takes user handle and returns all bookings of user */
  findBookingsOfUser: GetBookingsOfUser;
  /** Takes a propertyId and returns the property */
  findProperty: FindPropertyResult;
  /** Takes a handle and returns the user.  */
  findUser: FindUserResult;
};


export type QueryFindPropertyArgs = {
  handle: Scalars['String'];
};


export type QueryFindUserArgs = {
  handle?: InputMaybe<Scalars['String']>;
};

export type FindAllPropertiesReturn = {
  __typename?: 'findAllPropertiesReturn';
  Properties?: Maybe<Array<Property>>;
  UnknownError?: Maybe<UnknownError>;
};

export type Property = {
  __typename?: 'Property';
  bookings: Array<Booking>;
  city: Scalars['String'];
  daySlots: Array<DaySlot>;
  deposit: Scalars['Int'];
  description: Scalars['String'];
  handle: Scalars['String'];
  hourlyPrice: Scalars['Int'];
  images: Array<Scalars['String']>;
  isVerified: Scalars['Boolean'];
  kind: Scalars['String'];
  owner?: Maybe<User>;
  partialSpace: Scalars['Boolean'];
  pickup?: Maybe<Scalars['Boolean']>;
  rules: Array<Scalars['String']>;
  serviceFee: Scalars['Int'];
  size: Scalars['Int'];
  street: Scalars['String'];
  streetNumber: Scalars['String'];
  title: Scalars['String'];
  zip: Scalars['Int'];
};

export type Booking = {
  __typename?: 'Booking';
  bookingStatus: BookingStatus;
  daySlots: Array<DaySlot>;
  endDate: Scalars['String'];
  frequency: FrequencyEnum;
  id: Scalars['String'];
  property: Property;
  startDate: Scalars['String'];
  tenant: User;
  totalPrice: Scalars['Float'];
};

/** map nexus BookingStatus to prisma enum */
export enum BookingStatus {
  Accepted = 'ACCEPTED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export type DaySlot = {
  __typename?: 'DaySlot';
  bookedStartTime?: Maybe<Scalars['DateTime']>;
  booking?: Maybe<Booking>;
  endTime: Scalars['DateTime'];
  property?: Maybe<Property>;
  startTime: Scalars['DateTime'];
};

/** map nexus frequency to prisma enum */
export enum FrequencyEnum {
  Monthly = 'MONTHLY',
  None = 'NONE',
  Weekly = 'WEEKLY'
}

export type User = {
  __typename?: 'User';
  charges: Array<CustomerCharge>;
  defaultPayment?: Maybe<PaymentInformation>;
  description?: Maybe<Scalars['String']>;
  dob?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  fullName: Scalars['String'];
  handle: Scalars['String'];
  id: Scalars['String'];
  licenseS3Id?: Maybe<Scalars['String']>;
  passportS3Id?: Maybe<Scalars['String']>;
  paymentMethods: Array<PaymentInformation>;
  solvencyS3Id?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['Int']>;
};

export type CustomerCharge = {
  __typename?: 'CustomerCharge';
  amount?: Maybe<Scalars['Int']>;
  card?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  invoiceId?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type PaymentInformation = {
  __typename?: 'PaymentInformation';
  cardNumber?: Maybe<Scalars['String']>;
  expiryMonth?: Maybe<Scalars['Int']>;
  expiryYear?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
};

export type UnknownError = {
  __typename?: 'UnknownError';
  message: Scalars['String'];
};

export type GetBookingsOfUser = {
  __typename?: 'GetBookingsOfUser';
  Bookings?: Maybe<Array<Booking>>;
  ClientErrorUserNotExists?: Maybe<ClientErrorUserNotExists>;
};

export type ClientErrorUserNotExists = {
  __typename?: 'ClientErrorUserNotExists';
  message: Scalars['String'];
};

export type FindPropertyResult = {
  __typename?: 'findPropertyResult';
  ClientErrorInvalidInput?: Maybe<ClientErrorInvalidInput>;
  ClientErrorPropertyNotExists?: Maybe<ClientErrorPropertyNotExists>;
  Property?: Maybe<Property>;
};

export type ClientErrorInvalidInput = {
  __typename?: 'ClientErrorInvalidInput';
  message: Scalars['String'];
};

export type ClientErrorPropertyNotExists = {
  __typename?: 'ClientErrorPropertyNotExists';
  message: Scalars['String'];
};

export type FindUserResult = {
  __typename?: 'findUserResult';
  ClientErrorInvalidHandle?: Maybe<ClientErrorInvalidHandle>;
  ClientErrorInvalidInput?: Maybe<ClientErrorInvalidInput>;
  ClientErrorUserNotExists?: Maybe<ClientErrorUserNotExists>;
  UnknownError?: Maybe<UnknownError>;
  User?: Maybe<User>;
};

export type ClientErrorInvalidHandle = {
  __typename?: 'ClientErrorInvalidHandle';
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBooking: CreateBookingReturn;
  createListing: CreateListingReturn;
  /** Edit user profile data */
  updateUser: FindUserResult;
};


export type MutationCreateBookingArgs = {
  daySlots: Array<AvailableDay>;
  endDate: Scalars['DateTime'];
  frequency: FrequencyEnum;
  propertyHandle: Scalars['String'];
  startDate: Scalars['DateTime'];
};


export type MutationCreateListingArgs = {
  availableDays: Array<AvailableDay>;
  city: Scalars['String'];
  deposit: Scalars['Int'];
  description: Scalars['String'];
  endDate: Scalars['DateTime'];
  frequency: FrequencyEnum;
  hourlyPrice: Scalars['Int'];
  images: Array<Scalars['String']>;
  ownerHandle: Scalars['String'];
  partialSpace: Scalars['Boolean'];
  pickup?: InputMaybe<Scalars['Boolean']>;
  rules: Array<Scalars['String']>;
  serviceFee: Scalars['Int'];
  size: Scalars['Int'];
  startDate: Scalars['DateTime'];
  street: Scalars['String'];
  streetNumber: Scalars['String'];
  title: Scalars['String'];
  zip: Scalars['Int'];
};


export type MutationUpdateUserArgs = {
  description?: InputMaybe<Scalars['String']>;
  dob?: InputMaybe<Scalars['String']>;
  fullName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  licenseS3Id?: InputMaybe<Scalars['String']>;
  passportS3Id?: InputMaybe<Scalars['String']>;
  solvencyS3Id?: InputMaybe<Scalars['String']>;
  zip?: InputMaybe<Scalars['Int']>;
};

export type AvailableDay = {
  endTime: Scalars['DateTime'];
  startTime: Scalars['DateTime'];
};

export type CreateBookingReturn = {
  __typename?: 'CreateBookingReturn';
  Booking?: Maybe<Booking>;
  ClientErrorInvalidInput?: Maybe<ClientErrorInvalidInput>;
  ClientErrorInvalidPropertyInput?: Maybe<ClientErrorInvalidPropertyInput>;
  ClientErrorPropertyNotExists?: Maybe<ClientErrorPropertyNotExists>;
  ClientErrorUserNotExists?: Maybe<ClientErrorUserNotExists>;
  NoAvailableSlots?: Maybe<NoAvailableSlots>;
  UnknownError?: Maybe<UnknownError>;
};

export type ClientErrorInvalidPropertyInput = {
  __typename?: 'ClientErrorInvalidPropertyInput';
  message: Scalars['String'];
};

export type NoAvailableSlots = {
  __typename?: 'NoAvailableSlots';
  message: Scalars['String'];
};

export type CreateListingReturn = {
  __typename?: 'CreateListingReturn';
  ClientErrorInvalidInput?: Maybe<ClientErrorInvalidInput>;
  ClientErrorUserNotExists?: Maybe<ClientErrorUserNotExists>;
  NoAvailableSlots?: Maybe<NoAvailableSlots>;
  Property?: Maybe<Property>;
  UnknownError?: Maybe<UnknownError>;
};

export type ClientErrorInvalidGenericDaySlotInput = {
  __typename?: 'ClientErrorInvalidGenericDaySlotInput';
  message: Scalars['String'];
};

export type ClientErrorInvalidPropertySlotInput = {
  __typename?: 'ClientErrorInvalidPropertySlotInput';
  message: Scalars['String'];
};

export type FindUserQueryVariables = Exact<{
  handle: Scalars['String'];
}>;


export type FindUserQuery = { __typename?: 'Query', findUser: { __typename: 'findUserResult', User?: { __typename: 'User', email: string, handle: string, fullName: string, zip?: number | null, dob?: any | null, passportS3Id?: string | null, solvencyS3Id?: string | null, licenseS3Id?: string | null, charges: Array<{ __typename?: 'CustomerCharge', amount?: number | null, date?: number | null, card?: string | null, status?: string | null, description?: string | null, invoiceId?: string | null, currency?: string | null }>, paymentMethods: Array<{ __typename?: 'PaymentInformation', cardNumber?: string | null, expiryMonth?: number | null, expiryYear?: number | null, type?: string | null }>, defaultPayment?: { __typename?: 'PaymentInformation', cardNumber?: string | null, expiryMonth?: number | null, expiryYear?: number | null, type?: string | null } | null } | null, ClientErrorUserNotExists?: { __typename: 'ClientErrorUserNotExists', message: string } | null, ClientErrorInvalidHandle?: { __typename: 'ClientErrorInvalidHandle', message: string } | null } };

export type UpdateUserMutationVariables = Exact<{
  updateUserId?: InputMaybe<Scalars['String']>;
  fullName?: InputMaybe<Scalars['String']>;
  zip?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  dob?: InputMaybe<Scalars['String']>;
  passportS3Id?: InputMaybe<Scalars['String']>;
  solvencyS3Id?: InputMaybe<Scalars['String']>;
  licenseS3Id?: InputMaybe<Scalars['String']>;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'findUserResult', User?: { __typename?: 'User', id: string, fullName: string, email: string, handle: string, zip?: number | null, dob?: any | null, passportS3Id?: string | null, solvencyS3Id?: string | null, licenseS3Id?: string | null, charges: Array<{ __typename?: 'CustomerCharge', amount?: number | null, date?: number | null, card?: string | null, status?: string | null, description?: string | null, currency?: string | null, invoiceId?: string | null }>, paymentMethods: Array<{ __typename?: 'PaymentInformation', cardNumber?: string | null, expiryMonth?: number | null, expiryYear?: number | null, type?: string | null }>, defaultPayment?: { __typename?: 'PaymentInformation', cardNumber?: string | null, expiryYear?: number | null, expiryMonth?: number | null, type?: string | null } | null } | null, ClientErrorUserNotExists?: { __typename?: 'ClientErrorUserNotExists', message: string } | null, ClientErrorInvalidInput?: { __typename?: 'ClientErrorInvalidInput', message: string } | null, UnknownError?: { __typename?: 'UnknownError', message: string } | null } };

export type CreateBookingMutationVariables = Exact<{
  propertyHandle: Scalars['String'];
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
  frequency: FrequencyEnum;
  daySlots: Array<AvailableDay> | AvailableDay;
}>;


export type CreateBookingMutation = { __typename?: 'Mutation', createBooking: { __typename?: 'CreateBookingReturn', Booking?: { __typename?: 'Booking', id: string, bookingStatus: BookingStatus, frequency: FrequencyEnum, totalPrice: number, startDate: string, endDate: string, tenant: { __typename?: 'User', fullName: string }, property: { __typename?: 'Property', handle: string }, daySlots: Array<{ __typename?: 'DaySlot', startTime: any, endTime: any, bookedStartTime?: any | null, booking?: { __typename?: 'Booking', id: string } | null }> } | null, ClientErrorUserNotExists?: { __typename?: 'ClientErrorUserNotExists', message: string } | null, ClientErrorPropertyNotExists?: { __typename?: 'ClientErrorPropertyNotExists', message: string } | null, ClientErrorInvalidInput?: { __typename?: 'ClientErrorInvalidInput', message: string } | null, NoAvailableSlots?: { __typename?: 'NoAvailableSlots', message: string } | null, ClientErrorInvalidPropertyInput?: { __typename?: 'ClientErrorInvalidPropertyInput', message: string } | null, UnknownError?: { __typename?: 'UnknownError', message: string } | null } };

export type CreateListingMutationVariables = Exact<{
  size: Scalars['Int'];
  title: Scalars['String'];
  ownerHandle: Scalars['String'];
  street: Scalars['String'];
  streetNumber: Scalars['String'];
  zip: Scalars['Int'];
  city: Scalars['String'];
  description: Scalars['String'];
  hourlyPrice: Scalars['Int'];
  serviceFee: Scalars['Int'];
  rules: Array<Scalars['String']> | Scalars['String'];
  deposit: Scalars['Int'];
  images: Array<Scalars['String']> | Scalars['String'];
  partialSpace: Scalars['Boolean'];
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
  frequency: FrequencyEnum;
  availableDays: Array<AvailableDay> | AvailableDay;
  pickup?: InputMaybe<Scalars['Boolean']>;
}>;


export type CreateListingMutation = { __typename?: 'Mutation', createListing: { __typename?: 'CreateListingReturn', Property?: { __typename?: 'Property', kind: string, rules: Array<string>, handle: string, title: string, size: number, street: string, streetNumber: string, zip: number, city: string, description: string, images: Array<string>, partialSpace: boolean, deposit: number, pickup?: boolean | null, isVerified: boolean, hourlyPrice: number, serviceFee: number, daySlots: Array<{ __typename?: 'DaySlot', startTime: any, endTime: any }>, owner?: { __typename?: 'User', dob?: any | null } | null } | null, ClientErrorUserNotExists?: { __typename?: 'ClientErrorUserNotExists', message: string } | null, ClientErrorInvalidInput?: { __typename?: 'ClientErrorInvalidInput', message: string } | null, NoAvailableSlots?: { __typename?: 'NoAvailableSlots', message: string } | null, UnknownError?: { __typename?: 'UnknownError', message: string } | null } };

export type FindAllPropertiesQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllPropertiesQuery = { __typename?: 'Query', findAllProperties: { __typename?: 'findAllPropertiesReturn', Properties?: Array<{ __typename?: 'Property', kind: string, handle: string, title: string, size: number, street: string, streetNumber: string, zip: number, city: string, description: string, pickup?: boolean | null, deposit: number, images: Array<string>, partialSpace: boolean, isVerified: boolean, hourlyPrice: number, serviceFee: number, rules: Array<string>, owner?: { __typename?: 'User', fullName: string } | null, bookings: Array<{ __typename?: 'Booking', tenant: { __typename?: 'User', fullName: string } }>, daySlots: Array<{ __typename?: 'DaySlot', startTime: any, endTime: any }> }> | null, UnknownError?: { __typename?: 'UnknownError', message: string } | null } };


export const FindUserDocument = `
    query FindUser($handle: String!) {
  findUser(handle: $handle) {
    __typename
    User {
      __typename
      email
      handle
      fullName
      zip
      dob
      passportS3Id
      solvencyS3Id
      licenseS3Id
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
export const useFindUserQuery = <
      TData = FindUserQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: FindUserQueryVariables,
      options?: UseQueryOptions<FindUserQuery, TError, TData>
    ) =>
    useQuery<FindUserQuery, TError, TData>(
      ['FindUser', variables],
      fetcher<FindUserQuery, FindUserQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, FindUserDocument, variables),
      options
    );
export const UpdateUserDocument = `
    mutation UpdateUser($updateUserId: String, $fullName: String, $zip: Int, $description: String, $dob: String, $passportS3Id: String, $solvencyS3Id: String, $licenseS3Id: String) {
  updateUser(id: $updateUserId, fullName: $fullName, zip: $zip, description: $description, dob: $dob, passportS3Id: $passportS3Id, solvencyS3Id: $solvencyS3Id, licenseS3Id: $licenseS3Id) {
    User {
      id
      fullName
      email
      handle
      zip
      dob
      passportS3Id
      solvencyS3Id
      licenseS3Id
      charges {
        amount
        date
        card
        status
        description
        currency
        invoiceId
      }
      paymentMethods {
        cardNumber
        expiryMonth
        expiryYear
        type
      }
      defaultPayment {
        cardNumber
        expiryYear
        expiryMonth
        type
      }
    }
    ClientErrorUserNotExists {
      message
    }
    ClientErrorInvalidInput {
      message
    }
    UnknownError {
      message
    }
  }
}
    `;
export const useUpdateUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<UpdateUserMutation, TError, UpdateUserMutationVariables, TContext>
    ) =>
    useMutation<UpdateUserMutation, TError, UpdateUserMutationVariables, TContext>(
      ['UpdateUser'],
      (variables?: UpdateUserMutationVariables) => fetcher<UpdateUserMutation, UpdateUserMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UpdateUserDocument, variables)(),
      options
    );
export const CreateBookingDocument = `
    mutation CreateBooking($propertyHandle: String!, $startDate: DateTime!, $endDate: DateTime!, $frequency: FrequencyEnum!, $daySlots: [AvailableDay!]!) {
  createBooking(propertyHandle: $propertyHandle, startDate: $startDate, endDate: $endDate, frequency: $frequency, daySlots: $daySlots) {
    Booking {
      id
      tenant {
        fullName
      }
      property {
        handle
      }
      daySlots {
        startTime
        endTime
        bookedStartTime
        booking {
          id
        }
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
export const useCreateBookingMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<CreateBookingMutation, TError, CreateBookingMutationVariables, TContext>
    ) =>
    useMutation<CreateBookingMutation, TError, CreateBookingMutationVariables, TContext>(
      ['CreateBooking'],
      (variables?: CreateBookingMutationVariables) => fetcher<CreateBookingMutation, CreateBookingMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreateBookingDocument, variables)(),
      options
    );
export const CreateListingDocument = `
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
export const useCreateListingMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<CreateListingMutation, TError, CreateListingMutationVariables, TContext>
    ) =>
    useMutation<CreateListingMutation, TError, CreateListingMutationVariables, TContext>(
      ['CreateListing'],
      (variables?: CreateListingMutationVariables) => fetcher<CreateListingMutation, CreateListingMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreateListingDocument, variables)(),
      options
    );
export const FindAllPropertiesDocument = `
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
export const useFindAllPropertiesQuery = <
      TData = FindAllPropertiesQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: FindAllPropertiesQueryVariables,
      options?: UseQueryOptions<FindAllPropertiesQuery, TError, TData>
    ) =>
    useQuery<FindAllPropertiesQuery, TError, TData>(
      variables === undefined ? ['FindAllProperties'] : ['FindAllProperties', variables],
      fetcher<FindAllPropertiesQuery, FindAllPropertiesQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, FindAllPropertiesDocument, variables),
      options
    );