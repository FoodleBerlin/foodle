import ListingsOverview from '../..//Listing/ListingOverview';
import { useWizardContext } from './Wizard';
export default function Step5() {
  const wiz = useWizardContext().getValues();
  //console.log(JSON.stringify(wiz));
  return <ListingsOverview listingsData={wiz} />
}
