import styles from '../Listing/ListingOverview.module.scss';
interface PriceLineProps {
  label: string;
  text: string;
}
const PriceLine = (props: PriceLineProps) => {
  return (
    <div className={styles['listingoverview__priceLinesContainer']}>
      <div className={styles['listingoverview__priceLineLeft']}>
        <p className="small-text">{props.label}</p>
      </div>
      <div className={styles['listingoverview__priceLineRight']}>
        <p className="small-text">{props.text}</p>
      </div>
    </div>
  );
};

export default PriceLine;
