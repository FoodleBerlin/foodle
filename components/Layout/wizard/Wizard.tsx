import React, { useContext, useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import styles from './Wizard.module.scss';
import { z } from 'zod';
import { FormState, useForm, UseFormGetValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function Wizard() {
  const wizardContext = useWizardContext();
  return (
    <div className={styles['wizard']}>
      {wizardContext.step == 1 && <Step1></Step1>}
      {wizardContext.step == 2 && <Step2></Step2>}
      {wizardContext.step == 3 && <Step3></Step3>}
      {wizardContext.step == 4 && <Step4></Step4>}
      {wizardContext.step == 5 && <Step5></Step5>}
    </div>
  );
}
const onlyString = /\d/;

export const formData = z.object({
  property: z.enum(['partial', 'full']),
  size: z.number({ required_error: 'Size is required' }).min(1).max(1000),
  location: z.object({
    street: z
      .string({ required_error: 'Street is required', invalid_type_error: 'Street must be string' })
      .nonempty({ message: "Street can't be empty." })
      .refine((val) => !onlyString.test(val), { message: 'String contains numbers.' }),
    number: z.number({ required_error: 'Number is required' }),
    zip: z.number({ required_error: 'Zip is required' }),
    city: z.string({ required_error: 'City is required' }),
    country: z.string({ required_error: 'Country is required' }),
  }),
  // TODO add fields for step2, step3, ...
});

export type FormData = z.infer<typeof formData>;
type WizardContext = {
  step: number;
  defaults: FormData;
  formState: FormState<FormData>;
  nextStep: (currentStep: number) => void;
  submitForm: (formData: any) => void;
  previousStep: (currentStep: number) => void;
  register: UseFormRegister<FormData>;
  setValue: UseFormSetValue<FormData>;
  getValues: UseFormGetValues<FormData>;
};

const WizardContext = React.createContext<WizardContext>({
  step: 1,
  defaults: {
    property: 'full' as FormData['property'],
    size: 0,
    location: {
      city: 'Berlin',
      country: 'Germany',
      number: 0,
      street: '',
      zip: 0,
    },
  },
  formState: {} as FormState<FormData>,
  nextStep: () => {},
  previousStep: () => {},
  submitForm: () => {},
  register: {} as UseFormRegister<FormData>,
  setValue: {} as UseFormSetValue<FormData>,
  getValues: {} as UseFormGetValues<FormData>,
});

export const WizardProvider = ({ children }: any) => {
  const [step, setStep] = useState<number>(1);
  const defaults = {
    property: 'full',
    location: {
      city: 'Berlin',
      country: 'Germany',
      number: 0,
      street: '',
      zip: 0,
    },
  } as FormData;
  const { register, setValue, formState, getValues } = useForm<FormData>({
    resolver: zodResolver(formData),
    defaultValues: defaults,
  });
  const nextStep = (currentStep: number): void => {
    if (currentStep === 5) return;
    setStep(currentStep + 1);
  };
  const previousStep = (currentStep: number): void => {
    if (currentStep === 1) return;
    setStep(currentStep - 1);
  };
  const submitForm = (formData: any) => {
    console.log(formData);
  };
  return (
    <WizardContext.Provider
      value={{ step, nextStep, previousStep, submitForm, defaults, register, setValue, formState, getValues }}
    >
      {children}
    </WizardContext.Provider>
  );
};

export function useWizardContext() {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('Component not wrapped by provider');
  }
  return context;
}
