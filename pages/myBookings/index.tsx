import type { NextPage } from 'next';
import Image from 'next/image';
import React, { useState } from 'react';
import Navbar from '../../components/Layout/Navbar';
import Head from 'next/head';
import styles from './myBookings.module.scss';
//import type {Booking} from '../../codegen/index'

const myBookings: NextPage=()=>{

    type Booking ={
        id: string;
        area: string;
        name:string;
        endDate: string;
        availableDays: Array<string>;
        duration: string;
        startDate: string;
        status: string;
        img: string;
    };

    const bookingData: Booking[]=[
       {
        id: '38579234252',
        area: 'Mitte',
        name:'Industrial Grade Kitchen',
        endDate: 'May 5',
        availableDays: ['Monday','Tuesday'],
        duration: '3 Months',
        startDate: 'Feb 5',
        status: 'ACCEPTED',
        img: '../../public/unsplash_MtqG1lWcUw0.svg'
    },
    {
        id: '3857976752',
        area: 'Lichtenberg',
        name:'Industrial Grade Kitchen',
        endDate: 'March 5',
        availableDays: ['Monday','Thursday'],
        duration: '1 Month',
        startDate: 'Feb 5',
        status: 'REJECTED',
        img: '../../public/unsplash_MtqG1lWcUw0.svg'
    },
    {
        id: '103832352',
        area: 'Neukölln',
        name:'Industrial Grade Kitchen',
        endDate: 'Apr 5',
        availableDays: ['Tuesday','Friday'],
        duration: '4 Months',
        startDate: 'Jan 5',
        status: 'REJECTED',
        img: '../../public/unsplash_MtqG1lWcUw0.svg'
    },
    {
        id: '7493492948',
        area: 'Wedding',
        name:'Industrial Grade Kitchen',
        endDate: 'March 5',
        availableDays: ['Saturday','Sunday'],
        duration: '3 Months',
        startDate: 'Jan 5',
        status: 'PENDING',
        img: '../../public/unsplash_MtqG1lWcUw0.svg'
    },
    {
        id: '1273959',
        area: 'Kreuzberg',
        name:'Industrial Grade Kitchen',
        endDate: 'March 5',
        availableDays: ['Monday','Sunday'],
        duration: '3 Months',
        startDate: 'Jan 5',
        status: 'PENDING',
        img: '../../public/unsplash_MtqG1lWcUw0.svg'
    },
    {
        id: '34527483',
        area: 'Friedrichshain',
        name:'Industrial Grade Kitchen',
        endDate: 'March 5',
        availableDays: ['Monday','Sunday'],
        duration: '3 Months',
        startDate: 'Jan 5',
        status: 'CANCELED',
        img: '../../public/unsplash_MtqG1lWcUw0.svg'
    }
    ];


    return (
        <div>
            <Head>
                <title>Foodle:My bookings</title>
                <meta
                name="my bookings page"
                content="A list of all bookings made, requested, rejected, cancelled and confirmed"
                />
                <link rel="icon" href="/foodle_logo.svg" />
            </Head>
            <Navbar />

            <div className={styles['myBookings']}>
                <div className={styles['menubar']}>
                    <a href="/" className={styles['menubar__profile']}>Profile</a>
                    <a href="/" className={styles['menubar__bp']}>My bookings</a>
                    <a href="/" className={styles['menubar__bp']}>My payments</a>
                    <a href="/" className={styles['menubar__support']}>CONTACT SUPPORT</a>
                </div>

                <div className={styles['bookingList']}>
                    <h1>My bookings</h1>
                    <h2>A list of all bookings made, requested, rejected, cancelled and confirmed</h2>
                   

                    <div className={styles['bookingList_requested']}>
                        <h3>Requested</h3>
                        
                        {/* for(var i in bookingData){

                            if(bookingData[i].status=='PENDING'){
                                <div>
                                    <img src={bookingData[i].img} alt="kitchen picture" />
                                    <div>
                                        <h4>{bookingData[i].name} in {bookingData[i].area}</h4>
                                        <h5>{bookingData[i].availableDays} <br /> {bookingData[i].startDate}-{bookingData[i].endDate}({bookingData[i].duration})</h5>
                                        <h6>Booking ref: <br />{bookingData[i].id}</h6>
                                    </div>
                                    <button className="delete">DELETE</button>
                                </div>
                                
                            };
                         
                        }; */}

                        <hr />
                    </div>

                    <div className={styles['bookingList_confirmed']}>
                        <h3>Confirmed</h3>


                        <hr />
                    </div>

                    <div className={styles['bookingList_canceled']}>
                        <h3>Canceled</h3>


                        <hr />
                    </div>

                    <div className={styles['bookingList_rejected']}>
                        <h3>Rejected</h3>


                        <hr />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default myBookings;