import { Method } from '../../pages/payments/index';
import Image from 'next/image';
import styles from './Payment.module.scss';
import PaymentMethodInfo from '../PaymentMethodInfo/index';

interface PaymentProps {
    method: Method;
    makeDefault: (method: Method)=> void;
}

const Payment = (props: PaymentProps) => {

    return (
        <div className=''>
            {props.method.default ? (
                <div>
                    <PaymentMethodInfo method={props.method}/>
                    <div className={styles['default']}>DEFAULT</div>
                </div>
                
            ) : (
                <div>
                    <PaymentMethodInfo method={props.method}/>
                    <div className="">
                        <div className={styles['makeDefault']} onClick={()=> props.makeDefault(props.method)}>MAKE DEFAULT</div>
                        <Image className='' alt={'xmark'} src={'/xmark.svg'} width={18} height={18} />
                    </div>
                </div>
                

            )}
        </div>
    );
};

export default Payment;