import { useState } from 'react';
import { Method } from '../../../pages/payments/index';
import PaymentMethod from '../PaymentMethod/index';
import styles from './Payment.module.scss';

interface PaymentProps {
    methods: Method[];
}

const Payment = (props: PaymentProps) => {
    const [paymentMethods, setPaymentMethods] = useState<Method[]>(props.methods);

    const makeDefault = (method: Method) => {

        let methods = [...paymentMethods];

        methods.map(object => {
            if (method === object) {
                object.default = true;
                methods = methods.filter(obj => obj !== object);
                methods.unshift(object);
            } else {
                object.default = false;
            }
        })

        setPaymentMethods(methods);

    };

    const removeMethod = (method: Method) => {

        setPaymentMethods([...paymentMethods].filter(obj => obj !== method));
    };

    return (
        <div className={styles['paymentMethod']}>
            {paymentMethods.length === 0 ? (
                <p>No payment method added yet.</p>
            ) : (
                paymentMethods.map((method) => (
                    <div className={styles['paymentMethod__block']}>
                        <PaymentMethod method={method} makeDefault={makeDefault} removeMethod={removeMethod} />
                    </div>
                ))
            )
            }
            <div className={styles['button']}><button>ADD PAYMENT METHOD</button></div>
        </div>
    );

};

export default Payment;