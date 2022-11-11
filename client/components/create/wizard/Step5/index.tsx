import ListingsOverview from '../../../listing/ListingOverview';
import { useWizardContext } from '../Wizard';
export default function Step5() {
  const wiz = useWizardContext().getValues();
  //There are some odd work arounds here, will need to address them later on
  return <ListingsOverview listingsData={{ ...wiz, images: wiz.images.map((img) => img.url), endDate: new Date(wiz.endDate).getTime().toString(), startDate: new Date(wiz.startDate).getTime().toString(), rules: wiz.rules.split("."), pickup: wiz.pickup === "pickup-yes" ? true : false, serviceFee: wiz.serviceFee ?? 10.0 as number, deposit: wiz.deposit ?? 100.0, handle: "", hideSidebar: true, owner: "" }} />
}
