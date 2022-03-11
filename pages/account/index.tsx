import { NextPage, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import React from 'react';
import { extractUserFromToken } from '../../server/context';
import { useFindUserQuery } from '../../codegen';
import { Token } from '../../utils/forgeJWT';
import styles from './Account.module.scss';
import Navbar from '../../components/Layout/Navbar';
import Sidebar from '../../components/Layout/Sidebar';

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  if (!req.cookies['jwt']) {
    return {
      props: {},
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
  return {
    props: {
      session: extractUserFromToken(null, req.cookies['jwt']),
      jwt: req.cookies['jwt'],
    },
  };
}
export type AuthenticatedProps = {
  session: Token['user'];
  jwt: string;
};
const Account: NextPage<AuthenticatedProps> = (props: AuthenticatedProps) => {
  console.log({ props });
  const { status, data, error, isFetching } = useFindUserQuery(
    {
      endpoint: 'http://localhost:5000/graphql',
      fetchParams: {
        headers: {
          'Content-Type': 'application/json',
          jwt: props.jwt,
        },
      },
    },
    // TODO type props
    { handle: props.session.email },
    {}
  );
  console.log({ data });
  console.log({ error });

  // TODO show default
  return (
    <div className={styles['account']}>
      <Navbar user={props.session}></Navbar>
      <Sidebar user={props.session}></Sidebar>
      <div className={styles['container']}>
        <h2>Payment Methods</h2>
        {data?.findUser.User?.paymentMethods.map((method) => {
          return (
            <div className={styles['row']}>
              <span>
                {method.type}....{method.cardNumber}
              </span>
              <span>
                Expiry: {method.expiryMonth}/{method.expiryYear}
              </span>
              <span>
                <button>make default</button>
              </span>
              <span>x</span>
            </div>
          );
        })}
        <button>Add payment</button>
      </div>

      <h2>Past Payments</h2>
      <div className={styles['container']}>
        {data?.findUser.User?.charges.map((charge) => {
          return (
            <div className={styles['row']}>
              <span>{new Date(charge.date! * 1000).toUTCString()}</span>
              <span>
                {charge.currency}
                {charge.amount! * 0.01}
              </span>
              <span>card: {charge.card}</span>
              <span>{charge.status}</span>
              <span>
                {charge.description}: {charge.invoiceId}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Account;
