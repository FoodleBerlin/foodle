import type { NextPage } from 'next';
import Image from 'next/image';
import React, { useState } from 'react';
import Navbar from '../../components/Layout/Navbar';
import Head from 'next/head';
import Accordion from '../../components/FaqAccordion/index';
import styles from './Faq.module.scss';

const Faq: NextPage =() => {

    const faqData: { title: string, content: string }[] = [
        {
        title: 'hic temporibus velit dicta earu?',
        content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla. Orci, dictumst nec aliquet id ullamcorper venenatis.`
      },
      {
        title: 'hic temporibus velit dicta earum suscipit commodi eu?',
        content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit.euismod nulla. Orci, dictumst nec aliquet id ullamcorper venenatis.`
      },
      {
        title: 'hic temporibus velit dicta earum suscipit commodi eum enim atque at?',
        content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit.`
      },
      {
        title: 'hic temporibus velit dicta earum susc?',
        content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit.euismod nulla. Orci, dictumst nec aliquet id ullamcorper venenatis.`
      },
      {
        title: 'hic temporibus velit dicta earum suscipit commodi eum?',
        content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit.`
      },
      {
        title: 'hic temporibus velit dicta earum suscipit commodi eum enim atque at?',
        content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit.euismod nulla. Orci, dictumst nec aliquet id ullamcorper venenatis.`
      }
    ];

    return(
        <div>
            <Head>
                <title>Foodle:FAQ</title>
                <meta
                name="description"
                content="Frequently asked questions"
                />
                <link rel="icon" href="/foodle_logo.svg" />
            </Head>
            <Navbar />
            <div className={styles['main']}>
                <div className={styles['main__title']}>
                    <h1>F.A.Q</h1>
                </div>
                <div className={styles['main__box']}>
                    <div className={styles['main__box__img']}>
                        <Image alt={'FAQ Image'} src={'/eggsFAQ.svg'} width={650} height={450} />
                    </div>
                    <div className={styles['main__box__questions']}>
                        
                        <h2>Discover the most common questions</h2>
                        <hr/>

                        <div className="">
                            {faqData.map(({title, content}) => (
                                <Accordion title={title} content={content} />
                            ))}
                        </div>
                        
                    </div>
                </div>
            </div>


        </div>
    );

};

export default Faq;