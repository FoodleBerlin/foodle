import React from 'react';
import styles from './Profile.module.scss';
interface PaymentsProps {
  prop: any;
}

const Payments = (props: PaymentsProps) => {
  return <div className={styles['payments']}></div>;
};

export default Payments;
