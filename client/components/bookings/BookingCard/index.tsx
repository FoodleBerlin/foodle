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

  function numberToDay(number: number){
    if(number==0){
      return 'Monday'
    }else if(number==1){
      return 'Tuesday'
    }else if(number==2){
      return 'Wednesday'
    }else if(number==3){
      return 'Thurday'
    }else if(number==4){
      return 'Friday'
    }else if(number==5){
      return 'Saturday'
    }else if(number==6){
      return 'Sunday'
    }
  };

  function returnAvailableDays(availableDays: any){
    const initialStartDate= new Date(availableDays.startTime);
    const startDateNumber= initialStartDate.getDay();

    const initialEndDate= new Date(availableDays.endTime);
    const endDateNumber= initialEndDate.getDay();

    const startDate= numberToDay(startDateNumber);
    const endDate=numberToDay(endDateNumber);

    return startDate+ ', '+endDate;

  };

  function returnDate(date:string){
    const array= date.split(" ");
    return array[0];
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
            {returnAvailableDays(availableDays)} <br /> {returnDate(startDate)}-{returnDate(endDate)}
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
