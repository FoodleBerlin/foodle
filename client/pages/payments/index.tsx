import type { NextPage } from 'next';
import Head from 'next/head';
import Navbar from '../../components/Layout/Navbar';
import Sidebar from '../../components/Layout/Sidebar';
import styles from './Payments.module.scss';
import PastPayment from '../../components/PastPayment/index';
import PaymentMethod from '../../components/PaymentMethod/index';

export type Payment ={
    date: string;
    amount: number;
    type: string;
    status: string;
    id: number;
}

export type Method ={
    type: string;
    date: string;
    number: number;
    default: boolean;
}

const Payments: NextPage= ()=>{

    const paymentData: Payment[] =[
        {
            date: '01.22.2022',
            amount: 900,
            type: 'Reservation',
            status: 'Paid',
            id: 385792352
        },
        {
            date: '01.22.2022',
            amount: 900,
            type: 'Reservation',
            status: 'Paid',
            id: 385792352
        },
        {
            date: '01.22.2022',
            amount: 900,
            type: 'Reservation',
            status: 'Paid',
            id: 385792352
        }
    ];

    const methodData: Method[]=[
        {
            type: 'MasterCard',
            date: '21/01/2022',
            number: 23456789,
            default: true
        },
        {
            type: 'VisaCard',
            date: '29/10/2021',
            number: 99999999,
            default: false
        },
        {
            type: 'MasterCard',
            date: '01/07/2019',
            number: 22222222,
            default: false
        },
        {
            type: 'VisaCard',
            date: '17/05/2018',
            number: 55555555,
            default: false
        }
    ];

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
        <div className={styles['payments']}>
            <Sidebar />
            <div className={styles['mypayments']}>
                <h4 className="header-secondary">My payments</h4>
                <h5 className="subtitle-text subtle-text">PAYMENTS PENDING, PAID, REFUNDED.</h5>
                <div className={styles['paymentMethod']}>
                    <h6 className='header-tertiary'>Payment methods</h6>
                    <PaymentMethod methods={methodData}/>

                </div>
                <div className={styles['pastPayment']}>
                    <h6 className='header-tertiary'>Past payments</h6>
                    <div className={styles['namebox']}>
                        <div>Date</div>
                        <div>Amount</div>
                        <div>Type</div>
                        <div>Status</div>
                        <div>Booking Ref</div>
                    </div>
                    <PastPayment payments={paymentData}/>

                </div>
            </div>
        </div>
        

    </div>

);

};

export default Payments;