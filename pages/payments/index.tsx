import type { NextPage } from 'next';
import Head from 'next/head';
import Navbar from '../../components/Layout/Navbar';
import Sidebar from '../../components/Layout/Sidebar';
import styles from './Payments.module.scss';

const payments: NextPage= ()=>{



return(

    <div>
        <Head>
            <title>Foodle:My payments</title>
            <meta
            name=" my payments page"
            content=" Payments pending, paid, refunded."
            />
            <link rel="icon" href="/foodle_logo.svg" />
        </Head>
        <Navbar />
        <Sidebar />

    </div>

);

};

export default payments;