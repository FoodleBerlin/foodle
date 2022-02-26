import { useWizardContext } from '../../../pages/create';

export default function Step5() {
  const wizardContext = useWizardContext();

  return (
    <div>
      <h1>Landlord component flow 5</h1>
      <button onClick={() => wizardContext.previousStep(5)}>previous</button>
    </div>
  );
}
