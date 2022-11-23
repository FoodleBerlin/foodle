import type { NextPage } from 'next';
import Head from 'next/head';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import Payment from '../../components/payments/Payment';
import styles from './Payments.module.scss';

export type Payment = {
    date: string;
    amount: number;
    type: string;
    status: string;
    id: number;
}

export type Method = {
    type: string;
    date: string;
    number: number;
    default: boolean;
}

const Payments: NextPage = () => {

    const paymentData: Payment[] = [
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

    const methodData: Method[] = [
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

    return (

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
                <Sidebar sitePosition={3} />
                <div className={styles['mypayments']}>
                    <h4 className="header-secondary">My payments</h4>
                    <h5 className="subtitle-text subtle-text">PAYMENTS PENDING, PAID, REFUNDED.</h5>
                    <div className={styles['paymentMethod']}>
                        <h6 className='header-tertiary'>Payment methods</h6>
                        <Payment methods={methodData} />

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

                        <div className="">
                            {paymentData.length === 0 ? (
                                <p>No payments have been made yet.</p>
                            ) : (

                                paymentData.map(({ date, amount, id, status, type }, index) => (
                                    <div key={"key-" + index.toString()} className={styles["blocks"]}>
                                        <div>{date}</div>
                                        <div>{amount}€</div>
                                        <div>{type}</div>
                                        <div>{status}</div>
                                        <div>{id}</div>
                                    </div>
                                ))

                            )}
                        </div>

                    </div>
                </div>
            </div>


        </div >

    );

};

export default Payments;