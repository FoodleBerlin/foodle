import react from 'react';
import Navbar from '../../components/Layout/Navbar';
import ListedKitchen from '../../components/Book/ListedKitchen';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useListingsQuery } from '../../codegen/index';
import styles from '../../styles/pages/All.module.scss';
import BookingSidebar from '../../components/Book/BookingSidebar';

const Kitchen: NextPage = () => {
  const router = useRouter();
  const { handle } = router.query;
  /*   const { status, data, error, isFetching, isLoading } = useListingsQuery({
    endpoint: process.env.NEXT_PUBLIC_SERVER_URL + 'graphql',
    fetchParams: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  }); */

  //if (isLoading) console.log('is Loading...');
  const isLoading = false;

  const properties = [
    {
      id: '1',
      size: 30,
      ownerId: '1',
      street: 'Turmstrasse',
      streetNumber: 1233,
      zip: 10210,
      city: 'Berlin',
      description: 'this is the first kitchen on foodle.',
      facilities: ['Dishwasher', 'Oven', 'Elevator'],
      rules: ['no smoking', 'no pets', 'no parties', 'no loud music'],
      hourlyPrice: 100,
      serviceFee: 50,
      deposit: 500,
      partialSpace: false,
      pickup: false,
      handle: 'dummy-kitchen',
      title: 'Industrial Grade Kitchen in Mitte',
      isVerified: true,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1588795909846-f8f8f8f8f8f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
          alt: 'kitchen',
        },
        {
          url: 'https://images.unsplash.com/photo-1588795909846-f8f8f8f8f8f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
          alt: 'kitchen',
        },
      ],
      availabilities: {
        create: {
          startDate: new Date('2022-03-25').toISOString(),
          endDate: new Date('2022-04-08').toISOString(),
          minMonths: 1,
          frequency: 'weekly',
          availableDays: {
            createMany: {
              data: [
                {
                  startTime: new Date('1999-01-01T07:00:00').toISOString(),
                  endTime: new Date('1999-01-01T19:00:00').toISOString(),
                  weekday: 'Monday',
                },
              ],
            },
          },
        },
      },
    },
  ];
  //console.log(properties);

  return (
    <>
      <Navbar />
      <div className={styles['properties-container'] + ' ' + styles['row']}>
        {properties?.map((property: any, index) => {
          if (property.handle === handle) {
            return (
              <div className={styles['main-column']}>
                <ListedKitchen
                  title={property.title}
                  images={property.images}
                  isVerified={property.isVerified}
                  hourlyPrice={property.hourlyPrice}
                  size={property.size}
                  facilities={property.facilities}
                  description={property.description}
                  deposit={property.deposit}
                  rules={property.rules}
                  availability={property.availabilities}
                  partialSpace={property.partialSpace}
                  street={property.street}
                  streetNumber={property.streetNumber}
                  city={property.city}
                  zip={property.zip}
                  key={index + 1}
                />
              </div>
            );
          }
        })}
        <div className={styles['sidebar-column'] + ' mt-five ml-one'}>
          <div className={styles['fixed']}>
            <BookingSidebar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Kitchen;
