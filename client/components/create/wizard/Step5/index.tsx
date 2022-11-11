import ListingsOverview from '../../../listing/ListingOverview';
import { useWizardContext } from '../Wizard';
export default function Step5() {
  const wiz = useWizardContext().getValues();
  return <ListingsOverview listingsData={{ ...wiz, images: wiz.images.map((img) => img.url), endDate: wiz.endDate.toISOString(), startDate: wiz.startDate.toISOString(), rules: wiz.rules.split("."), pickup: wiz.pickup === "pickup-yes" ? true : false, serviceFee: wiz.serviceFee ?? 10.0 as number, deposit: wiz.deposit ?? 100.0, handle: "", hideSidebar: false }} />
}
