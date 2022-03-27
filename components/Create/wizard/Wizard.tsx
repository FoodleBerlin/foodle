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
import Sidebar from '../../Layout/Sidebar';
import Footer from './Footer';
import { AuthenticatedProps } from '../../../pages/account/payments';

export default function Wizard(props: AuthenticatedProps) {
  const wizardContext = useWizardContext();
  return (
    <div className="flex">
      <Sidebar user={props.session}>
        <div className={styles['sidebar-container']}>
          {/* <div> */}
          {['Property', 'Features', 'Logistics', 'Photos', 'Summary'].map((stage: string, index) => {
            return (
              <div
                key={index + 1}
                className={wizardContext.step >= index + 1 ? styles['item__activeOrPassed'] : styles['item']}
              >
                <div className={styles['dots']}></div>
                <span className={'small-text'}>{stage}</span>
              </div>
            );
          })}
          {/* </div> */}
        </div>
      </Sidebar>
      <div className={styles['wizard']}>
        {wizardContext.step == 1 && <Step1></Step1>}
        {wizardContext.step == 2 && <Step2></Step2>}
        {wizardContext.step == 3 && <Step3></Step3>}
        {wizardContext.step == 4 && <Step4></Step4>}
        {wizardContext.step == 5 && <Step5></Step5>}
      </div>
      <Footer session={props.session} step={wizardContext.step} />
    </div>
  );
}
export const touchDirtyValidate = {
  shouldTouch: true,
  shouldDirty: true,
  shouldValidate: true,
};

// regex to match only alphabetic characters
const onlyString = /^[a-zA-Z_ ]*$/;

export const formData = z.object({
  /* STEP 1 */
  partialSpace: z.enum(['partial', 'full']),
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
  facilities: z
    .string({ required_error: 'Features are required' })
    .array()
    .min(1, { message: 'At least one feature must be selected' }),
  /* STEP 3 */
  hourlyPrice: z
    .number({ required_error: 'Rent per hour is required', invalid_type_error: 'Rent per hour can not be empty' })
    .min(1, { message: 'Rent must be greater than or equal to 1' }),
  deposit: z.number().min(0, { message: 'Deposit must be greater than or equal to 1' }).optional(),
  availability: z.object({
    startDate: z.preprocess((arg) => {
      if (typeof arg == 'string' || arg instanceof Date) return new Date(arg);
    }, z.date()),
    daySlots: z.object({
      monday: z.object({
        selected: z.boolean(),
        startingTime: z.string({ required_error: 'A starting time is required for each day' }),
        endingTime: z.string({ required_error: 'A starting time is required for each day' }),
      }),
      tuesday: z.object({
        selected: z.boolean(),
        startingTime: z.string({ required_error: 'A starting time is required for each day' }),
        endingTime: z.string({ required_error: 'A starting time is required for each day' }),
      }),
      wednesday: z.object({
        selected: z.boolean(),
        startingTime: z.string({ required_error: 'A starting time is required for each day' }),
        endingTime: z.string({ required_error: 'A starting time is required for each day' }),
      }),
      thursday: z.object({
        selected: z.boolean(),
        startingTime: z.string({ required_error: 'A starting time is required for each day' }),
        endingTime: z.string({ required_error: 'A starting time is required for each day' }),
      }),
      friday: z.object({
        selected: z.boolean(),
        startingTime: z.string({ required_error: 'A starting time is required for each day' }),
        endingTime: z.string({ required_error: 'A starting time is required for each day' }),
      }),
      saturday: z.object({
        selected: z.boolean(),
        startingTime: z.string({ required_error: 'A starting time is required for each day' }),
        endingTime: z.string({ required_error: 'A starting time is required for each day' }),
      }),
      sunday: z.object({
        selected: z.boolean(),
        startingTime: z.string({ required_error: 'A starting time is required for each day' }),
        endingTime: z.string({ required_error: 'A starting time is required for each day' }),
      }),
    }),
    repeat: z.enum(['none', 'weekly']),
    endDate: z.preprocess((arg) => {
      if (typeof arg == 'string' || arg instanceof Date) return new Date(arg);
    }, z.date()),
  }),

  minMonths: z.number({ required_error: 'Minimum stay is required, e.g. 1 month' }),
  rules: z
    .string({ required_error: 'Rules are required' })
    .min(10, { message: 'Must be 10 or more characters long' })
    .max(7000, { message: 'You reached the maximum amount of characters' })
    .nonempty({ message: 'Rules can not be empty' }),
  images: z
    .object({
      file: z.string(),
      id: z.number(),
      s3Id: z.string(),
      name: z.string(),
      size: z.number(),
    })
    .array()
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
    partialSpace: 'full' as FormData['partialSpace'],
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
    facilities: ['Unfurnished'],
    /* STEP 3 */
    hourlyPrice: 0,
    deposit: 0,
    availability: {
      startDate: new Date('2015-03-25'),
      daySlots: {
        monday: {
          selected: false,
          startingTime: '',
          endingTime: '',
        },
        tuesday: {
          selected: false,
          startingTime: '',
          endingTime: '',
        },
        wednesday: {
          selected: false,
          startingTime: '',
          endingTime: '',
        },
        thursday: {
          selected: false,
          startingTime: '',
          endingTime: '',
        },
        friday: {
          selected: false,
          startingTime: '',
          endingTime: '',
        },
        saturday: {
          selected: false,
          startingTime: '',
          endingTime: '',
        },
        sunday: {
          selected: false,
          startingTime: '',
          endingTime: '',
        },
      },
      repeat: 'weekly',
      endDate: new Date(),
    },

    minMonths: 1,
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
    size: 0,
    partialSpace: 'full',
    location: {
      city: 'Berlin',
      country: 'Germany',
      number: 0,
      street: 'Foodlestreet',
      zip: 0,
    },
    /* STEP 2 */
    description: '',
    facilities: ['Unfurnished'],
    stay: {
      hours: 0,
      weeks: 0,
    },
    /* STEP 3 */
    hourlyPrice: 0,
    deposit: 0,
    availability: {
      startDate: new Date(),
      daySlots: {
        monday: {
          selected: false,
          startingTime: '',
          endingTime: '',
        },
        tuesday: {
          selected: false,
          startingTime: '',
          endingTime: '',
        },
        wednesday: {
          selected: false,
          startingTime: '',
          endingTime: '',
        },
        thursday: {
          selected: false,
          startingTime: '',
          endingTime: '',
        },
        friday: {
          selected: false,
          startingTime: '',
          endingTime: '',
        },
        saturday: {
          selected: false,
          startingTime: '',
          endingTime: '',
        },
        sunday: {
          selected: false,
          startingTime: '',
          endingTime: '',
        },
      },
      // startingTimes: ['', '', '', '', '', '', ''],
      // endingTimes: ['', '', '', '', '', '', ''],
      repeat: 'weekly',
      endDate: new Date(),
    },
    minMonths: 1,
    rules: '',
    /* STEP 4 */
    images: [],
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
