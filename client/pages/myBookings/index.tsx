import type { NextPage } from 'next';
import Head from 'next/head';
import { useFindBookingsOfUserQuery } from '../../codegen/index';
import BookingStatusContainer from '../../components/bookings/BookingStatusContainer';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import styles from './myBookings.module.scss';



const myBookings: NextPage = () => {

  const { data, isLoading } = useFindBookingsOfUserQuery({
    endpoint: process.env.NEXT_PUBLIC_SERVER_URL + 'graphql',
    fetchParams: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  });

  if (isLoading) console.log('is Loading...');

  const bookings = [data?.findBookingsOfUser.Bookings][0];

  const rejected = bookings?.filter((booking) => booking?.bookingStatus === 'REJECTED');
  console.log('Rejected: ' + rejected);
  const requested = bookings?.filter((booking) => booking?.bookingStatus === 'PENDING');
  console.log('Requested: ' + requested);
  // const canceled = bookings?.filter((booking) => booking?.bookingStatus === 'CANCELED');
  const confirmed = bookings?.filter((booking) => booking.bookingStatus === 'ACCEPTED');
  console.log('Confirmed: ' + confirmed);

  return (
    <div>
      <Head>
        <title>Foodle:My bookings</title>
        <meta
          name="my bookings page"
          content="A list of all bookings made, requested, rejected, cancelled and confirmed"
        />
        <link rel="icon" href="/foodle_logo.svg" />
      </Head>
      <Navbar />

      <div className={styles['myBookings']}>
        <Sidebar />

        <div className={styles['bookingList']}>
          <h4>My bookings</h4>
          <h5>A list of all bookings made, requested, rejected, cancelled and confirmed</h5>

          <div className={styles['bookingCard']}>
            <div className={styles['bookingContainer']}>
              <BookingStatusContainer bookings={requested} status={'requested'} />
              {/* <BookingStatusContainer bookings={canceled} status={'canceled'} /> */}
              <BookingStatusContainer bookings={confirmed} status={'confirmed'} />
              <BookingStatusContainer bookings={rejected} status={'rejected'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default myBookings;
