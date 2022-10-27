import Image from 'next/image';
import styles from './BookingCard.module.scss';

export const BookingCard = (props: '') => {
  const { img, name, area, availableDays, startDate, endDate, id } = props;
  return (
    <div className={styles['bookingCard']}>
      <div className={styles['bookingCard__imgtext']}>
        <Image alt={'Kitchen Image'} src={img} width={350} height={250} />
        <div className={styles['bookingCard__text']}>
          <h5>
            {name} in {area}
          </h5>
          <h6>
            {availableDays.join(', ')} <br /> {startDate}-{endDate}
          </h6>
          <h6>
            Booking ref: <br />
            {id}
          </h6>
        </div>
      </div>
      <button>DELETE</button>
    </div>
  );
};
