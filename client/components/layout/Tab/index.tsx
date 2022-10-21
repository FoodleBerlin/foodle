import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from "./Tab.module.scss"

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
      <a className={isBurger ? '' : styles["tab"]}>
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
