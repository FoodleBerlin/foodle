import { useQuery, UseQueryOptions } from 'react-query';
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
  /** Takes a handle and returns the user.  */
  findUser: FindUserResult;
};


export type QueryFindUserArgs = {
  handle?: InputMaybe<Scalars['String']>;
};

export type FindUserResult = {
  __typename?: 'findUserResult';
  ClientErrorInvalidHandle?: Maybe<ClientErrorInvalidHandle>;
  ClientErrorUserNotExists?: Maybe<ClientErrorUserNotExists>;
  User?: Maybe<User>;
};

export type ClientErrorInvalidHandle = {
  __typename?: 'ClientErrorInvalidHandle';
  message: Scalars['String'];
};

export type ClientErrorUserNotExists = {
  __typename?: 'ClientErrorUserNotExists';
  message: Scalars['String'];
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

export type Mutation = {
  __typename?: 'Mutation';
  createUser: Scalars['Boolean'];
};

export type FindUserQueryVariables = Exact<{
  handle: Scalars['String'];
}>;


export type FindUserQuery = { __typename?: 'Query', findUser: { __typename: 'findUserResult', User?: { __typename: 'User', email: string, handle: string, fullName: string, zip: number, charges: Array<{ __typename?: 'CustomerCharge', amount?: number | null, date?: number | null, card?: string | null, status?: string | null, description?: string | null, invoiceId?: string | null, currency?: string | null }>, paymentMethods: Array<{ __typename?: 'PaymentInformation', cardNumber?: string | null, expiryMonth?: number | null, expiryYear?: number | null, type?: string | null }>, defaultPayment?: { __typename?: 'PaymentInformation', cardNumber?: string | null, expiryMonth?: number | null, expiryYear?: number | null, type?: string | null } | null } | null, ClientErrorUserNotExists?: { __typename: 'ClientErrorUserNotExists', message: string } | null, ClientErrorInvalidHandle?: { __typename: 'ClientErrorInvalidHandle', message: string } | null } };


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