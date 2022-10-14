import ListingsOverview from '../..//Listing/ListingOverview';
import { useWizardContext } from './Wizard';
export default function Step5() {
  const wiz = useWizardContext().getValues();
  return <ListingsOverview hideSidebar={true} owner="" handle={""} listingsData={wiz} />
}
