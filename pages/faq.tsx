import type { NextPage } from 'next';
import Image from 'next/image';
import React, { useState } from 'react';
import Navbar from '../components/Layout/Navbar';
import Head from 'next/head';
import Accordion from './faq_accordian';

const Faq: NextPage =() => {

    const faqData: { title: string, content: string }[] = [
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
            <div className="flex center-vertically mt-ten font-family flex-direction-column mb-three">
                <div className="flex font-size-six align-left mb-one">
                    <h1>F.A.Q</h1>
                </div>
                <div className="flex flex-row bg-color-light-mint padding-tb padding-lr border-radius">
                    <div className="">
                        <Image alt={'FAQ Image'} src={'/eggsFAQ.svg'} width={450} height={350} />
                    </div>
                    <div className="ml-two width-seventy">
                        <div className="mt-three mb-three font-size-three">
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