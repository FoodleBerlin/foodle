import { Method } from '../../pages/payments/index';
import Image from 'next/image';
import styles from './Payment.module.scss';
import {useState} from 'react';

interface PaymentProps {
    method: Method;
    makeDefault: (method: Method)=> void;
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
                        <div className={styles['makeDefault']} onClick={()=> props.makeDefault(props.method)}>MAKE DEFAULT</div>
                        <Image className='' alt={'xmark'} src={'/xmark.svg'} width={18} height={18} />
                    </div>
                </div>
                

            )}
        </div>
    );
};

export default Payment;