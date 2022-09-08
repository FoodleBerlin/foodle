import Image from 'next/image';
import PriceLine from '../PriceLine';
import { UploaderImg } from './Step4';
import { useWizardContext } from './Wizard';
import styles from './Wizard.module.scss';

export default function Step5() {
  const wiz = useWizardContext().getValues();
  console.log(JSON.stringify(wiz));

  return (
    <div>
      <div className={styles['step5']}>
        <div className={styles['formItem']}>
          <h2 className={styles['step2__marginHeadline'] + ' header-tertiary'}>Summary</h2>
          <div className="gallery__container">
            <div className="gallery">
              {wiz.images.map((image: UploaderImg, index) => (
                <div key={index} className={'gallery__item gallery__item--' + index}>
                  <Image src={image.url} width={460} height={516} className="gallery__img" alt={'Image ' + index} />
                </div>
              ))}
            </div>
          </div>

          <div className={styles['step5__titleWrapper'] + ' ' + styles['step2__marginHeadline']}>
            <h3 className="header-tertiary">{wiz.title}</h3>
            <div className={styles['step5__flexWrapper']}>
              <p className="body-text">{wiz.hourlyPrice}</p>
              <p className="body-text">€/h</p>
            </div>
          </div>
        </div>
        <div className={styles['formItem']}>
          <h2 className={styles['step2__marginHeadline'] + ' header-tertiary'}>Overview</h2>
          <div className={styles['step5__flexWrapper']}>
            <p className="body-text-secondary">Size -&nbsp; </p>
            <p className="body-text-secondary">{wiz.size}</p>
            <p className="body-text-secondary">&nbsp;square meters</p>
          </div>
          <br />
          <div className={styles['formItem']}>
            <div className={styles['step5__flexWrapper']}>
              <p className='body-text-secondary'>Pickup: - &nbsp;</p>
              <p className="body-text-secondary">{wiz.pickup == "pickup-no" ? "No" : "Yes"}</p>
            </div>
          </div>
          <div className={styles['step5__featureTagWrapper']}>
            {wiz.facilities.map((feature: string) => (
              <span key={feature} className="feature-tag">
                <p>{feature.toUpperCase()}</p>
              </span>
            ))}
          </div>
          <br />
          <p className="small-text">{wiz.description}</p>
          <div className={styles['step5__overview--container']}>
            <Image
              src="/landing-2.jpg"
              width={460}
              height={516}
              className={styles['step5__overview--img']}
              alt="Image 1"
            />
          </div>
        </div>
        <div className={styles['formItem']}>
          <h2 className={styles['step2__marginHeadline'] + ' header-tertiary'}>Pricing</h2>
          <PriceLine label="Rental Fee" text={wiz.hourlyPrice + '€ / hr'} />
          <PriceLine label="Booking Fee" text={wiz.hourlyPrice + '€ / hr'} />
          <PriceLine label="Service Fee" text={wiz.serviceFee + '€'} />
          <PriceLine label="Deposit" text={wiz.deposit + '€'} />
          <PriceLine label="Cancellation Type" text="Full Refund 2 weeks before, partial after." />
        </div>
        <div className={styles['formItem']}>
          <h2 className={styles['step2__marginHeadline'] + ' header-tertiary'}>Rules</h2>
          <p className="small-text">
            {wiz.rules}
          </p>
        </div>
        <div className={styles['formItem']}>
          <h2 className={styles['step2__marginHeadline'] + ' header-tertiary'}>Availability</h2>
          <div className={styles['step5__availabilityGrid']}>
            <div className={styles['step5__availabilityDate']}>
              <p className="small-text">{new Date(wiz.startDate).toLocaleDateString("default", { month: "long" })}</p>
              <p className="small-text">{new Date(wiz.startDate).toLocaleDateString("default", { year: "numeric" })}</p>
              <p className='small-text'>to</p>
              <p className="small-text">{new Date(wiz.endDate).toLocaleDateString("default", { month: "long" })}</p>
              <p className="small-text">{new Date(wiz.endDate).toLocaleDateString("default", { year: "numeric" })}</p>
            </div>
            <div className={styles['step5__bookingFrequency']}>
              <p className='small-text'>Frequency: {wiz.frequency.toString()}</p>
            </div>
            <div className={styles['step5__weekDayCheckboxWrapper--week1'] + ' ' + styles['weekDays__container']}>
              <>{Object.keys(wiz.daySlots).map((day, index) =>
                <>
                  <input type="checkbox" id={"1-weekday-" + day.slice(0, 2)} className={styles['weekDays__checkbox'] + ' weekday'} checked={Object.values(wiz.daySlots)[index].selected} readOnly />
                  <label htmlFor={"1-weekday-" + day.slice(0, 2)}>{day[0].toUpperCase()}</label></>)
              }</>
            </div>
          </div>
        </div>
        <div className={styles['step5__thingsToKnowContainer']}></div>
      </div>
    </div>
  );
}
