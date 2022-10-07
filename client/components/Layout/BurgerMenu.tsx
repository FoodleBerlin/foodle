import Image from 'next/image';
import { slide as Menu } from 'react-burger-menu';
import { useIntl } from 'react-intl';
import styles from './Footer.module.scss';
import Tab from './Tab';

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
        <div className="bm-top__left mt-two">
          <Tab href="/not-done-yet" title={findKitchen} burger />
          <Tab href="/not-done-yet" title={listKitchen} burger />
          <Tab href="/not-done-yet" title="F.A.Q." burger />
          <Tab href="/not-done-yet" title={contact} burger />
        </div>
      </header>
      <footer>
        <div className="flex-center">
          <Image src={'/foodle_logo.svg'} alt="foodle logo" width={40} height={29} />
          <h3 className={styles['footer__logo'] + ' logo-text'}>Foodle</h3>
        </div>
        <section className={styles['footer__end--socials'] + ' flex-center'}>
          <Image
            className={styles['footer__end--socials__image']}
            src={'/instagram.svg'}
            alt="instagram logo"
            width={30}
            height={30}
          />
          <Image
            className={styles['footer__end--socials__image']}
            src={'/twitter.svg'}
            alt="twitter logo"
            width={30}
            height={30}
          />
          <Image
            className={styles['footer__end--socials__image']}
            src={'/youtube.svg'}
            alt="youtube logo"
            width={30}
            height={30}
          />
        </section>
      </footer>
    </Menu>
  );
};

export default BurgerMenu;