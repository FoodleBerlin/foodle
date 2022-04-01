import React, { ReactChildren, useEffect, useState } from 'react';
import { AuthenticatedProps } from '../../../pages/account';
import client from '../../../client';
import { CreateListing } from '../../../codegen/createListing';
import { UploaderImage } from './Step4';
import { FormData, useWizardContext } from './Wizard';
import styles from './Wizard.module.scss';

type FooterProps = {
  step: number;
  session: { id: string; fullName: string; email: string; stripeId: string | null };
};

const Footer = (props: FooterProps) => {
  const { formState, nextStep, register, setValue, previousStep, getValues } = useWizardContext();
  const isoString = (time: string) => {
    if (time == '') {
      return new Date('1900-01-01T01:00:00').toISOString();
    }
    return new Date('2000-01-01T' + time + ':00').toISOString();
  };
  const wiz = getValues();
  const session = props.session;

  const selectedDaySlots: { startTime: string; endTime: string; weekday: string }[] = [];
  useEffect(() => {
    const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = wiz.availability.daySlots;
    if (monday.selected) {
      let startTime = isoString(monday.startingTime),
        endTime = isoString(monday.endingTime),
        weekday = 'Monday';
      selectedDaySlots.push({ startTime, endTime, weekday });
    }
    if (tuesday.selected) {
      let startTime = isoString(tuesday.startingTime),
        endTime = isoString(tuesday.endingTime),
        weekday = 'Tuesday';
      selectedDaySlots.push({ startTime, endTime, weekday });
    }
    if (wednesday.selected) {
      let startTime = isoString(wednesday.startingTime),
        endTime = isoString(wednesday.endingTime),
        weekday = 'Wednesday';
      selectedDaySlots.push({ startTime, endTime, weekday });
    }
    if (thursday.selected) {
      let startTime = isoString(thursday.startingTime),
        endTime = isoString(thursday.endingTime),
        weekday = 'Thursday';
      selectedDaySlots.push({ startTime, endTime, weekday });
    }
    if (friday.selected) {
      let startTime = isoString(friday.startingTime),
        endTime = isoString(friday.endingTime),
        weekday = 'Friday';
      selectedDaySlots.push({ startTime, endTime, weekday });
    }
    if (saturday.selected) {
      let startTime = isoString(saturday.startingTime),
        endTime = isoString(saturday.endingTime),
        weekday = 'Saturday';
      selectedDaySlots.push({ startTime, endTime, weekday });
    }
    if (sunday.selected) {
      let startTime = isoString(sunday.startingTime),
        endTime = isoString(sunday.endingTime),
        weekday = 'Saturday';
      selectedDaySlots.push({ startTime, endTime, weekday });
    }
  });

  const images: string[] = [];
  wiz.images.forEach((image: UploaderImage) => {
    if (image.s3Id) {
      images.push(image.s3Id);
    }
  });
  const handleSubmit = async () => {
    const res = await client.mutate({
      mutation: CreateListing,
      variables: {
        size: Number(wiz.size),
        ownerId: props.session.id,
        street: wiz.location.street,
        streetNumber: Number(wiz.location.number),
        zip: Number(wiz.location.zip),
        city: wiz.location.city,
        description: wiz.description,
        rules: wiz.rules.split('.'),
        hourlyPrice: Number(wiz.hourlyPrice),
        facilities: wiz.facilities,
        deposit: Number(wiz.deposit),
        images: images,
        pickup: false,
        serviceFee: Number(0),
        partialSpace: wiz.partialSpace === 'partial' ? true : false,
        availabilities: {
          startDate: new Date(wiz.availability.startDate).toISOString(),
          endDate: new Date(wiz.availability.endDate).toISOString(),
          genericDaySlots: selectedDaySlots,
          minMonths: Number(wiz.minMonths),
          frequency: wiz.availability.repeat,
        },
      },
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
      formState.errors.availability ||
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
          className={props.step === 1 ? styles['hidden'] : styles['secondary-btn']}
        >
          back
        </button>

        <button
          className={styles['primary-btn']}
          disabled={error() ? true : false}
          onClick={() => {
            nextStep(props.step);
            handleSubmit();
          }}
        >
          {props.step === 5 ? 'submit' : 'next'}
        </button>
      </div>
    </div>
  );
};

export default Footer;
