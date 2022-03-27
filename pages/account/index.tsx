import { GetServerSidePropsContext, NextPage } from 'next';
import Navbar from '../../components/Layout/Navbar';
import { AuthenticatedProps } from './payments';

import { useFindUserQuery, User, useUpdateUserMutation } from '../../codegen';
import Sidebar from '../../components/Layout/Sidebar';
import styles from './Account.module.scss';
import { extractUserFromToken } from '../../server/context';
import { useEffect, useState } from 'react';
import { UploaderImage } from '../../components/Create/wizard/Step4';
import ProfileButton from '../../components/Profile/ProfileButton';
import client from '../../client';
import { UpdateUser } from '../../codegen/account';

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
  const updateUserMutation = useUpdateUserMutation(
    {
      endpoint: 'http://localhost:5000/graphql',
      fetchParams: {
        headers: {
          'Content-Type': 'application/json',
          jwt: props.jwt,
        },
      },
    }
    {
      id: '1',
      fullName: 'name',
      zip: 9000,
      description: 'desc',
      dob: '1900-01-01T00:00:00Z',
      passportS3Id: 'passport',
      solvencyS3Id: 'solvency',
      licenseS3Id: 'license',
    }
  );

  const checkExists = (image: UploaderImage | null | undefined) => {
    console.log('image' + JSON.stringify(image));
    return image ? true : false;
  };
  const [passport, setPassport] = useState<UploaderImage | null>();
  const [solvency, setSolvency] = useState<UploaderImage | null>();
  const [license, setLicense] = useState<UploaderImage | null>();

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
            <label className="body-text bold-medium">First and last name</label>
            <br />
            <input maxLength={50} className="profile-form mt-one" type="text" placeholder="Jane Doe" />
          </section>

          <section>
            <label className="body-text bold-medium">Date of Birth</label>
            <br />
            <input maxLength={50} className="profile-form" type="text" placeholder="24.12.2000" />
          </section>
          <section>
            <label className="body-text bold-medium">Zip Code</label>
            <br />
            <input maxLength={50} className="profile-form mt-one" type="text" placeholder="13407" />
          </section>
          <section>
            <label className="body-text  bold-medium">Please tell us about yourself</label>
            <br />
            <textarea
              className={styles['description-input'] + ' profile-form mt-one'}
              placeholder="Please tell us about yourself"
              cols={60}
              rows={5}
              maxLength={200}
            />
          </section>
          <footer className={styles['account__document-grid'] + ' flex-space-between'}>
            <h2 className="mt-one-half body-text">Passport</h2>
            <h2 className="mt-one-half body-text">License</h2>
            <h2 className="mt-one-half body-text">Solvency</h2>
            {
              <>
                <ProfileButton
                  imageSetter={(image: UploaderImage | null) => setPassport(image)}
                  alreadyUploaded={checkExists(passport)}
                  image={passport}
                />
                <ProfileButton
                  imageSetter={(image: UploaderImage | null) => setLicense(image)}
                  alreadyUploaded={checkExists(license)}
                  image={license}
                />
                <ProfileButton
                  imageSetter={(image: UploaderImage | null) => setSolvency(image)}
                  alreadyUploaded={checkExists(solvency)}
                  image={solvency}
                />
              </>
            }
          </footer>
        </form>
      </main>
    </div>
  );
};

export default Profile;
