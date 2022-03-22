import React from 'react';
import Wizard, { WizardProvider } from '../components/Layout/wizard/Wizard';
import Navbar from '../components/Layout/Navbar';
import { GetServerSidePropsContext, NextPage } from 'next';
import { extractUserFromToken } from '../server/context';
import { AuthenticatedProps } from './account';

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

const Create: NextPage<AuthenticatedProps> = (props: AuthenticatedProps) => {
  console.log(props);
  return (
    <>
      <Navbar user={props.session}></Navbar>
      <WizardProvider>
        <Wizard session={props.session} jwt={props.jwt}></Wizard>
      </WizardProvider>
    </>
  );
};

export default Create;