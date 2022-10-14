import Image from 'next/image';
import { slide as Menu } from 'react-burger-menu';
import { useIntl } from 'react-intl';
import Socials from '../Socials';
import Tab from '../Tab';
import styles from './BurgerMenu.module.scss';

const BurgerMenu = () => {
  const intl = useIntl();
  const findKitchen = intl.formatMessage({ id: 'component.navbar.find' });
  const listKitchen = intl.formatMessage({ id: 'component.navbar.list' });
  const contact = intl.formatMessage({ id: 'component.navbar.contact' });

  return (
    <Menu right customBurgerIcon={<Image src={'/burger-menu.png'} width={23} height={23} />} width={300}>
      <header className="bm-top">
        <div className="bm-top__right">
          <Tab href="/" iconSrc="/world-icon.svg" title="EN" />
        </div>
        <div className="bm-top__left">
          <Tab href="/not-done-yet" title={findKitchen} burger />
          <Tab href="/not-done-yet" title={listKitchen} burger />
          <Tab href="/not-done-yet" title="F.A.Q." burger />
          <Tab href="/not-done-yet" title={contact} burger />
        </div>
      </header>
      <footer>
        <div className={styles["bm__footer"]}>
          <Image src={'/foodle_logo.svg'} alt="foodle logo" width={40} height={29} />
          <h3 className={styles['bm__logo'] + ' logo-text'}>Foodle</h3>
        </div>
        <Socials />
      </footer>
    </Menu>
  );
};

export default BurgerMenu;
