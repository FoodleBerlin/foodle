import Image from 'next/image';
import Link from 'next/link';
import styles from './Socials.module.scss';

const Socials = () => {
  return (
    <div className={styles['socials'] + ' flex-center'}>
      <Link href={'https://www.instagram.com/foodle.berlin/?hl=en'}>
        <a>
          <Image
            className={styles['socials__image']}
            src={'/instagram.svg'}
            alt="instagram logo"
            width={30}
            height={30}
          />
        </a>
      </Link>
      <Link href={'https://twitter.com/foodle_en'}>
        <a>
          <Image className={styles['socials__image']} src={'/twitter.svg'} alt="twitter logo" width={30} height={30} />
        </a>
      </Link>
      <Link href={'https://www.youtube.com/channel/UCOiQ1goR6EBfwd68Ul0vbig'}>
        <a>
          <Image className={styles['socials__image']} src={'/youtube.svg'} alt="youtube logo" width={30} height={30} />
        </a>
      </Link>
    </div>
  );
};
export default Socials;
