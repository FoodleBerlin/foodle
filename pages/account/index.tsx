import { GetServerSidePropsContext, NextPage } from 'next';
import Navbar from '../../components/Layout/Navbar';
import { AuthenticatedProps } from './payments';

import { FindUserResult, useFindUserQuery, User, useUpdateUserMutation } from '../../codegen';
import Sidebar from '../../components/Layout/Sidebar';
import styles from './Account.module.scss';
import { extractUserFromToken } from '../../server/context';
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { UploaderImage } from '../../components/Create/wizard/Step4';
import ProfileButton from '../../components/Profile/ProfileButton';
import client from '../../client';
import { UpdateUser } from '../../codegen/account';
import React from 'react';
import { getDescription } from 'graphql';
import ProfileForm from '../../components/Profile/ProfileForm';

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
      endpoint: 'http://localhost:5000/graphql',
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
