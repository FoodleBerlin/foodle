import { Method } from '../../pages/payments/index';
import Image from 'next/image';
import styles from './Payment.module.scss';

interface PaymentProps {
    method: Method;
}

const Payment = (props: PaymentProps) => {
    return (
        <div className=''>
            {props.method.default ? (
                <div>
                    <div>
                        <div> {props.method.type} {props.method.number}</div>
                        <div className={styles['greytext']}>Expiry {props.method.date}</div>
                    </div>
                    <div className={styles['default']}>DEFAULT</div>
                </div>
                
            ) : (
                <div>
                    <div>
                        <div> {props.method.type} {props.method.number}</div>
                        <div className={styles['greytext']}>Expiry {props.method.date}</div>
                    </div>
                    <div className="">
                        <div className={styles['makeDefault']}>MAKE DEFAULT</div>
                        <Image className='' alt={'xmark'} src={'/xmark.svg'} width={18} height={18} />
                    </div>
                </div>
                

            )}
        </div>
    );
};

export default Payment;