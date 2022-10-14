import styles from './PriceLine.module.scss';
interface PriceLineProps {
  label: string;
  text: string;
}
const PriceLine = (props: PriceLineProps) => {
  return (
    <div className={styles['priceLinesContainer']}>
      <div className={styles['priceLineLeft']}>
        <p className="small-text">{props.label}</p>
      </div>
      <div className={styles['priceLineRight']}>
        <p className="small-text">{props.text}</p>
      </div>
    </div>
  );
};

export default PriceLine;
