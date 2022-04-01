import { GetServerSidePropsContext, NextPage } from 'next';
import Navbar from '../../components/Layout/Navbar';
import { AuthenticatedProps } from './payments';

import { useFindUserQuery, User, useUpdateUserMutation } from '../../codegen';
import Sidebar from '../../components/Layout/Sidebar';
import styles from './Account.module.scss';
import { extractUserFromToken } from '../../server/context';
import { ChangeEvent, useEffect, useState } from 'react';
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
  console.log({ error });
  console.log({ findUserData });
  const { mutate, data } = useUpdateUserMutation({
    endpoint: 'http://localhost:5000/graphql',
    fetchParams: {
      headers: {
        'Content-Type': 'application/json',
        jwt: props.jwt,
      },
    },
  });

  const checkExists = (image: UploaderImage | null | undefined) => {
    return image ? true : false;
  };
  const submit = () => {
    const dobChecked = !isNaN(Date.parse(dob ? dob : '')) ? dob + 'T00:00:00Z' : null;
    const zipChecked = zip && zip !== '' ? parseInt(zip) : null;
    mutate({
      id: props.session.id,
      fullName: fullName,
      zip: zipChecked,
      description: description,
      dob: dobChecked,
      passportS3Id: passport ? passport.s3Id : null,
      solvencyS3Id: solvency ? solvency.s3Id : null,
      licenseS3Id: license ? license.s3Id : null,
    });
    console.log({ data });
  };
  const user = findUserData?.findUser.User;
  const [passport, setPassport] = useState<UploaderImage>();
  const [solvency, setSolvency] = useState<UploaderImage>();
  const [license, setLicense] = useState<UploaderImage>();
  const [dob, setDob] = useState<string>(user?.dob ?? '');
  const [fullName, setFullName] = useState<string>(user?.fullName ?? '');
  const [zip, setZip] = useState<string>(user?.zip ? user?.zip.toString() : '');
  const [description, setDescription] = useState<string>(user?.description ?? '');
  const text = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    return e?.target?.value ? e?.target?.value : '';
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
            <label className="body-text bold-medium">First and last name</label>
            <br />
            <input
              onChange={(e) => setFullName(text(e))}
              maxLength={50}
              value={fullName}
              className="profile-form mt-one"
              type="text"
              placeholder="Jane Doe"
            />
          </section>

          <section>
            <label className="body-text bold-medium">Date of Birth</label>
            <br />
            <input
              onChange={(e) => {
                setDob(text(e));
              }}
              value={dob}
              maxLength={50}
              className="profile-form"
              type="text"
              placeholder="2000-12-24"
            />
          </section>
          <section>
            <label className="body-text bold-medium">Zip Code</label>
            <br />
            <input
              onChange={(e) => setZip(text(e))}
              maxLength={50}
              value={zip}
              className="profile-form mt-one"
              type="text"
              placeholder="13407"
            />
          </section>
          <section>
            <label className="body-text  bold-medium">Please tell us about yourself</label>
            <br />
            <textarea
              onChange={(e) => setDescription(text(e))}
              className={styles['description-input'] + ' profile-form mt-one'}
              placeholder="Please tell us about yourself"
              cols={60}
              value={description}
              rows={5}
              maxLength={200}
            />
          </section>
          <footer className={styles['account__document-grid'] + ' flex-space-between'}>
            <h2 className="mt-one-half body-text">Passport</h2>
            <h2 className="mt-one-half body-text">License</h2>
            <h2 className="mt-one-half body-text">Solvency</h2>
            <ProfileButton
              imageSetter={(image: UploaderImage) => setPassport(image)}
              alreadyUploaded={checkExists(passport)}
              image={passport}
            />
            <ProfileButton
              imageSetter={(image: UploaderImage) => setLicense(image)}
              alreadyUploaded={checkExists(license)}
              image={license}
            />
            <ProfileButton
              imageSetter={(image: UploaderImage) => setSolvency(image)}
              alreadyUploaded={checkExists(solvency)}
              image={solvency}
            />
          </footer>
        </form>
        <button onClick={() => submit()} className={'primary-btn save-btn'}>
          Save
        </button>
      </main>
    </div>
  );
};

export default Profile;
