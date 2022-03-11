import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import styles from './Navbar.module.scss';
import Tab from './Tab';
import Modal from './Modal';
import { AuthenticatedProps } from '~/pages/account';

type NavbarProps = {
  user?: AuthenticatedProps['session'];
};
const Navbar = (props: NavbarProps) => {
  // state to open/close the Modal
  const [openModal, setOpenModal] = useState<boolean>(false);
  console.log(props.user);
  return (
    <nav className={styles['navbar'] + ' flex-center'}>
      <div className={styles['navbar__logo']}>
        <Link href="/">
          <a>
            <Image src="/foodle_logo.svg" width={50} height={35} alt="Foodle Logo" />
          </a>
        </Link>
      </div>
      <div className={styles['navbar__menu']}>
        <Tab href="/" title="EN/DE" />
        <Tab href="/" title="How It Works" />
        <Tab href="/create" title="List Your Kitchen" />
        <Tab href="/" title="Contact" />
      </div>
      {!props.user && (
        <div className={styles['navbar__auth-btns']}>
          <button className="secondary-btn" onClick={() => setOpenModal(true)}>
            Login
          </button>
          <button className=" secondary-btn" onClick={() => setOpenModal(true)}>
            Signup
          </button>
          <Modal onClose={() => setOpenModal(false)} show={openModal} />
        </div>
      )}
      {props.user && (
        <Link href="/account">
          <div className={styles['avatar']}></div>
        </Link>
      )}
    </nav>
  );
};
export default Navbar;
