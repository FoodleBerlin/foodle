import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import styles from './Sidebar.module.scss';
import Tab from './Tab';
import Modal from './Modal';
import { AccountProps } from '~/pages/account';

const Sidebar = () => {
  return (
    <div className={styles['sidebar']}>
      <div className={styles['menu']}>
        <div className={'mt-three'}>
          <Link href="/account/profile">
            <a className="body-text">
              <span className={'underline-link  green-text'}>Profile</span>
            </a>
          </Link>
        </div>
        <div className={'mt-three'}>
          <Link href="/account/bookings">
            <a className="body-text bold-medium">
              <span className={'underline-link'}>My Bookings</span>
            </a>
          </Link>
        </div>
        <div className={'mt-three'}>
          <Link href="/account/payments">
            <a className="body-text bold-medium">
              <span className={'underline-link'}>My Payments</span>
            </a>
          </Link>
        </div>
        <button className={'primary-btn mt-two body-text'}>Contact support</button>
      </div>
    </div>
  );
};
export default Sidebar;
