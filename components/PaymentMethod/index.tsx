import styles from './PaymentMethod.module.scss'

const PaymentMethod=()=>{

return(
    <div className={styles['paymentMethod']}>
       
        <div className={styles['button']}><button>ADD PAYMENT METHOD</button></div>
        
    </div>
);

};

export default PaymentMethod;