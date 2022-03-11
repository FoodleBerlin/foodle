import React, { ReactChildren, useState } from 'react';
import { FormData, useWizardContext } from './Wizard';
import styles from './Wizard.module.scss';

type FooterProps = {
  step: number;
};

const Footer = (props: FooterProps) => {
  const { formState, nextStep, register, setValue, previousStep } = useWizardContext();

  const error = () => {
    if (
      formState.errors.property ||
      formState.errors.size ||
      formState.errors.location ||
      formState.errors.description ||
      formState.errors.features ||
      formState.errors.stay ||
      formState.errors.rent ||
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
          onClick={() => nextStep(props.step)}
        >
          {props.step === 5 ? 'submit' : 'next'}
        </button>
      </div>
    </div>
  );
};

export default Footer;
