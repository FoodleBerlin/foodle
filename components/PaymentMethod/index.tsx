import { Method } from '../../pages/payments/index';
import Payment from '../Payment';
import styles from './PaymentMethod.module.scss';

interface PaymentMethodProps {
    methods: Method[];
}

const PaymentMethod = (props: PaymentMethodProps) => {

    return (
        <div className={styles['paymentMethod']}>
            {props.methods.length === 0 ? (
                <p>No payment method added yet.</p>
            ) : (
                props.methods.map((method) => (
                    <div className={styles['paymentMethod__block']}>
                        <Payment method={method} />
                    </div>
                ))
            )
            }

            <div className={styles['button']}><button>ADD PAYMENT METHOD</button></div>

        </div>
    );

};

export default PaymentMethod;