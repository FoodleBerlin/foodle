import { Key, useState } from 'react';
import { BookingCard } from '../BookingCard';
import {Booking} from '../../../codegen/index'

export type BookingStatusContainerProps = {
  bookings: any;
  status: 'requested' | 'confirmed' | 'canceled' | 'rejected';
};
const BookingStatusContainer = (props: BookingStatusContainerProps) => {

  const [bookings, setBookings]= useState<any>(props.bookings);

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const removeBooking= (booking: any)=>{

    setBookings([...bookings].filter(obj=>obj!==booking))

  };

  return (
    <div className={props.status}>
      <h4>{capitalizeFirstLetter(props.status)}</h4>

      {props.bookings?.length === 0 ? (
        <p>No {props.status} bookings yet.</p>
      ) : (
        props.bookings?.map((booking: Booking) => (
          <BookingCard
            booking={booking}
            removeBooking={removeBooking}
          />
        ))
      )}

      <hr />
    </div>
  );
};

export default BookingStatusContainer;
