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
import Sidebar from '../Sidebar';
import Footer from './Footer';

export default function Wizard() {
  const wizardContext = useWizardContext();
  return (
    <div>
      <Sidebar user={undefined}>
        <div className={styles['sidebar-container']}>
          <div className={'flex'}>
            <div className={wizardContext.step >= 1 ? styles['item__activeOrPassed'] : styles['item']}>
              <div className={styles['dots']}></div>
              <span className={'small-text'}>Property</span>
            </div>

            <div className={wizardContext.step >= 2 ? styles['item__activeOrPassed'] : styles['item']}>
              <div className={styles['dots']}></div>
              <span className={'small-text'}>Features</span>
            </div>
            <div className={wizardContext.step >= 3 ? styles['item__activeOrPassed'] : styles['item']}>
              <div className={styles['dots']}></div>
              <span className={'small-text'}>Logistics</span>
            </div>
            <div className={wizardContext.step >= 4 ? styles['item__activeOrPassed'] : styles['item']}>
              <div className={styles['dots']}></div>
              <span className={'small-text'}>Photos</span>
            </div>
            <div className={wizardContext.step >= 5 ? styles['item__activeOrPassed'] : styles['item']}>
              <div className={styles['dots']}></div>
              <span className={'small-text'}>Summary</span>
            </div>
          </div>
        </div>
      </Sidebar>
      <div className={styles['wizard']}>
        {wizardContext.step == 1 && <Step1></Step1>}
        {wizardContext.step == 2 && <Step2></Step2>}
        {wizardContext.step == 3 && <Step3></Step3>}
        {wizardContext.step == 4 && <Step4></Step4>}
        {wizardContext.step == 5 && <Step5></Step5>}
      </div>
      <Footer step={wizardContext.step} />
    </div>
  );
}

// regex to match only alphabetic characters
const onlyString = /^[a-zA-Z_ ]*$/;

export const formData = z.object({
  /* STEP 1 */
  property: z.enum(['partial', 'full']),
  size: z.number({ required_error: 'Size is required', invalid_type_error: 'Size can not be empty' }).min(1).max(1000),
  location: z.object({
    street: z
      .string({ required_error: 'Street is required', invalid_type_error: 'Street must be string' })
      .nonempty({ message: "Street can't be empty" })
      .refine((val) => onlyString.test(val), { message: "Address can't contain numbers" }),
    number: z.number({ required_error: 'Number is required', invalid_type_error: "Number can't be empty" }),
    zip: z.number({ required_error: 'Zip is required', invalid_type_error: "Zip can't be empty" }),
    city: z
      .string({ required_error: 'City is required' })
      .nonempty({ message: "City can't be empty" })
      .refine((val) => onlyString.test(val), { message: "City can't contain numbers" }),
    country: z
      .string({ required_error: 'Country is required' })
      .nonempty({ message: "Country can't be empty" })
      .refine((val) => onlyString.test(val), { message: "Country can't contain numbers" }),
  }),
  /* STEP 2 */
  description: z
    .string({ required_error: 'Description is required' })
    .min(20, { message: 'Must be 20 or more characters long' })
    .max(7000, { message: 'You reached the maximum amount of characters' })
    .nonempty({ message: 'Description can not be empty' }),
  features: z.enum([
    'Unfurnished',
    'A/C',
    'Elevator',
    'Storefront',
    'Parking',
    'Dishwasher',
    'Heating',
    'Water',
    'Oven',
  ]),
  /*   features: z.object({
    unfurnished: z.boolean().optional(),
    ac: z.boolean().optional(),
    elevator: z.boolean().optional(),
    storefront: z.boolean().optional(),
    parking: z.boolean().optional(),
    dishwasher: z.boolean().optional(),
    heating: z.boolean().optional(),
    water: z.boolean().optional(),
    oven: z.boolean().optional(),
  }), */
  stay: z.object({
    hours: z
      .number({
        required_error: 'Hours per week is required',
        invalid_type_error: 'Hours per week can not be empty',
      })
      .min(1, { message: 'At least 1 hour per week is required.' })
      .max(168, { message: 'You reached the maximum amount of hours per week' }),
    weeks: z
      .number({ required_error: 'Weeks is required', invalid_type_error: 'Weeks can not be empty' })
      .min(0)
      .max(52, { message: 'You reached the maximum amount of recurring weeks' }),
  }),
  /* STEP 3 */
  rent: z
    .number({ required_error: 'Rent per hour is required', invalid_type_error: 'Rent per hour can not be empty' })
    .min(1, { message: 'Rent must be greater than or equal to 1' }),
  deposit: z.number().min(0, { message: 'Deposit must be greater than or equal to 1' }).optional(),
  availability: z.object({
    starting: z.preprocess((arg) => {
      if (typeof arg == 'string' || arg instanceof Date) return new Date(arg);
    }, z.date()),
    days: z.enum(['M', 'T', 'W', 'T', 'F', 'SA', 'SU']),
    from: z.number({ required_error: 'This field is required', invalid_type_error: 'This field can not be empty' }),
    to: z.number({ required_error: 'This field is required', invalid_type_error: 'This field can not be empty' }),
    repeat: z.enum(['none', 'Every week']),
    until: z.date(),
    stay: z
      .string({ required_error: 'Minimum stay is required, e.g. 1 month' })
      .nonempty({ message: 'Minimum stay can not be empty' }),
  }),
  rules: z
    .string({ required_error: 'Rules are required' })
    .min(10, { message: 'Must be 10 or more characters long' })
    .max(7000, { message: 'You reached the maximum amount of characters' })
    .nonempty({ message: 'Rules can not be empty' }),
  images: z
    .array(z.string({ required_error: 'Images are required' }))
    .min(1)
    .max(5),
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
    /* STEP 1 */
    property: 'full' as FormData['property'],
    size: 0,
    location: {
      city: 'Berlin',
      country: 'Germany',
      number: 0,
      street: 'Foodlestreet',
      zip: 0,
    },
    /* STEP 2 */
    description: '',
    features: 'Unfurnished' as FormData['features'],
    stay: {
      hours: 0,
      weeks: 0,
    },
    /* STEP 3 */
    rent: 0,
    deposit: 0,
    availability: {
      starting: new Date('2015-03-25'),
      days: 'M',
      from: 10,
      to: 1.5,
      repeat: 'Every week',
      until: new Date(),
      stay: '1 month',
    },
    rules: '',
    /* STEP 4 */
    images: [],
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
    /* STEP 1 */
    property: 'full',
    location: {
      city: 'Berlin',
      country: 'Germany',
      number: 0,
      street: 'Foodlestreet',
      zip: 0,
    },
    /* STEP 2 */
    description: '',
    features: 'Unfurnished',
    stay: {
      hours: 0,
      weeks: 0,
    },
    /* STEP 3 */
    rent: 0,
    deposit: 0,
    availability: {
      starting: new Date(),
      days: 'M',
      from: 10,
      to: 1.5,
      repeat: 'Every week',
      until: new Date(),
      stay: '1 month',
    },
    rules: '',
    /* STEP 4 */
    images: [''],
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
