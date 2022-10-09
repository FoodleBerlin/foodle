import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useFindAllPropertiesQuery } from '../../codegen/index';

import ListedKitchen from '../../components/Book/ListedKitchen';
import Navbar from '../../components/Layout/Navbar';
import styles from './All.module.scss';

const Kitchen: NextPage = () => {
  const router = useRouter();
  const { handle } = router.query;
  const { status, data, error, isFetching, isLoading } = useFindAllPropertiesQuery({
    endpoint: process.env.NEXT_PUBLIC_SERVER_URL + 'graphql',
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
      <div className={styles['properties-container']}>
        {properties?.map((property: any, index) => {
          if (property.handle === handle) {
            return (
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
            );
          }
        })}
      </div>
    </>
  );
};

export default Kitchen;
