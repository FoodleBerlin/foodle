import React, { useEffect } from 'react';
import { mutationObj } from '../../../client';
import { useCreateListingMutation } from '../../../codegen';
import { UploaderImg } from './Step4';
import { useWizardContext } from './Wizard';
import styles from './Wizard.module.scss';

type FooterProps = {
  step: number;
  session: { id: string; fullName: string; email: string; stripeId: string | null };
  jwt: string;
};

const Footer = (props: FooterProps) => {
  const { formState, nextStep, register, setValue, previousStep, getValues } = useWizardContext();
  const { mutate, data } = useCreateListingMutation(mutationObj(props.jwt));

  const isoString = (time: string) => {
    if (time == '') {
      return new Date('1900-01-01T01:00:00').toISOString();
    }
    return new Date('2000-01-01T' + time + ':00').toISOString();
  };
  const wiz = getValues();

  const selectedDaySlots: { startTime: string; endTime: string }[] = [];
  useEffect(() => {
    const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = wiz.daySlots;
    if (monday.selected) {
      let startTime = isoString(monday.startingTime),
        endTime = isoString(monday.endingTime);
      selectedDaySlots.push({ startTime, endTime });
    }
    if (tuesday.selected) {
      let startTime = isoString(tuesday.startingTime),
        endTime = isoString(tuesday.endingTime);
      selectedDaySlots.push({ startTime, endTime });
    }
    if (wednesday.selected) {
      let startTime = isoString(wednesday.startingTime),
        endTime = isoString(wednesday.endingTime);
      selectedDaySlots.push({ startTime, endTime });
    }
    if (thursday.selected) {
      let startTime = isoString(thursday.startingTime),
        endTime = isoString(thursday.endingTime);
      selectedDaySlots.push({ startTime, endTime });
    }
    if (friday.selected) {
      let startTime = isoString(friday.startingTime),
        endTime = isoString(friday.endingTime);
      selectedDaySlots.push({ startTime, endTime });
    }
    if (saturday.selected) {
      let startTime = isoString(saturday.startingTime),
        endTime = isoString(saturday.endingTime);
      selectedDaySlots.push({ startTime, endTime });
    }
    if (sunday.selected) {
      let startTime = isoString(sunday.startingTime),
        endTime = isoString(sunday.endingTime);
      selectedDaySlots.push({ startTime, endTime });
    }
  });

  const images: string[] = [];
  wiz.images.forEach((image: UploaderImg) => {
    images.push(image.fileName);
  });
  const handleSubmit = async () => {
    mutate({
      availableDays: selectedDaySlots,
      city: wiz.location.city,
      deposit: wiz.deposit ?? 0,
      description: wiz.description,
      frequency: wiz.repeat, //TODO: fix - rename in wiz
      hourlyPrice: wiz.hourlyPrice,
      endDate: wiz.endDate,
      partialSpace: wiz.partialSpace === 'partial', // fix - make boolean in wiz
      zip: wiz.location.zip,
      street: wiz.location.street,
      size: wiz.size,
      title: wiz.description.substring(0, 20), //TODO:fix - add form to frontend create flow
      images: [''], // fix - get image
      streetNumber: wiz.location.number, //FIX - rename to streetNumber in frontend
      ownerHandle: 'user1', // fix - get handle from session? or id?
      rules: wiz.rules,
      serviceFee: wiz.deposit ?? 0, //fix - remove from backend
      startDate: wiz.startDate,
      pickup: true, // TODO:fix - add form to frontend
    });
  };

  const error = () => {
    if (
      formState.errors.partialSpace ||
      formState.errors.size ||
      formState.errors.location ||
      formState.errors.description ||
      formState.errors.facilities ||
      formState.errors.minMonths ||
      formState.errors.hourlyPrice ||
      formState.errors.deposit ||
      formState.errors.startDate ||
      formState.errors.endDate ||
      formState.errors.daySlots ||
      formState.errors.repeat ||
      formState.errors.rules ||
      formState.errors.images
    ) {
      return true;
    }
  };

  return (
    <div className={styles['footer']}>
      <div className={styles['footer-container']}>
        <button
          onClick={() => previousStep(props.step)}
          className={props.step === 1 ? styles['hidden'] : styles['secondary-btn-small']}
        >
          back
        </button>

        <button
          className={styles['primary-btn-small']}
          disabled={error() ? true : false}
          onClick={() => {
            nextStep(props.step);
            props.step === 5 ? handleSubmit() : console.log(getValues());
          }}
        >
          {props.step === 5 ? 'submit' : 'next'}
        </button>
      </div>
    </div>
  );
};

export default Footer;
// const res = await client.mutate({
//   mutation: CreateListing,
//   variables: {
//     size: Number(wiz.size),
//     ownerId: props.session.id,
//     street: wiz.location.street,
//     streetNumber: Number(wiz.location.number),
//     zip: Number(wiz.location.zip),
//     city: wiz.location.city,
//     description: wiz.description,
//     rules: wiz.rules.split('.'),
//     hourlyPrice: Number(wiz.hourlyPrice),
//     facilities: wiz.facilities,
//     deposit: Number(wiz.deposit),
//     images: images,
//     pickup: false,
//     serviceFee: Number(0),
//     partialSpace: wiz.partialSpace === 'partial' ? true : false,
//     availabilities: {
//       startDate: new Date(wiz.startDate).toISOString(),
//       endDate: new Date(wiz.availability.endDate).toISOString(),
//       genericDaySlots: selectedDaySlots,
//       minMonths: Number(wiz.minMonths),
//       frequency: wiz.availability.repeat,
//     },
//   },
// });
