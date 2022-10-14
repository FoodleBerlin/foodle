import styles from './PriceLine.module.scss';
interface PriceLineProps {
  label: string;
  text: string;
}
const PriceLine = (props: PriceLineProps) => {
  return (
    <div className={styles['priceLine']}>
      <div className={styles['priceLine__left']}>
        <p className="small-text">{props.label}</p>
      </div>
      <div className={styles['priceLine__right']}>
        <p className="small-text">{props.text}</p>
      </div>
    </div>
  );
};

export default PriceLine;
