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
      rules: ['Hello its me', 'no smoking'],
      hourlyPrice: 100,
      serviceFee: 50,
      deposit: 500,
      partialSpace: false,
      pickup: false,
      handle: '1',
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
                        src="/kitchen-test.jpg"
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
