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
    console.log('get' + wiz.availability.starting);

    const res = await client.mutate({
      mutation: CreateListing,
      variables: {
        size: Number(wiz.size), // store as int instead
        ownerId: props.session.id,
        street: wiz.location.street,
        streetNumber: Number(wiz.location.number),
        zip: Number(wiz.location.zip),
        city: wiz.location.city,
        description: wiz.description,
        rules: wiz.rules.split('.'),
        hourlyPrice: Number(wiz.rent),
        facilities: wiz.features,
        deposit: Number(wiz.deposit),
        images: wiz.images,
        minStayHours: Number(wiz.stay.hours),
        minStayWeeks: Number(wiz.stay.weeks),
        pickup: false,
        serviceFee: Number(0),
        partialSpace: wiz.property === 'partial' ? true : false,
        availabilities: {
          startDate: new Date(wiz.availability.starting).toISOString(),
          endDate: new Date(wiz.availability.until).toISOString(),
          repeats: wiz.availability.repeat,
          genericDaySlots: [
            {
              startTime: '2022-03-18T13:10:30Z',
              endTime: '2022-03-18T13:10:30Z',
              weekday: wiz.availability.days[0],
            },
          ],
          minimumMonth: Number(wiz.stay.weeks),
          frequency: wiz.availability.repeat,
        },
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
