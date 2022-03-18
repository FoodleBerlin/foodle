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
};

export type Query = {
  __typename?: 'Query';
  findAllProperties: FindAllPropertiesReturn;
  /** Takes a propertyId and returns the property */
  findProperty: FindPropertyResult;
  /** Takes a handle and returns the user.  */
  findUser: FindUserResult;
};


export type QueryFindPropertyArgs = {
  id?: InputMaybe<Scalars['String']>;
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
  availabilities?: Maybe<PropertySlot>;
  bookings: Array<Booking>;
  city: Scalars['String'];
  deposit: Scalars['Int'];
  description: Scalars['String'];
  facilities: Array<Scalars['String']>;
  hourlyPrice: Scalars['Int'];
  images: Array<Scalars['String']>;
  isVerified: Scalars['Boolean'];
  kind: Scalars['String'];
  minStayHours: Scalars['Int'];
  minStayWeeks: Scalars['Int'];
  owner?: Maybe<User>;
  partialSpace: Scalars['Boolean'];
  pickup: Scalars['Boolean'];
  rules: Array<Scalars['String']>;
  serviceFee: Scalars['Int'];
  size: Scalars['Int'];
  street: Scalars['String'];
  streetNumber: Scalars['Int'];
  zip: Scalars['Int'];
};

export type PropertySlot = {
  __typename?: 'PropertySlot';
  id: Scalars['String'];
};

export type Booking = {
  __typename?: 'Booking';
  id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  charges: Array<CustomerCharge>;
  defaultPayment?: Maybe<PaymentInformation>;
  email: Scalars['String'];
  fullName: Scalars['String'];
  handle: Scalars['String'];
  id: Scalars['String'];
  paymentMethods: Array<PaymentInformation>;
  zip: Scalars['Int'];
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

export type FindPropertyResult = {
  __typename?: 'findPropertyResult';
  ClientErrorInvalidHandle?: Maybe<ClientErrorInvalidHandle>;
  ClientErrorPropertyNotExists?: Maybe<ClientErrorPropertyNotExists>;
  Property?: Maybe<Property>;
};

export type ClientErrorInvalidHandle = {
  __typename?: 'ClientErrorInvalidHandle';
  message: Scalars['String'];
};

export type ClientErrorPropertyNotExists = {
  __typename?: 'ClientErrorPropertyNotExists';
  message: Scalars['String'];
};

export type FindUserResult = {
  __typename?: 'findUserResult';
  ClientErrorInvalidHandle?: Maybe<ClientErrorInvalidHandle>;
  ClientErrorUserNotExists?: Maybe<ClientErrorUserNotExists>;
  User?: Maybe<User>;
};

export type ClientErrorUserNotExists = {
  __typename?: 'ClientErrorUserNotExists';
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createListing: CreatePropertyReturn;
  createUser: Scalars['Boolean'];
};


export type MutationCreateListingArgs = {
  city: Scalars['String'];
  deposit: Scalars['Int'];
  description: Scalars['String'];
  facilities: Array<Scalars['String']>;
  hourlyPrice: Scalars['Int'];
  images: Array<Scalars['String']>;
  minStayHours: Scalars['Int'];
  minStayWeeks: Scalars['Int'];
  ownerId: Scalars['String'];
  partialSpace: Scalars['Boolean'];
  pickup?: InputMaybe<Scalars['Boolean']>;
  rules: Array<Scalars['String']>;
  serviceFee: Scalars['Int'];
  size: Scalars['Int'];
  street: Scalars['String'];
  streetNumber: Scalars['Int'];
  zip: Scalars['Int'];
};

export type CreatePropertyReturn = {
  __typename?: 'createPropertyReturn';
  ClientErrorInvalidHandle?: Maybe<ClientErrorInvalidHandle>;
  ClientErrorInvalidPropertyInput?: Maybe<ClientErrorInvalidPropertyInput>;
  ClientErrorUserNotExists?: Maybe<ClientErrorUserNotExists>;
  Property?: Maybe<Property>;
  UnknownError?: Maybe<UnknownError>;
};

export type ClientErrorInvalidPropertyInput = {
  __typename?: 'ClientErrorInvalidPropertyInput';
  message: Scalars['String'];
};

export type FindUserQueryVariables = Exact<{
  handle: Scalars['String'];
}>;


export type FindUserQuery = { __typename?: 'Query', findUser: { __typename: 'findUserResult', User?: { __typename: 'User', email: string, handle: string, fullName: string, zip: number, charges: Array<{ __typename?: 'CustomerCharge', amount?: number | null, date?: number | null, card?: string | null, status?: string | null, description?: string | null, invoiceId?: string | null, currency?: string | null }>, paymentMethods: Array<{ __typename?: 'PaymentInformation', cardNumber?: string | null, expiryMonth?: number | null, expiryYear?: number | null, type?: string | null }>, defaultPayment?: { __typename?: 'PaymentInformation', cardNumber?: string | null, expiryMonth?: number | null, expiryYear?: number | null, type?: string | null } | null } | null, ClientErrorUserNotExists?: { __typename: 'ClientErrorUserNotExists', message: string } | null, ClientErrorInvalidHandle?: { __typename: 'ClientErrorInvalidHandle', message: string } | null } };

export type CreateListingMutationVariables = Exact<{
  size: Scalars['Int'];
  ownerId: Scalars['String'];
  street: Scalars['String'];
  streetNumber: Scalars['Int'];
  zip: Scalars['Int'];
  city: Scalars['String'];
  description: Scalars['String'];
  pickup: Scalars['Boolean'];
  facilities: Array<Scalars['String']> | Scalars['String'];
  rules: Array<Scalars['String']> | Scalars['String'];
  serviceFee: Scalars['Int'];
  hourlyPrice: Scalars['Int'];
  deposit: Scalars['Int'];
  images: Array<Scalars['String']> | Scalars['String'];
  partialSpace: Scalars['Boolean'];
  minStayHours: Scalars['Int'];
  minStayWeeks: Scalars['Int'];
}>;


export type CreateListingMutation = { __typename?: 'Mutation', createListing: { __typename?: 'createPropertyReturn', Property?: { __typename?: 'Property', size: number, kind: string, street: string, streetNumber: number, zip: number, city: string, description: string, pickup: boolean, facilities: Array<string>, isVerified: boolean, hourlyPrice: number, serviceFee: number, deposit: number, rules: Array<string>, owner?: { __typename?: 'User', id: string, fullName: string, email: string } | null, bookings: Array<{ __typename?: 'Booking', id: string }>, availabilities?: { __typename?: 'PropertySlot', id: string } | null } | null } };


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
export const CreateListingDocument = `
    mutation CreateListing($size: Int!, $ownerId: String!, $street: String!, $streetNumber: Int!, $zip: Int!, $city: String!, $description: String!, $pickup: Boolean!, $facilities: [String!]!, $rules: [String!]!, $serviceFee: Int!, $hourlyPrice: Int!, $deposit: Int!, $images: [String!]!, $partialSpace: Boolean!, $minStayHours: Int!, $minStayWeeks: Int!) {
  createListing(size: $size, ownerId: $ownerId, street: $street, streetNumber: $streetNumber, zip: $zip, city: $city, description: $description, pickup: $pickup, facilities: $facilities, rules: $rules, serviceFee: $serviceFee, hourlyPrice: $hourlyPrice, deposit: $deposit, images: $images, partialSpace: $partialSpace, minStayHours: $minStayHours, minStayWeeks: $minStayWeeks) {
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
        id
      }
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