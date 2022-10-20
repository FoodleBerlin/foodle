import { Method } from '../../../pages/payments/index';
import Payment from '../Payment';
import styles from './PaymentMethod.module.scss';
import {useState} from 'react';

interface PaymentMethodProps {
    methods: Method[];
}

const PaymentMethod = (props: PaymentMethodProps) => {
    const [paymentMethods, setPaymentMethods]= useState<Method[]>(props.methods);

    const makeDefault= (method: Method)=>{

        let methods= [...paymentMethods];
        
        methods.map(object=>{
            if(method===object){
                object.default= true;
                methods=methods.filter(obj=>obj!==object);
                methods.unshift(object);
            }else{
                object.default= false;
            }
        })

        setPaymentMethods(methods);
       
    };

    const removeMethod=(method:Method)=>{
        let methods=[...paymentMethods];

        methods=methods.filter(obj=> obj!==method);
        setPaymentMethods(methods);
    };

    return (
        <div className={styles['paymentMethod']}>
            {paymentMethods.length === 0 ? (
                <p>No payment method added yet.</p>
            ) : (
                paymentMethods.map((method) => (
                    <div className={styles['paymentMethod__block']}>
                        <Payment method={method} makeDefault={makeDefault} removeMethod={removeMethod} />
                    </div>
                ))
            )
            }

            <div className={styles['button']}><button>ADD PAYMENT METHOD</button></div>

        </div>
    );

};

export default PaymentMethod;