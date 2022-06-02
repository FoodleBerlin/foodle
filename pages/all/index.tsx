import React from 'react';
import Navbar from '../../components/Layout/Navbar';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/pages/All.module.scss';
import { GetServerSidePropsContext, NextPage } from 'next';
import { useListingsQuery } from '../../codegen/index';
import { extractUserFromToken } from '../../server/context';
import { AuthenticatedProps } from '../account/payments';

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

const All: NextPage<AuthenticatedProps> = (props: AuthenticatedProps) => {
  /*   console.log(props);
  const { status, data, error, isFetching, isLoading } = useListingsQuery({
    endpoint: process.env.NEXT_PUBLIC_SERVER_URL + 'graphql',
    fetchParams: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  }); */

  //const properties = [data?.findAllProperties.Properties][0];
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

  //if (isLoading) console.log('is Loading...');
  const isLoading = false;

  return (
    <>
      <Navbar user={props.session} />
      <div className={styles['properties-container']}>
        {isLoading ? (
          <p className="body-text-secondary">Loading...</p>
        ) : (
          <ul className="body-text-secondary">
            {properties?.map((property: any, index: number) => {
              return (
                <li className={styles['list-wrapper']} key={index + 1}>
                  <div className="flex-center">
                    <div>
                      <Image
                        src={`/${property.handle}.jpg`}
                        width={302}
                        height={193}
                        className={styles['step5__overview--img']}
                        alt="Image 1"
                      />
                    </div>
                    <div className={styles['list-wrapper__text']}>
                      <Link href={`/all/${property.handle}`}>
                        <a className={styles['list-wrapper__link']}>{property.title}</a>
                      </Link>
                      <div className={styles['list-wrapper__facilities']}>
                        {property.facilities.map((feature: {} | null | undefined, index: number) => (
                          <span key={index + 1}>{feature} </span>
                        ))}
                      </div>
                      <div className={styles['list-wrapper__verification'] + ' flex-column'}>
                        {property.isVerified ? (
                          <span className="feature-tag">VERIFIED</span>
                        ) : (
                          <span className="feature-tag__not-verified">NOT VERIFIED</span>
                        )}
                        <p className={styles['list-wrapper__price'] + ' body-text__small'}>
                          €{property.hourlyPrice * 8}/Day
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};

export default All;
