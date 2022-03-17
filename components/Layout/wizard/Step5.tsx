import { useWizardContext } from './Wizard';

export default function Step5() {
  const wizardContext = useWizardContext();
  console.log(JSON.stringify(wizardContext.getValues()));

  return (
    <div>
      <h1>Landlord component flow 5</h1>
    </div>
  );
}
