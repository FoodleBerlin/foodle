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
  const { status, data, error, isFetching, isLoading } = useListingsQuery({
    endpoint: 'http://localhost:5000/graphql',
    fetchParams: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  });

  if (isLoading) console.log('is Loading...');

  const properties = [data?.findAllProperties.Properties][0];

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
