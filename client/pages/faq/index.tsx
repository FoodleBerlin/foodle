import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import FaqAccordion from '../../components/FaqAccordion/index';
import Navbar from '../../components/layout/Navbar/Navbar';
import styles from './Faq.module.scss';

const Faq: NextPage = () => {
  const faqData: { title: string; content: string }[] = [
    {
      title: 'hic temporibus velit dicta earu?',
      content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla. Orci, dictumst nec aliquet id ullamcorper venenatis.`,
    },
    {
      title: 'hic temporibus velit dicta earum suscipit commodi eu?',
      content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit.euismod nulla. Orci, dictumst nec aliquet id ullamcorper venenatis.`,
    },
    {
      title: 'hic temporibus velit dicta earum suscipit commodi eum enim atque at?',
      content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit.`,
    },
    {
      title: 'hic temporibus velit dicta earum susc?',
      content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit.euismod nulla. Orci, dictumst nec aliquet id ullamcorper venenatis.`,
    },
    {
      title: 'hic temporibus velit dicta earum suscipit commodi eum?',
      content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit.`,
    },
    {
      title: 'hic temporibus velit dicta earum suscipit commodi eum enim atque at?',
      content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit.euismod nulla. Orci, dictumst nec aliquet id ullamcorper venenatis.`,
    },
  ];

  return (
    <div>
      <Head>
        <title>Foodle:FAQ</title>
        <meta name="description" content="Frequently asked questions" />
        <link rel="icon" href="/foodle_logo.svg" />
      </Head>
      <Navbar />
      <div className={styles['faq']}>
        <div className={styles['faq__title']}>
          <h1>F.A.Q</h1>
        </div>
        <div className={styles['faqWrapper']}>
          <div className={styles['faqWrapper__imgWrapper']}>
            <Image alt={'FAQ Image'} src={'/eggsFAQ.svg'} width={650} height={450} />
          </div>
          <div className={styles['faqWrapper__questions']}>
            <h2>Discover the most common questions</h2>
            <hr />

            <div className="">
              {faqData.map(({ title, content }) => (
                <FaqAccordion title={title} content={content} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
