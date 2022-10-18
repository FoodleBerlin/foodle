import Link from 'next/link';
import React, { useState } from 'react';
import { AuthenticatedProps } from '../../pages/account/payments';
import styles from './Sidebar.module.scss';

type SidebarProps = {
  user?: AuthenticatedProps['session'];
  children?: React.ReactElement;
  sitePosition: number
};
const Sidebar = (props: SidebarProps) => {
  const [position, setPosition] = useState<number>(props.sitePosition);
  console.log(props.children)
  return (
    <div className={styles['sidebar']}>
      <div className={styles['menu']}>
        {props.children ? (
          props.children
        ) : (
          <>
            <div className={'mt-three'}>
              <Link href="/account">
                <a className="body-text bold" onClick={() => setPosition(0)}>
                  <span className={'underline-link' + ' ' + (position === 0 ? 'green-text' : '')}>Profile</span>
                </a>
              </Link>
            </div>
            <div className={'mt-three'}>
              <Link href="/account/myBookings" >
                <a className="body-text bold" onClick={() => setPosition(1)}>
                  <span className={'underline-link' + ' ' + (position === 1 ? 'green-text' : '')}>My Bookings</span>
                </a>
              </Link>
            </div>
            <div className={'mt-three'}>
              <Link href="/account/payments" >
                <a className="body-text bold" onClick={() => setPosition(2)}>
                  <span className={'underline-link' + ' ' + (position === 2 ? 'green-text' : '')}>My Payments</span>
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
