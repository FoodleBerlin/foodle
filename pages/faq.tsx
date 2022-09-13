import type { NextPage } from 'next';
import Image from 'next/image';
import React, { useState } from 'react';
import Navbar from '../components/Layout/Navbar';
import Head from 'next/head';
import Accordion from './faq_accordian';

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
            <div style={{padding: "50px"}}className="flex center-vertically mt-ten font-family flex-direction-column mb-three">
                <div className="font-size-six align-self-left mb-one onehalf-from-left position-relative">
                    <h1 className='align-self-left'>F.A.Q</h1>
                </div>
                <div style={{width: '100%', alignItems: 'flex-start', paddingTop: '50px'}} className="flex flex-row bg-color-light-mint padding-tb padding-lr border-radius gap-ten">
                    <div className="">
                        <Image alt={'FAQ Image'} src={'/eggsFAQ.svg'} width={650} height={450} />
                    </div>
                    <div className="ml-two">
                        <div className="mt-one mb-three font-size-twohalf">
                            <h2>Discover the most common questions</h2>
                        </div>
           
                        <hr className="color-light-purple mb-two"/>
                
                        
                        <div className="">
                            <div className="">
                                {faqData.map(({title, content}) => (
                                    <Accordion title={title} content={content} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );

};

export default Faq;