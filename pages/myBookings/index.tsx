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
        status: 'ACCEPTED'
    },
    {
        id: '3857976752',
        area: 'Lichtenberg',
        name:'Industrial Grade Kitchen',
        endDate: 'March 5',
        availableDays: ['Monday','Thursday'],
        duration: '1 Month',
        startDate: 'Feb 5',
        status: 'REJECTED'
    },
    {
        id: '103832352',
        area: 'Neukölln',
        name:'Industrial Grade Kitchen',
        endDate: 'Apr 5',
        availableDays: ['Tuesday','Friday'],
        duration: '4 Months',
        startDate: 'Jan 5',
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
        status: 'PENDING'
    },
    {
        id: '1273959',
        area: 'Kreuzberg',
        name:'Industrial Grade Kitchen',
        endDate: 'March 5',
        availableDays: ['Monday','Sunday'],
        duration: '3 Months',
        startDate: 'Jan 5',
        status: 'PENDING'
    },
    {
        id: '34527483',
        area: 'Friedrichshain',
        name:'Industrial Grade Kitchen',
        endDate: 'March 5',
        availableDays: ['Monday','Sunday'],
        duration: '3 Months',
        startDate: 'Jan 5',
        status: 'CANCELED'
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
            <div className="main">
                <div className="menubar">
                    <a href="/" className="">Profile</a>
                    <a href="/" className="">My bookings</a>
                    <a href="/" className="">My payments</a>
                    <a href="/" className="">CONTACT SUPPORT</a>
                </div>
                <div className="my bookings">
                    <h1>My bookings</h1>
                    <h2>A list of all bookings made, requested, rejected, cancelled and confirmed</h2>
                    <div className="">
                        
                    </div>
                    <div className="requested">
                        <h3>Requested</h3>


                        <hr />
                    </div>
                    <div className="confirmed">
                        <h3>Confirmed</h3>


                        <hr />
                    </div>
                    <div className="cancelled">
                        <h3>Cancelled</h3>


                        <hr />
                    </div>
                    <div className="rejected">
                        <h3>Rejected</h3>


                        <hr />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default myBookings;