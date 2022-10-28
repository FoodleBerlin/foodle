import Image from 'next/image';
import styles from './BookingCard.module.scss';

interface BookingCardProps {
  booking:any;
  removeBooking: (booking:any)=>void;
}

export const BookingCard = (props: BookingCardProps) => {
 
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
            {props.booking.title}
          </h5>
          <h6>
            {returnAvailableDays(props.booking.availableDays)} <br /> {returnDate(props.booking.startDate)}-{returnDate(props.booking.endDate)}
          </h6>
          <h6>
            Booking ref: <br />
            {props.booking.id}
          </h6>
        </div>
      </div>
      <button onClick={()=>props.removeBooking(props.booking)}>DELETE</button>
    </div>
  );
};
