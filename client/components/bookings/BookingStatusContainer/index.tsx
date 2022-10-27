
import { BookingCard } from '../BookingCard';

export type BookingStatusContainerProps = {
  bookings: Object[];
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
        props.bookings.map(({ id, area, name, endDate, availableDays, startDate, img }, index) => (
          <BookingCard
            id={id}
            area={area}
            name={name}
            endDate={endDate}
            availableDays={availableDays}
            startDate={startDate}
            img={img}
            status={''}
            key={index}
          />
        ))
      )}

      <hr />
    </div>
  );
};

export default BookingStatusContainer;
