import { GetServerSidePropsContext, NextPage } from 'next';
import Navbar from '../components/Layout/Navbar';
import { extractUserFromToken } from '../server/context';
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

const CreateListingSuccess: NextPage<AuthenticatedProps> = (props: AuthenticatedProps) => {
  return (
    <>
      <Navbar user={props.session}></Navbar>
      <div className="container">
        <h1 className="header-primary">Your submission was successfully submitted.</h1>;
      </div>
    </>
  );
};

export default CreateListingSuccess;
