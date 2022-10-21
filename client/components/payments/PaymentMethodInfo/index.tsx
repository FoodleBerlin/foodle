import styles from './PaymentMethodInfo.module.scss';
import { Method } from '../../../pages/payments/index';


interface PaymentMethodInfoProps {
    method: Method;
};

const PaymentMethodInfo=(props: PaymentMethodInfoProps)=>{

    return(
        <div>
                <div> {props.method.type} {props.method.number}</div>
                <div className={styles['greytext']}>Expiry {props.method.date}</div>
        </div>
    );

};

export default PaymentMethodInfo;