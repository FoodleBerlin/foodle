import Link from 'next/link';
import Image from 'next/image';
import React, { ReactChildren, useState } from 'react';
import styles from './Sidebar.module.scss';
import Tab from './Tab';
import { AuthenticatedProps } from '~/pages/account';

type SidebarProps = {
  user?: AuthenticatedProps['session'];
  children?: React.ReactElement;
};
const Sidebar = (props: SidebarProps) => {
  console.log(props.user);
  const content = props.children ? (
    props.children
  ) : (
    <>
      <Tab href="/" title="My bookings" />
      <Tab href="/" title="My payments" />
      <button className={'primary-btn'}>Contact support</button>
    </>
  );
  return (
    <div className={styles['sidebar']}>
      <div className={styles['menu']}>{content}</div>
    </div>
  );
};
export default Sidebar;
