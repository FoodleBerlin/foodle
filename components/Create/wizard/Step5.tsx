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
          <h2 className={styles['step2__marginHeadline'] + ' header-secondary'}>Summary</h2>
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
            <h3 className="header-secondary">Industrial Grade Kitchen in Mitte</h3>
            <div className={styles['step5__flexWrapper']}>
              <p className="body-text">{wiz.hourlyPrice}</p>
              <p className="body-text">€/h</p>
            </div>
          </div>
        </div>
        <div className={styles['formItem']}>
          <h2 className={styles['step2__marginHeadline'] + ' header-secondary'}>Overview</h2>
          <div className={styles['step5__flexWrapper']}>
            <p className="body-text-secondary">Size -&nbsp; </p>
            <p className="body-text-secondary">{wiz.size}</p>
            <p className="body-text-secondary">&nbsp;square meters</p>
          </div>
          <br />
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
          <h2 className={styles['step2__marginHeadline'] + ' header-secondary'}>Pricing</h2>
          <PriceLine label="Rental Fee" text={wiz.hourlyPrice + '€ / hr'} />
          <PriceLine label="Booking Fee" text={wiz.hourlyPrice + '€ / hr'} />
          <PriceLine label="Service Fee" text="0€" />
          <PriceLine label="Deposit" text={wiz.deposit + '€'} />
          <PriceLine label="Cancellation Type" text="Full Refund 2 weeks before, partial after." />
        </div>
        <div className={styles['formItem']}>
          <h2 className={styles['step2__marginHeadline'] + ' header-secondary'}>Rules</h2>
          <p className="small-text">
            No smoking on property. <br /> <br />
            Multiple people allowed. <br /> <br />
            Cleaning after mandatory. <br /> <br />
            Full day book only. <br /> <br />
            Pick up spot offered. <br />
          </p>
        </div>
        <div className={styles['formItem']}>
          <h2 className={styles['step2__marginHeadline'] + ' header-secondary'}>Availability</h2>
          <div className={styles['step5__availabilityGrid']}>
            <div className={styles['step5__availabilityDate']}>
              <p className="small-text">March</p>
              <p className="small-text">2022</p>
            </div>

            <div className={styles['step5__nextMonthButton']}>
              <button className="flat-btn">&lt; PREVIOUS MONTH</button>
              <button className="flat-btn">NEXT MONTH &gt;</button>
            </div>
            <div className={styles['step5__weekDayCheckboxWrapper--week1'] + ' ' + styles['weekDays__container']}>
              <input type="checkbox" id="1-weekday-mon" className={styles['weekDays__checkbox'] + ' weekday'} />
              <label htmlFor="1-weekday-mon">M</label>
              <input type="checkbox" id="1-weekday-tue" className={styles['weekDays__checkbox'] + ' weekday'} />
              <label htmlFor="1-weekday-tue">T</label>
              <input type="checkbox" id="1-weekday-wed" className={styles['weekDays__checkbox'] + ' weekday'} />
              <label htmlFor="1-weekday-wed">W</label>
              <input type="checkbox" id="1-weekday-thu" className={styles['weekDays__checkbox'] + ' weekday'} />
              <label htmlFor="1-weekday-thu">T</label>
              <input type="checkbox" id="1-weekday-fri" className={styles['weekDays__checkbox'] + ' weekday'} />
              <label htmlFor="1-weekday-fri">F</label>
              <input type="checkbox" id="1-weekday-sat" className={styles['weekDays__checkbox'] + ' weekday'} />
              <label htmlFor="1-weekday-sat">S</label>
              <input type="checkbox" id="1-weekday-sun" className={styles['weekDays__checkbox'] + ' weekday'} />
              <label htmlFor="1-weekday-sun">S</label>
            </div>
            <div className={styles['step5__weekDayCheckboxWrapper--week2'] + ' ' + styles['weekDays__container']}>
              <input type="checkbox" id="2-weekday-mon" className={styles['weekDays__checkbox'] + ' weekday'} />
              <label htmlFor="2-weekday-mon">M</label>
              <input type="checkbox" id="2-weekday-tue" className={styles['weekDays__checkbox'] + ' weekday'} />
              <label htmlFor="2-weekday-tue">T</label>
              <input type="checkbox" id="2-weekday-wed" className={styles['weekDays__checkbox'] + ' weekday'} />
              <label htmlFor="2-weekday-wed">W</label>
              <input type="checkbox" id="2-weekday-thu" className={styles['weekDays__checkbox'] + ' weekday'} />
              <label htmlFor="2-weekday-thu">T</label>
              <input type="checkbox" id="2-weekday-fri" className={styles['weekDays__checkbox'] + ' weekday'} />
              <label htmlFor="2-weekday-fri">F</label>
              <input type="checkbox" id="2-weekday-sat" className={styles['weekDays__checkbox'] + ' weekday'} />
              <label htmlFor="2-weekday-sat">S</label>
              <input type="checkbox" id="2-weekday-sun" className={styles['weekDays__checkbox'] + ' weekday'} />
              <label htmlFor="2-weekday-sun">S</label>
            </div>
            <div className={styles['step5__weekDayCheckboxWrapper--week3'] + ' ' + styles['weekDays__container']}>
              <input type="checkbox" id="3-weekday-mon" className={styles['weekDays__checkbox'] + ' weekday'} />
              <label htmlFor="3-weekday-mon">M</label>
              <input type="checkbox" id="3-weekday-tue" className={styles['weekDays__checkbox'] + ' weekday'} />
              <label htmlFor="3-weekday-tue">T</label>
              <input type="checkbox" id="3-weekday-wed" className={styles['weekDays__checkbox'] + ' weekday'} />
              <label htmlFor="3-weekday-wed">W</label>
              <input type="checkbox" id="3-weekday-thu" className={styles['weekDays__checkbox'] + ' weekday'} />
              <label htmlFor="3-weekday-thu">T</label>
              <input type="checkbox" id="3-weekday-fri" className={styles['weekDays__checkbox'] + ' weekday'} />
              <label htmlFor="3-weekday-fri">F</label>
              <input type="checkbox" id="3-weekday-sat" className={styles['weekDays__checkbox'] + ' weekday'} />
              <label htmlFor="3-weekday-sat">S</label>
              <input type="checkbox" id="3-weekday-sun" className={styles['weekDays__checkbox'] + ' weekday'} />
              <label htmlFor="3-weekday-sun">S</label>
            </div>
            <div className={styles['step5__weekDayCheckboxWrapper--week4'] + ' ' + styles['weekDays__container']}>
              <input type="checkbox" id="4-weekday-mon" className={styles['weekDays__checkbox'] + ' weekday'} />
              <label htmlFor="4-weekday-mon">M</label>
              <input type="checkbox" id="4-weekday-tue" className={styles['weekDays__checkbox'] + ' weekday'} />
              <label htmlFor="4-weekday-tue">T</label>
              <input type="checkbox" id="4-weekday-wed" className={styles['weekDays__checkbox'] + ' weekday'} />
              <label htmlFor="4-weekday-wed">W</label>
              <input type="checkbox" id="4-weekday-thu" className={styles['weekDays__checkbox'] + ' weekday'} />
              <label htmlFor="4-weekday-thu">T</label>
              <input type="checkbox" id="4-weekday-fri" className={styles['weekDays__checkbox'] + ' weekday'} />
              <label htmlFor="4-weekday-fri">F</label>
              <input type="checkbox" id="4-weekday-sat" className={styles['weekDays__checkbox'] + ' weekday'} />
              <label htmlFor="4-weekday-sat">S</label>
              <input type="checkbox" id="4-weekday-sun" className={styles['weekDays__checkbox'] + ' weekday'} />
              <label htmlFor="4-weekday-sun">S</label>
            </div>
            <div className={styles['step5__weekDayCheckboxWrapper--week5'] + ' ' + styles['weekDays__container']}>
              <input type="checkbox" id="5-weekday-mon" className={styles['weekDays__checkbox'] + ' weekday'} />
              <label htmlFor="5-weekday-mon">M</label>
              <input type="checkbox" id="5-weekday-tue" className={styles['weekDays__checkbox'] + ' weekday'} />
              <label htmlFor="5-weekday-tue">T</label>
              <input type="checkbox" id="5-weekday-wed" className={styles['weekDays__checkbox'] + ' weekday'} />
              <label htmlFor="5-weekday-wed">W</label>
              <input type="checkbox" id="5-weekday-thu" className={styles['weekDays__checkbox'] + ' weekday'} />
              <label htmlFor="5-weekday-thu">T</label>
              <input type="checkbox" id="5-weekday-fri" className={styles['weekDays__checkbox'] + ' weekday'} />
              <label htmlFor="5-weekday-fri">F</label>
              <input type="checkbox" id="5-weekday-sat" className={styles['weekDays__checkbox'] + ' weekday'} />
              <label htmlFor="5-weekday-sat">S</label>
              <input type="checkbox" id="5-weekday-sun" className={styles['weekDays__checkbox'] + ' weekday'} />
              <label htmlFor="5-weekday-sun">S</label>
            </div>
          </div>
        </div>
        <div className={styles['step5__thingsToKnowContainer']}></div>
      </div>
    </div>
  );
}
