// import Link from 'next/link';
// import React from 'react';
// import styles from './Navbar.module.scss';

// interface TabProps {
//   href: string;
//   title: string;
//   icon?: string;
// }
// const Tab = (props: TabProps) => (
//   <Link href={props.href || '/'}>
//     <a className={styles['navbar__menu--link'] + ' flex-center'}>
//       <span className={'underline-link small-text'}>{props.title}</span>
//     </a>
//   </Link>
// );
// export default Tab;
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface TabProps {
  href: string;
  title: string;
  iconSrc?: string;
  burger?: boolean;
  onClick?: () => void;
}
const Tab = (props: TabProps) => {
  const { locale } = useRouter();
  const title = props.iconSrc ? locale?.toString().toUpperCase() : props.title;
  const isBurger = props.burger;

  return (
    <Link href={props.href} locale={props.iconSrc ? (locale === 'en' ? 'de' : 'en') : locale}>
      <a className={isBurger ? '' : 'hover-title flex-center '}>
        {props.iconSrc ? (
          <Image src={props.iconSrc} alt={'world-icon' + isBurger ? '-white' : ''} height={18} width={18} />
        ) : (
          <></>
        )}
        <h2 className={'small-text'}>{title}</h2>
      </a>
    </Link>
  );
};
export default Tab;
