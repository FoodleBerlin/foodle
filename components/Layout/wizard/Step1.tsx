import { useWizardContext } from '../../../pages/create';

export default function Step1() {
  const wizardContext = useWizardContext();
  return (
    <div>
      <h1>Landlord component flow 1</h1>
      <button onClick={() => wizardContext.nextStep(1)}>next</button>
    </div>
  );
}
