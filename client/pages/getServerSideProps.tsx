import { GetServerSidePropsContext, NextPage } from 'next';
import { extractUserFromToken } from '../server/context';

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
const NullPage: NextPage = () => {
  return <></>;
};
export default NullPage;
