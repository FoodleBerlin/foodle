import React from 'react';
import styles from './Bookings.module.scss';
interface BookingsProps {
  prop: any;
}

const Bookings = (props: BookingsProps) => {
  return <div className={styles['bookings']}></div>;
};

export default Bookings;
