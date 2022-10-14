import { GetServerSidePropsContext, NextPage } from 'next';
import { Token } from '../../../server/utils/forgeJWT';
import { useFindUserQuery } from '../../codegen';
import Navbar from '../../components/layout/Navbar/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import { extractUserFromToken } from '../../utils/context';
import styles from './Account.module.scss';

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
      endpoint: process.env.NEXT_PUBLIC_SERVER_URL + 'graphql',
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
      <Sidebar></Sidebar>
      <div className={styles['container']}>
        <h2>Payment Methods</h2>
        {data?.findUser.User?.paymentMethods.map((method, index) => {
          return (
            <div key={index} className={styles['row']}>
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
        {data?.findUser.User?.charges.map((charge, index) => {
          return (
            <div key={index} className={styles['row']}>
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
