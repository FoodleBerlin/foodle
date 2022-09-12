import type { NextPage } from 'next';
import Image from 'next/image';
import React, { useState } from 'react';
import Navbar from '../components/Layout/Navbar';
import Head from 'next/head';
import styles from '../styles/pages/faq.scss';

const Faq: NextPage =() => {

    const faqData = [
        {
        title: 'hic temporibus velit dicta earum suscipit commodi eum enim atque at?',
        content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit.`
      },
      {
        title: 'hic temporibus velit dicta earum suscipit commodi eum enim atque at?',
        content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit.`
      },
      {
        title: 'hic temporibus velit dicta earum suscipit commodi eum enim atque at?',
        content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit.`
      },
      {
        title: 'hic temporibus velit dicta earum suscipit commodi eum enim atque at?',
        content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit.`
      },
      {
        title: 'hic temporibus velit dicta earum suscipit commodi eum enim atque at?',
        content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit.`
      },
      {
        title: 'hic temporibus velit dicta earum suscipit commodi eum enim atque at?',
        content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit.`
      }
    ]

    const Accordian =({title, content}) =>{
        const [isActive, setIsActive] = React.useState<boolean>(false);
    }

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
            <div className="">
                <h1>F.A.Q</h1>
            </div>
            <div className="">
                <div className="">
                    <Image alt={'FAQ Image'} src={'/eggsFAQ.svg'} width={450} height={350} />
                </div>
                <div className="">
                    <div className="">
                        <h2>Discover the most common questions</h2>
                    </div>
                    <div className="">
                        <div className="accordion-item">
                            <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
                                <div>{title}</div>
                                <div>{isActive ? <Image alt={'xmark'} src={'/xmark.svg'} width={50} height={50} /> : <Image alt={'plus'} src={'/plus.svg'} width={50} height={50} />}</div>
                                
                            </div>
                            {isActive && <div className="accordion-content">{content}</div>}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )

}

export default Faq;