import { GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import { Token } from '../../../server/utils/forgeJWT';
import { useFindUserQuery } from '../../codegen';
import { PaymentInformation } from '../../codegen/index';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import Payment from '../../components/payments/Payment';
import { useAlertContext } from '../../components/utilities/Alert/AlertContext';
import { extractUserFromToken } from '../../utils/context';
import styles from './Payments.module.scss';

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
    if (!req.cookies['jwt']) {
        return {
            props: {},
            redirect: {
                permanent: false,
                destination: '/',
            },
        };
    }
    return {
        props: {
            session: extractUserFromToken(null, req.cookies['jwt']),
            jwt: req.cookies['jwt'],
        },
    };
}

export type AuthenticatedProps = {
    session: Token['user'];
    jwt: string;
};

const Payments: NextPage<AuthenticatedProps> = (props: AuthenticatedProps) => {

    const alertContext = useAlertContext();
    console.log({ props });
    const { status, data, error, isFetching, isError } = useFindUserQuery(
        {
            endpoint: process.env.NEXT_PUBLIC_SERVER_URL + 'graphql',
            fetchParams: {
                headers: {
                    'Content-Type': 'application/json',
                    jwt: props.jwt,
                },
            },
        },
        // TODO type props
        { handle: props.session.email },
        {}
    );
    console.log({ data });
    console.log({ error });
    console.log(alertContext.isHidden)
    if (isError) {
        alertContext.setMessage((error ?? "error" as any).toString())
        alertContext.shouldHide(false)
    }

    const methods: PaymentInformation[] = data!.findUser!.User!.paymentMethods;


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
            <Navbar user={props.session} />
            <div className={styles['payments']}>
                <Sidebar />
                <div className={styles['mypayments']}>
                    <h4 className="header-secondary">My payments</h4>
                    <h5 className="subtitle-text subtle-text">PAYMENTS PENDING, PAID, REFUNDED.</h5>
                    <div className={styles['paymentMethod']}>
                        <h6 className='header-tertiary'>Payment methods</h6>
                        <Payment methods={methods} />
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
                            {data?.findUser.User?.charges.length === 0 ? (
                                <p>No payments have been made yet.</p>
                            ) : (

                                data?.findUser.User?.charges.map((charge, index) => (
                                    <div className={styles["blocks"]}>
                                        <div>{new Date(charge.date! * 1000).toUTCString()}</div>
                                        <div>
                                            {charge.amount! * 0.01}{charge.currency}
                                        </div>
                                        <div>{charge.card}</div>
                                        <div>{charge.status}</div>
                                        <div>{charge.description}: {charge.invoiceId}</div>
                                    </div>
                                ))

                            )}
                        </div>

                    </div>
                </div>
            </div>


        </div>

    );

};

export default Payments;