import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FrequencyEnum, useFindAllPropertiesQuery } from '../../codegen/index';
import Navbar from '../../components/Layout/Navbar';
import ListingOverview from '../../components/Listing/ListingOverview';
import styles from '../../styles/pages/All.module.scss';

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
  console.log(properties);
  return (
    <>
      <Navbar />
      <div className={styles['properties-container']}>
        {properties?.map((property: any, index) => {
          if (property.handle === handle) {
            //TODO: Remove dummy data with missing data from db
            property.facilities = ["Lift"];
            property.frequency = FrequencyEnum.Weekly;
            //TODO: Needs a type change
            property.images = [{ url: "/kitchen-test.jpg", id: 1, description: "description" }]

            return (
              <ListingOverview listingsData={property} />
            );
          }
        })}
      </div>
    </>
  );
};

export default Kitchen;
