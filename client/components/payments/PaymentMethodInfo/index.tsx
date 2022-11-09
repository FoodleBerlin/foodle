import styles from './PaymentMethodInfo.module.scss';
import {PaymentInformation} from '../../../codegen/index';


interface PaymentMethodInfoProps {
    method: PaymentInformation;
};

const PaymentMethodInfo=(props: PaymentMethodInfoProps)=>{

    return(
        <div>
                <div> {props.method.type} {props.method.cardNumber}</div>
                <div className={styles['greytext']}>Expiry {props.method.expiryMonth}/{props.method.expiryYear}</div>
        </div>
    );

};

export default PaymentMethodInfo;