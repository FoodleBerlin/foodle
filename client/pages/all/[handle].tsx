import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useFindAllPropertiesQuery } from '../../codegen/index';
import Navbar from '../../components/layout/Navbar';
import ListingOverview from '../../components/listing/ListingOverview';
import styles from './All.module.scss';


const Kitchen: NextPage = () => {
  const router = useRouter();
  const { handle } = router.query;
  const { data, isLoading } = useFindAllPropertiesQuery({
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
        {properties?.map((property, index: any) => {
          if (property.handle === handle) {
            //TODO: Needs a type change
            property.images = ["/kitchen-test.jpg"]
            return (
              <ListingOverview key={index + "-key"} listingsData={{ hideSidebar: false, ...property }} />
            );
          }
        })}
      </div>
    </>
  );
};

export default Kitchen;
