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
        img: '/kitchen-image-1.png'
    },
    {
        id: '3857976752',
        area: 'Lichtenberg',
        name:'Industrial Grade Kitchen',
        endDate: 'March 5',
        availableDays: ['Monday','Thursday'],
        duration: '1 Month',
        startDate: 'Feb 5',
      
        img: '/kitchen-image-2.png'
    },
    {
        id: '103832352',
        area: 'Neukölln',
        name:'Industrial Grade Kitchen',
        endDate: 'Apr 5',
        availableDays: ['Tuesday','Friday'],
        duration: '4 Months',
        startDate: 'Jan 5',
    
        img: '/kitchen-image-3.png'
    },
    {
        id: '7493492948',
        area: 'Wedding',
        name:'Industrial Grade Kitchen',
        endDate: 'March 5',
        availableDays: ['Saturday','Sunday'],
        duration: '3 Months',
        startDate: 'Jan 5',
     
        img: '/kitchen-image-4.png'
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
                        
                        <div>
                            <Image alt={'Kitchen Image'} src={bookingData[0].img} width={350} height={250} />
                            <div>
                                <h4>{bookingData[0].name} in {bookingData[0].area}</h4>
                                <h5>{bookingData[0].availableDays} <br /> {bookingData[0].startDate}-{bookingData[0].endDate}({bookingData[0].duration})</h5>
                                <h6>Booking ref: <br />{bookingData[0].id}</h6>
                            </div>
                            <button className="delete">DELETE</button>
                        </div>

                        <hr />
                    </div>

                    <div className={styles['bookingList_confirmed']}>
                        <h3>Confirmed</h3>

                        <p>No confirmed bookings yet.</p>

                        <hr />
                    </div>

                    <div className={styles['bookingList_canceled']}>
                        <h3>Canceled</h3>

                        <div>
                            <Image alt={'Kitchen Image'} src={bookingData[1].img} width={350} height={250} />
                            <div>
                                <h4>{bookingData[1].name} in {bookingData[1].area}</h4>
                                <h5>{bookingData[1].availableDays} <br /> {bookingData[1].startDate}-{bookingData[1].endDate}({bookingData[1].duration})</h5>
                                <h6>Booking ref: <br />{bookingData[1].id}</h6>
                            </div>
                            <button className="delete">DELETE</button>
                        </div>

                        <hr />
                    </div>

                    <div className={styles['bookingList_rejected']}>
                        <h3>Rejected</h3>

                        <div>
                            <Image alt={'Kitchen Image'} src={bookingData[2].img} width={350} height={250} />
                            <div>
                                <h4>{bookingData[2].name} in {bookingData[2].area}</h4>
                                <h5>{bookingData[2].availableDays} <br /> {bookingData[2].startDate}-{bookingData[2].endDate}({bookingData[2].duration})</h5>
                                <h6>Booking ref: <br />{bookingData[2].id}</h6>
                            </div>
                            <button className="delete">DELETE</button>
                        </div>

                        <div>
                            <Image alt={'Kitchen Image'} src={bookingData[3].img} width={350} height={250} />
                            <div>
                                <h4>{bookingData[3].name} in {bookingData[3].area}</h4>
                                <h5>{bookingData[3].availableDays} <br /> {bookingData[3].startDate}-{bookingData[3].endDate}({bookingData[3].duration})</h5>
                                <h6>Booking ref: <br />{bookingData[3].id}</h6>
                            </div>
                            <button className="delete">DELETE</button>
                        </div>

                        <hr />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default myBookings;