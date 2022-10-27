import Image from 'next/image';
import styles from './BookingCard.module.scss';

interface BookingCardProps {
  id: string,
  title: string,
  endDate: string,
  availableDays: string,
  startDate: string,
  status: string,
  // totalPrice: string
}

export const BookingCard = (props: BookingCardProps) => {
  const { title, availableDays, startDate, endDate, id } = props;

  function returnAvailableDays(availableDays: any){
    
  };

  function returnDate(string:string){

  };

  return (
    <div className={styles['bookingCard']}>
      <div className={styles['bookingCard__imgtext']}>
        <Image alt={'Kitchen Image'} src={'/kitchen-image-3.png'} width={350} height={250} />
        <div className={styles['bookingCard__text']}>
          <h5>
            {title}
          </h5>
          <h6>
            {availableDays} <br /> {startDate}-{endDate}
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
