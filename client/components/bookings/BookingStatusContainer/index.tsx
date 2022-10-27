
import { Key } from 'react';
import { BookingCard } from '../BookingCard';

export type BookingStatusContainerProps = {
  bookings: any;
  status: 'requested' | 'confirmed' | 'canceled' | 'rejected';
};
const BookingStatusContainer = (props: BookingStatusContainerProps) => {
  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <div className={props.status}>
      <h4>{capitalizeFirstLetter(props.status)}</h4>

      {props.bookings.length === 0 ? (
        <p>No {props.status} bookings yet.</p>
      ) : (
        props.bookings.map((booking: any, index: any) => (
          <BookingCard
            id={booking.id}
            title={booking.property.title}
            endDate={booking.endDate}
            availableDays={booking.daySlots}
            startDate={booking.startDate}
            status={booking.bookingStatus}
            // totalPrice={booking.totalPrice}
            key={index}
          />
        ))
      )}

      <hr />
    </div>
  );
};

export default BookingStatusContainer;
