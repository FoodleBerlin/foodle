import Image from 'next/image';
import styles from './BookingCard.module.scss';
import {AvailableDay, Booking} from '../../../codegen/index'

interface BookingCardProps {
  booking: Booking;
  removeBooking: (booking:any)=>void;
}

export const BookingCard = (props: BookingCardProps) => {
 
  function dayOfWeekAsString(dayIndex: number){

    return ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"][dayIndex] || '';
    
  };

  function returnAvailableDays(availableDays: AvailableDay[]){
    const initialStartDate= new Date(availableDays[0].startTime);
    const startDateNumber= initialStartDate.getDay();

    const initialEndDate= new Date(availableDays[0].endTime);
    const endDateNumber= initialEndDate.getDay();

    const startDate= dayOfWeekAsString(startDateNumber);
    const endDate=dayOfWeekAsString(endDateNumber);

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
            {props.booking.property.title}
          </h5>
          <h6>
            {returnAvailableDays(props.booking.daySlots)} <br /> {returnDate(props.booking.startDate)}-{returnDate(props.booking.endDate)}
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
