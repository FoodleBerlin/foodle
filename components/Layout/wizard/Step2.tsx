import { useWizardContext } from '../../../pages/create';

export default function Step2() {
  const wizardContext = useWizardContext();

  return (
    <div>
      <h1>Landlord component flow 2</h1>
      <button onClick={() => wizardContext.previousStep(2)}>previous</button>
      <button onClick={() => wizardContext.nextStep(2)}>next</button>
    </div>
  );
}
