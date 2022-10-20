import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { mutationObj } from '../../../../index';

import { useCreateListingMutation } from '../../../../codegen';
import { UploaderImg } from '../Step4';
import { useWizardContext } from '../Wizard';
import styles from './Footer.module.scss';

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

  const router = useRouter();

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
      size: Number(wiz.size),
      title: wiz.title,
      ownerHandle: props.session.email.substring(0, props.session.email.indexOf('@')),
      street: wiz.location.street,
      streetNumber: wiz.location.streetNumber,
      zip: Number(wiz.location.zip),
      city: wiz.location.city,
      description: wiz.description,
      pickup: wiz.pickup === 'pickup-yes' ? true : false,
      hourlyPrice: Number(wiz.hourlyPrice),
      serviceFee: Number(wiz.serviceFee) ?? 0,
      rules: wiz.rules,
      deposit: Number(wiz.deposit) ?? 0,
      images: images,
      partialSpace: wiz.partialSpace === 'partial' ? true : false,
      startDate: new Date(wiz.startDate).toISOString(),
      endDate: new Date(wiz.endDate).toISOString(),
      frequency: wiz.frequency,
      facilities: wiz.facilities,
      availableDays: selectedDaySlots,
    });
    router.push('/create-listing-success');
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
      formState.errors.frequency ||
      formState.errors.rules ||
      formState.errors.images
    ) {
      return true;
    }
  };

  return (
    <div className={styles['footer']}>
      <div className={styles['footer__container']}>
        <button
          onClick={() => previousStep(props.step)}
          className={props.step === 1 ? styles['hidden'] : 'secondary-btn-small'}
        >
          back
        </button>

        <button
          className={'primary-btn-small'} //NEEDS TO BE CHANGED
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
