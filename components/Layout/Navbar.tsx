import Image from 'next/image';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import { AuthenticatedProps } from '../../pages/account/payments';
import styles from './Navbar.module.scss';
import Tab from './Tab';

type NavbarProps = {
  user?: AuthenticatedProps['session'];
};
const Navbar = (props: NavbarProps) => {
  const intl = useIntl();
  const findKitchen = intl.formatMessage({ id: 'component.navbar.find' });
  const listKitchen = intl.formatMessage({ id: 'component.navbar.list' });
  const contact = intl.formatMessage({ id: 'component.navbar.contact' });
  return (
    <nav className={styles['navbar']}>
      <div className={styles['navbar__logo']}>
        {/* <div className="flex-center"> */}
        <Link href="/" passHref>
          <div className="flex-center">
            <a>
              <Image src="/foodle_logo.svg" width={45} height={27} alt="Foodle Logo" />
            </a>
            <h1 className="logo-text green-text">Foodle</h1>
          </div>
        </Link>
        {/* </div> */}
      </div>
      <div className={styles['navbar__menu']}>
        <Tab href="/" iconSrc="/world-icon.svg" title="EN" burger={false} />
        <Tab href="/" title="F.A.Q." />
        <Tab href="/" title={findKitchen} />
        <Tab href="/create" title={listKitchen} />
        <Tab href="/" title={contact} />
      </div>
    </nav>
  );
};
export default Navbar;
