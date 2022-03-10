import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import styles from './Sidebar.module.scss';
import Tab from './Tab';
import Modal from './Modal';
import { AccountProps } from '~/pages/account';

type SidebarProps = {
  user: AccountProps['session'];
};
const Sidebar = (props: SidebarProps) => {
  console.log(props.user);
  return (
    <div className={styles['sidebar']}>
      <div className={styles['menu']}>
        <Tab href="/" title="Profile" />
        <Tab href="/" title="My bookings" />
        <Tab href="/" title="My payments" />
        <button className={'primary-btn'}>Contact support</button>
      </div>
    </div>
  );
};
export default Sidebar;
