import { prisma } from '@prisma/client';
import { useEffect } from 'react';
import { CreateListing } from '../../../codegen/createListing';
import { useWizardContext } from './Wizard';
import client from '../../../client';
import { AuthenticatedProps } from '../../../pages/account';
import { DaySlot } from './Step3';

export default function Step5(props: AuthenticatedProps) {
  const { getValues } = useWizardContext();

  const handleSubmit = async () => {
    const wiz = getValues();

    const selectedDaySlots: DaySlot[] = [];
    useEffect(() => {
      const slots = wiz.availability.daySlots;
      if (slots.monday.selected) {
        selectedDaySlots.push(slots.monday);
      }
      if (slots.tuesday.selected) {
        selectedDaySlots.push(slots.tuesday);
      }
      if (slots.wednesday.selected) {
        selectedDaySlots.push(slots.wednesday);
      }
      if (slots.thursday.selected) {
        selectedDaySlots.push(slots.thursday);
      }
      if (slots.friday.selected) {
        selectedDaySlots.push(slots.friday);
      }
      if (slots.saturday.selected) {
        selectedDaySlots.push(slots.saturday);
      }
      if (slots.sunday.selected) {
        selectedDaySlots.push(slots.sunday);
      }
    });

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
        minStayHours: 0,
        minStayWeeks: 0,
        pickup: false,
        serviceFee: Number(0),
        partialSpace: wiz.partialSpace === 'partial' ? true : false,
        availabilities: {
          startDate: new Date(wiz.availability.startDate).toISOString(),
          endDate: new Date(wiz.availability.endDate).toISOString(),
          repeats: wiz.availability.repeat,
          genericDaySlots: selectedDaySlots,
          minimumMonth: Number(wiz.minMonths),
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
