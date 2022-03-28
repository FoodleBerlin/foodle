import React from 'react';
import Navbar from '../../components/Layout/Navbar';
import Link from 'next/link';
import styles from '../../styles/pages/Listings.module.scss';
import { NextPage } from 'next';
import { useListingsQuery } from '../../codegen/index';

const Listings: NextPage = () => {
  const { status, data, error, isFetching, isLoading } = useListingsQuery({
    endpoint: 'http://localhost:5000/graphql',
    fetchParams: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  });

  const properties = [data?.findAllProperties.Properties][0];
  console.log(properties);

  if (isLoading) console.log('is Loading...');

  return (
    <>
      <Navbar />
      <div className={styles['main']}>
        <h1 className="header-primary">Listed Kitchens</h1>
        {isLoading ? (
          <p className="body-text-secondary">Loading...</p>
        ) : (
          <ul className="body-text-secondary">
            {properties?.map((property: any, index) => {
              return (
                <li className={styles['list']} key={index + 1}>
                  <Link href={`/listings/${property.handle}`}>
                    <a className={styles['link']}>{property.title}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};

export default Listings;
