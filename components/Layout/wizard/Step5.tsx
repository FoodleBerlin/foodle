import { prisma } from '@prisma/client';
import { useEffect } from 'react';
import { CreateListing } from '../../../codegen/createListing';
import { useWizardContext } from './Wizard';
import client from '../../../client';

export default function Step5() {
  const { getValues } = useWizardContext();

  const handleSubmit = async () => {
    const wiz = getValues();
    const res = await client.mutate({
      mutation: CreateListing,
      variables: {
        size: Number(wiz.size), // store as int instead
        ownerId: '1', // get User ID
        street: wiz.location.street,
        streetNumber: wiz.location.number,
        zip: wiz.location.zip,
        city: wiz.location.city,
        description: wiz.description,
        rules: wiz.rules.split('.'),
        dailyPrice: wiz.rent,
        facilities: wiz.features,
      },
    });
    console.log({ res });
  };

  return (
    <div>
      <button onClick={() => handleSubmit()}>Submit</button>
      <h1>Landlord component flow 5</h1>
    </div>
  );
}
