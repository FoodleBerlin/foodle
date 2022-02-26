import React, { useContext, useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import styles from './Wizard.module.scss';

export default function Wizard() {
  const wizardContext = useWizardContext();
  console.log(wizardContext.step);
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

type WizardContext = {
  step: number;
  nextStep: (currentStep: number) => void;
  submitForm: (formData: any) => void;
  previousStep: (currentStep: number) => void;
};
const WizardContext = React.createContext<WizardContext>({
  step: 1,
  nextStep: () => {},
  previousStep: () => {},
  submitForm: () => {},
});

export const WizardProvider = ({ children }: any) => {
  const [step, setStep] = useState<number>(1);
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
    <WizardContext.Provider value={{ step, nextStep, previousStep, submitForm }}>{children}</WizardContext.Provider>
  );
};

export function useWizardContext() {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('Component not wrapped by provider');
  }
  return context;
}
