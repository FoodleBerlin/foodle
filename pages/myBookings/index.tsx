import type { NextPage } from 'next';
import Image from 'next/image';
import React, { useState } from 'react';
import Navbar from '../../components/Layout/Navbar';
import Sidebar from '../../components/Layout/Sidebar'
import Head from 'next/head';
import styles from './myBookings.module.scss';
import BookingCard from '../../components/BookingCard/index';



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
        status: string;
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
        img: '/kitchen-image-1.png',
        status: 'REQUESTED'
    },
    {
        id: '3857976752',
        area: 'Lichtenberg',
        name:'Industrial Grade Kitchen',
        endDate: 'March 5',
        availableDays: ['Monday','Thursday'],
        duration: '1 Month',
        startDate: 'Feb 5',
        img: '/kitchen-image-2.png',
        status: 'CANCELED'
    },
    {
        id: '103832352',
        area: 'Neukölln',
        name:'Industrial Grade Kitchen',
        endDate: 'Apr 5',
        availableDays: ['Tuesday','Friday'],
        duration: '4 Months',
        startDate: 'Jan 5',
        img: '/kitchen-image-3.png',
        status: 'REJECTED'
    },
    {
        id: '7493492948',
        area: 'Wedding',
        name:'Industrial Grade Kitchen',
        endDate: 'March 5',
        availableDays: ['Saturday','Sunday'],
        duration: '3 Months',
        startDate: 'Jan 5',
        img: '/kitchen-image-4.png',
        status: 'REJECTED'
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
               
                <Sidebar/>

                <div className={styles['bookingList']}>
                    <h4>My bookings</h4>
                    <h5>A list of all bookings made, requested, rejected, cancelled and confirmed</h5>
                   
                    <div className={styles['bookingCard']}>
                        
                        <BookingCard bookingData={bookingData}/>
              
                    </div>
                </div>
            </div>
        </div>
    );
};

export default myBookings;