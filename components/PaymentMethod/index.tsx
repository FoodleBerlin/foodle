import styles from './PaymentMethod.module.scss'
import {Method} from '../../pages/payments/index'
import DefaultButton from '../DefaultButton'

interface PaymentMethodProps {
    methods: Method[];
}

const PaymentMethod=(props: PaymentMethodProps)=>{

return(
    <div className={styles['paymentMethod']}>
       {props.methods.length===0?(
        <p>No payment method added yet.</p>
       ):(
        props.methods.map((method)=>(
            <div className={styles['paymentMethod__block']}>
                <div>
                    <div>{method.type} {method.number}</div>
                    <div className={styles['greytext']}>Expiry {method.date}</div>
                </div>
                
                <DefaultButton default={method.default}/>
            </div>
        ))
       )
       }



        <div className={styles['button']}><button>ADD PAYMENT METHOD</button></div>
        
    </div>
);

};

export default PaymentMethod;