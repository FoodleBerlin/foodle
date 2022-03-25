import { GetServerSidePropsContext, NextPage } from 'next';
import Navbar from '../../components/Layout/Navbar';
import { AuthenticatedProps } from './index';

import { useFindUserQuery } from '../../codegen';
import Sidebar from '../../components/Layout/Sidebar';
import styles from './Account.module.scss';
import { extractUserFromToken } from '../../server/context';
import { useState } from 'react';
import { UploaderImage } from '../../components/Create/wizard/Step4';

import { v4 as uuidv4 } from 'uuid';

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
  const [passport, setPassport] = useState<UploaderImage | null>();
  const [solvency, setSolvency] = useState<UploaderImage | null>();
  const [license, setLicense] = useState<UploaderImage | null>();

  const convertFiletoUploaderImg = (file: File | null) => {
    if (file === null) return null;
    else {
      return { name: file.name, size: file.size, file: file, s3Id: uuidv4() };
    }
  };

  const buttons = (imageSetter: (image: UploaderImage | null) => void, alreadyUploaded: boolean) => {
    return alreadyUploaded ? (
      <aside className="mt-two-half">
        <label htmlFor="upload" className={'primary-btn bold'}>
          Upload
        </label>
        <input
          id="upload"
          type="file"
          onChange={(e) =>
            imageSetter(convertFiletoUploaderImg(e?.currentTarget.files ? e?.currentTarget?.files[0] : null))
          }
        />
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
        <h3 className="header-tertiary bold">My Profile</h3>
        <p className="body-text grey-text">
          This is your personal information, autofilled during booking requests for you to customize.
        </p>
        <form className="mt-three" action="">
          <section>
            <label className="body-text bold-medium">First and Last Name</label>
            <br />
            <input maxLength={50} className="profile-form" type="text" placeholder="Jane Doe" />
          </section>

          <section>
            <label className="body-text bold-medium">Date of Birth</label>
            <br />
            <input maxLength={50} className="profile-form" type="text" placeholder="24.12.2000" />
          </section>
          <section>
            <label className="body-text bold-medium">Zip Code</label>
            <br />
            <input maxLength={50} className="profile-form" type="text" placeholder="13407" />
          </section>
          <section>
            <label className="body-text  bold-medium">Please tell us about yourself</label>
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
              <h2 className="mt-two body-text">Passport</h2>
              <h2 className="mt-two body-text">License</h2>
              <h2 className="mt-two body-text">Solvency</h2>
            </div>
            <div className="mb-three">
              {buttons((image: UploaderImage | null) => setPassport(image), checkPassportExists())}
              {buttons((image: UploaderImage | null) => setLicense(image), checkLicenseExists())}
              {buttons((image: UploaderImage | null) => setSolvency(image), checkSolvencyExists())}
            </div>
          </footer>
        </form>
      </main>
    </div>
  );
};

export default Profile;
