import styles from '../Create/wizard/Wizard.module.scss';
interface PriceLineProps {
  label: string;
  text: string;
}
const PriceLine = (props: PriceLineProps) => {
  return (
    <div className={styles['step5__priceLinesContainer']}>
      <div className={styles['step5__priceLineLeft']}>
        <p className="small-text">{props.label}</p>
      </div>
      <div className={styles['step5__priceLineRight']}>
        <p className="small-text">{props.text}</p>
      </div>
    </div>
  );
};

export default PriceLine;
