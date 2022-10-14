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
            <div className={styles['menu__link']}>
              <Link href="/account/profile">
                <a className="body-text">
                  <span className={styles["underline-link"] +  ' green-text'}>Profile</span>
                </a>
              </Link>
            </div>
            <div className={styles['menu__link']}>
              <Link href="/account/bookings">
                <a className="body-text bold">
                  <span className={styles["underline-link"]}>My Bookings</span>
                </a>
              </Link>
            </div>
            <div className={styles['menu__link']}>
              <Link href="/account/payments">
                <a className="body-text bold">
                  <span className={styles["underline-link"]}>My Payments</span>
                </a>
              </Link>
            </div>
            <button className={'primary-btn body-text bold'}>Contact support</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
