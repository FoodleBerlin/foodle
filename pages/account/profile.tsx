import { GetServerSidePropsContext, NextPage } from 'next';
import Navbar from '../../components/Layout/Navbar';
import { AccountProps } from '.';
import { useFindUserQuery } from '../../codegen';
import Sidebar from '../../components/Layout/Sidebar';
import styles from './Account.module.scss';
import { extractUserFromToken } from '../../server/context';
import ProfileUpload from '../../components/Profile/ProfileUpload';

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

const Profile: NextPage<AccountProps> = (props: AccountProps) => {
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
    { handle: props.session.email },
    {}
  );
  console.log({ data });
  console.log({ error });

  const checkPassportExists = () => {
    console.log('Check account for passport');
    return true;
  };
  const checkLicenseExists = () => {
    console.log('Check account for license');
    return false;
  };
  const checkSolvencyExists = () => {
    console.log('Check account for license');
    return true;
  };
  const buttons = (alreadyUploaded: boolean) => {
    return alreadyUploaded ? (
      <aside className="mt-two-half">
        <label className={'primary-btn bold'}>Upload</label>
        <input id="upload" type="file" />
      </aside>
    ) : (
      <aside className="mt-two-half">
        <button className={'tertiary-btn bold' + ' mr-one'}>View</button>
        <button className={'delete-btn bold'}>Delete</button>
      </aside>
    );
  };

  return (
    <div className={styles['account']}>
      <Navbar user={props.session} />
      <Sidebar />
      <main>
        <h3 className="header-secondary">My Profile</h3>
        <p className="body-text grey">
          This is your personal information, autofilled during booking requests for you to customize.
        </p>
        <form action="">
          <section>
            <label className="body-text">First and Last Name</label>
            <br />
            <input maxLength={50} className="profile-form" type="text" placeholder="Jane Doe" />
          </section>

          <section>
            <label className="body-text">Date of Birth</label>
            <br />
            <input maxLength={50} className="profile-form" type="text" placeholder="24.12.2000" />
          </section>
          <section>
            <label className="body-text">Zip Code</label>
            <br />
            <input maxLength={50} className="profile-form" type="text" placeholder="13407" />
          </section>
          <section>
            <label className="body-text">Please tell us about yourself</label>
            <br />
            <textarea
              className={styles['description-input'] + ' profile-form'}
              placeholder="Please tell us about yourself"
              cols={60}
              rows={5}
              maxLength={200}
            />
          </section>
          <footer className="flex-space-between">
            <div>
              <h2 className="mt-two">Passport</h2>
              <h2 className="mt-two">License</h2>
              <h2 className="mt-two">Solvency</h2>
            </div>
            <div>
              {buttons(checkPassportExists())}
              {buttons(checkLicenseExists())}
              {buttons(checkSolvencyExists())}
            </div>
          </footer>
        </form>
      </main>
    </div>
  );
};

export default Profile;
