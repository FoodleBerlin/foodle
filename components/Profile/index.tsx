import React from 'react';
import styles from './Profile.module.scss';
interface ProfileProps {
  prop: any;
}

const Profile = (props: ProfileProps) => {
  return <div className={styles['profile']}></div>;
};

export default Profile;
