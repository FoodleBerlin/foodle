import { GetServerSidePropsContext, NextPage } from 'next';
import AlertProvider from '../components/Alert/AlertContext';
import Wizard, { WizardProvider } from '../components/Create/wizard/Wizard';
import Navbar from '../components/Layout/Navbar';
import { extractUserFromToken } from '../utils/context';
import { AuthenticatedProps } from './account/payments';

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
  return (
    <>
      <Navbar user={props.session}></Navbar>
      <AlertProvider>
        <WizardProvider>
          <Wizard session={props.session} jwt={props.jwt}></Wizard>
        </WizardProvider>
      </AlertProvider>
    </>
  );
};

export default Create;
