import { prisma } from '@prisma/client';
import { useEffect } from 'react';
import { CreateListing } from '../../../codegen/createListing';
import { useWizardContext } from './Wizard';
import client from '../../../client';
import { AuthenticatedProps } from '../../../pages/account';

export default function Step5(props: AuthenticatedProps) {
  const { getValues } = useWizardContext();

  const handleSubmit = async () => {
    const wiz = getValues();
    const res = await client.mutate({
      mutation: CreateListing,
      variables: {
        size: Number(wiz.size), // store as int instead
        ownerId: props.session.id,
        street: wiz.location.street,
        streetNumber: wiz.location.number,
        zip: wiz.location.zip,
        city: wiz.location.city,
        description: wiz.description,
        rules: wiz.rules.split('.'),
        hourlyPrice: wiz.rent,
        facilities: wiz.features,
        deposit: wiz.deposit,
        images: wiz.images,
        minStayHours: wiz.stay.hours,
        minStayWeeks: wiz.stay.weeks,
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
