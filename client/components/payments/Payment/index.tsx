import { useState } from 'react';
import {PaymentInformation} from '../../../codegen/index';
import PaymentMethod from '../PaymentMethod/index';
import styles from './Payment.module.scss';

interface PaymentProps {
    methods: PaymentInformation[];
}

const Payment = (props: PaymentProps) => {
    const [paymentMethods, setPaymentMethods] = useState<PaymentInformation[]>(props.methods);
    const makeDefault = (method: PaymentInformation) => {

        let methods = [...paymentMethods];

        methods.map(object => {
            if (method === object) {
                // object.default = true;
                methods = methods.filter(obj => obj !== object);
                methods.unshift(object);
            } else {
                // object.default = false;
            }
        })

        setPaymentMethods(methods);

    };

    const removeMethod = (method: PaymentInformation) => {

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