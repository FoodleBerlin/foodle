import type { NextPage } from 'next';
import Image from 'next/image';
import React, { useState } from 'react';
import Navbar from '../../components/Layout/Navbar';
import Head from 'next/head';
import styles from './myBookings.module.scss';

const myBookings: NextPage=()=>{

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
                    <div className="requested">



                        <hr />
                    </div>
                    <div className="confirmed">



                        <hr />
                    </div>
                    <div className="cancelled">



                        <hr />
                    </div>
                    <div className="rejected">



                        <hr />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default myBookings;