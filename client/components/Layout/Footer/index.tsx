import Image from 'next/image';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import Socials from '../Socials';
import styles from './Footer.module.scss';

const Footer = () => {
  const intl = useIntl();
  const about = intl.formatMessage({ id: 'component.footer.about' });
  const feature = intl.formatMessage({ id: 'component.footer.feature' });
  const pricing = intl.formatMessage({ id: 'component.footer.pricing' });
  const careers = intl.formatMessage({ id: 'component.footer.careers' });
  const help = intl.formatMessage({ id: 'component.footer.help' });
  const privacy = intl.formatMessage({ id: 'component.footer.privacy' });
  return (
    <div className={styles['footer']}>
      <div className={styles['footer__main'] + ' flex-center__column'}>
        <div className="flex-center">
          <Image src={'/foodle_logo.svg'} alt="foodle logo" width={40} height={29} />
          <h3 className={styles['footer__logo'] + ' logo-text'}>Foodle</h3>
        </div>
        <div className={styles['footer__elements'] + ' flex-center mt-one'}>
          <Link href={'/not-done-yet'}>
            <a className="body-text--hover">{about}</a>
          </Link>
          <Link href={'/not-done-yet'}>
            <a className="body-text--hover">{feature}</a>
          </Link>
          <Link href={'/not-done-yet'}>
            <a className="body-text--hover">{pricing}</a>
          </Link>
          <Link href={'/not-done-yet'}>
            <a className="body-text--hover">{careers}</a>
          </Link>
          <Link href={'/not-done-yet'}>
            <a className="body-text--hover">{help}</a>
          </Link>
          <Link href={'/not-done-yet'}>
            <a className="body-text--hover">{privacy}</a>
          </Link>
        </div>
      </div>
      <div className={styles['footer__end']}>
        <a>© 2022 Foodle inc. All rights reserved</a>
        <Socials />
      </div>
    </div>
  );
};
export default Footer;
