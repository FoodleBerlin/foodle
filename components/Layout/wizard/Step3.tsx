import { useWizardContext } from '../../../pages/create';

export default function Step3() {
  const wizardContext = useWizardContext();

  return (
    <div>
      <h1>Landlord component flow 3</h1>
      <button onClick={() => wizardContext.previousStep(3)}>previous</button>
      <button onClick={() => wizardContext.nextStep(3)}>next</button>
    </div>
  );
}
