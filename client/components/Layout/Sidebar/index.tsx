import Link from 'next/link';
import React from 'react';
import { AuthenticatedProps } from '../../../pages/account/payments';
import styles from './Sidebar.module.scss';

type SidebarProps = {
  user?: AuthenticatedProps['session'];
  children?: React.ReactElement;
};
const Sidebar = (props: SidebarProps) => {
  return (
    <div className={styles['sidebar']}>
      <div className={styles['menu']}>
        {props.children ? (
          props.children
        ) : (
          <>
            <div className={'mt-three'}>
              <Link href="/account/profile">
                <a className="body-text">
                  <span className={'underline-link  green-text'}>Profile</span>
                </a>
              </Link>
            </div>
            <div className={'mt-three'}>
              <Link href="/account/bookings">
                <a className="body-text bold">
                  <span className={'underline-link'}>My Bookings</span>
                </a>
              </Link>
            </div>
            <div className={'mt-three'}>
              <Link href="/account/payments">
                <a className="body-text bold">
                  <span className={'underline-link'}>My Payments</span>
                </a>
              </Link>
            </div>
            <button className={'primary-btn mt-two body-text bold'}>Contact support</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
