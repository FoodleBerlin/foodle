import styles from './PaymentMethod.module.scss'
import {Method} from '../../pages/payments/index'
import DefaultButton from '../DefaultButton/index'

export type PaymentMethodProps={
    methods: Method[];
}

const PaymentMethod=(props: PaymentMethodProps)=>{

return(
    <div className={styles['paymentMethod']}>
       {props.methods.length===0?(
        <p>No payment method added yet.</p>
       ):(
        props.methods.map(({date,type,number,default})=>(
            <div className="">
                <div>{type} {number}</div>
                <div>Expiry {date}</div>
                <DefaultButton default={default}/>
            </div>
        ))
       )
       }



        <div className={styles['button']}><button>ADD PAYMENT METHOD</button></div>
        
    </div>
);

};

export default PaymentMethod;