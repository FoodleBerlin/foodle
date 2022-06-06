import react from 'react';
import Navbar from '../../components/Layout/Navbar';
import ListedKitchen from '../../components/Book/ListedKitchen';
import { useRouter } from 'next/router';
import { useListingsQuery } from '../../codegen/index';
import styles from '../../styles/pages/All.module.scss';
import BookingSidebar from '../../components/Book/BookingSidebar';
import { AuthenticatedProps } from '../account/payments';
import { GetServerSidePropsContext, NextPage } from 'next';
import { extractUserFromToken } from '../../server/context';

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  if (!req.cookies['jwt']) {
    return {
      props: {},
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
  return {
    props: {
      session: extractUserFromToken(null, req.cookies['jwt']),
      jwt: req.cookies['jwt'],
    },
  };
}

const Kitchen: NextPage<AuthenticatedProps> = (props: AuthenticatedProps) => {
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
      handle: 'dummy-kitchen-1',
      title: 'Industrial Grade Kitchen in Mitte',
      isVerified: true,
      images: ['dummy-kitchen-1', 'kitchen-test-3', 'dummy-kitchen-2', 'dummy-kitchen-3', 'kitchen-test-5'],
      availabilities: {
        startDate: new Date('2022-03-25').toISOString(),
        endDate: new Date('2022-04-08').toISOString(),
        minMonths: 2,
        frequency: 'weekly',
        availableDays: {
          startTime: new Date('1999-01-01T07:00:00').toISOString(),
          endTime: new Date('1999-01-01T19:00:00').toISOString(),
          weekday: 'Monday',
        },
      },
    },
    {
      id: '2',
      size: 70,
      ownerId: '5',
      street: 'Sonnenallee',
      streetNumber: 155,
      zip: 12043,
      city: 'Berlin',
      description: 'Very spacious kitchen in Berlin Neukölln',
      facilities: ['Dishwasher', 'Oven', 'Elevator', 'Parking', 'A/C', 'Heating'],
      rules: ['no smoking', 'no pets'],
      hourlyPrice: 200,
      serviceFee: 100,
      deposit: 1000,
      partialSpace: false,
      pickup: true,
      handle: 'dummy-kitchen-2',
      title: 'Spacious Kitchen in Berlin Neukölln',
      isVerified: true,
      images: ['dummy-kitchen-1', 'kitchen-test-3', 'dummy-kitchen-2', 'dummy-kitchen-3', 'kitchen-test-5'],
      availabilities: {
        startDate: new Date('2022-03-25').toISOString(),
        endDate: new Date('2022-04-08').toISOString(),
        minMonths: 2,
        frequency: 'weekly',
        availableDays: {
          startTime: new Date('1999-01-01T07:00:00').toISOString(),
          endTime: new Date('1999-01-01T19:00:00').toISOString(),
          weekday: 'Monday',
        },
      },
    },
    {
      id: '3',
      size: 25,
      ownerId: '100',
      street: 'Schillerstrasse',
      streetNumber: 85,
      zip: 10009,
      city: 'Berlin',
      description: 'Beautiful small kitchen in the heart of Berlin.',
      facilities: ['Oven', 'Parking', 'A/C', 'Heating'],
      rules: ['no smoking'],
      hourlyPrice: 35,
      serviceFee: 50,
      deposit: 450,
      partialSpace: false,
      pickup: false,
      handle: 'dummy-kitchen-3',
      title: 'Small Kitchen in Berlin Kreuzberg',
      isVerified: true,
      images: ['dummy-kitchen-1', 'kitchen-test-3', 'dummy-kitchen-2', 'dummy-kitchen-3', 'kitchen-test-5'],
      availabilities: {
        startDate: new Date('2022-03-25').toISOString(),
        endDate: new Date('2022-04-08').toISOString(),
        minMonths: 2,
        frequency: 'weekly',
        availableDays: {
          startTime: new Date('1999-01-01T07:00:00').toISOString(),
          endTime: new Date('1999-01-01T19:00:00').toISOString(),
          weekday: 'Monday',
        },
      },
    },
  ];
  //console.log(properties);

  return (
    <>
      <Navbar user={props.session} />
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
