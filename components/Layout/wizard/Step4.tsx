import { useWizardContext } from './Wizard';

export default function Step4() {
  const wizardContext = useWizardContext();

  return (
    <div>
      <h1>Landlord component flow 4</h1>
      <button onClick={() => wizardContext.previousStep(4)}>previous</button>
      <button onClick={() => wizardContext.nextStep(4)}>next</button>
    </div>
  );
}
