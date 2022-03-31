import React from 'react';
import Navbar from '../../components/Layout/Navbar';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/pages/All.module.scss';
import { NextPage } from 'next';
import { useListingsQuery } from '../../codegen/index';

const All: NextPage = () => {
  const { status, data, error, isFetching, isLoading } = useListingsQuery({
    endpoint: 'http://localhost:5000/graphql',
    fetchParams: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  });

  const properties = [data?.findAllProperties.Properties][0];

  if (isLoading) console.log('is Loading...');

  return (
    <>
      <Navbar />
      <div className={styles['all-container']}>
        {isLoading ? (
          <p className="body-text-secondary">Loading...</p>
        ) : (
          <ul className="body-text-secondary">
            {properties?.map((property: any, index) => {
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
