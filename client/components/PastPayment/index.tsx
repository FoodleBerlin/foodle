import styles from './PastPayment.module.scss';

export type PastPaymentProps = {
    payments: Payment[];
}

const PastPayment = (props: PastPaymentProps) => {

    return (
        <div className={styles['pastPayment']}>

            {props.payments.length === 0 ? (
                <p>No payments have been made yet.</p>
            ) : (

                props.payments.map(({ date, amount, id, status, type }) => (
                    <div className={styles["pastPayment__info"]}>
                        <div>{date}</div>
                        <div>{amount}€</div>
                        <div>{type}</div>
                        <div>{status}</div>
                        <div>{id}</div>
                    </div>
                ))

            )}

        </div>
    );

};

export default PastPayment;