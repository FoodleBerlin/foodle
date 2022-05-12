import { GetServerSidePropsContext, NextPage } from 'next';
import Navbar from '../../components/Layout/Navbar';
import { AuthenticatedProps } from './payments';
import { useFindUserQuery } from '../../codegen';
import Sidebar from '../../components/Layout/Sidebar';
import styles from './Account.module.scss';
import { extractUserFromToken } from '../../server/context';
import { useRef } from 'react';
import React from 'react';
import ProfileForm from '../../components/Profile/ProfileForm';
import { envVars } from '../../env-config';

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
const Profile: NextPage<AuthenticatedProps> = (props: AuthenticatedProps) => {
  const {
    data: findUserData,
    status,
    error,
    isFetching,
  } = useFindUserQuery(
    {
      endpoint: process.env.NEXT_PUBLIC_SERVER_URL + 'graphql',
      fetchParams: {
        headers: {
          'Content-Type': 'application/json',
          jwt: props.jwt,
        },
      },
    },
    { handle: props.session.email },
    {}
  );

  const isMounted = useRef(false);

  return (
    <div className={styles['account']}>
      <Navbar user={props.session} />
      <Sidebar />
      <main>
        <ProfileForm session={props.session} isMountedRef={isMounted} jwt={props.jwt} user={findUserData} />
      </main>
    </div>
  );
};

export default Profile;
