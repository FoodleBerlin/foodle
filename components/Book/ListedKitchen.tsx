import React from 'react';
import Image from 'next/image';
import styles from '../Create/wizard/Wizard.module.scss';
import PriceLine from '../Create/PriceLine';
import { UploaderImage } from '../Create/wizard/Step4';

/*
TO-DO:
- Show the images:
  - I need to get the images from the server, but I don't know how to do that yet.
- Make availability dynamic with props 
*/

interface ListedKitchenProps {
  title: string;
  images: string[];
  isVerified: boolean;
  hourlyPrice: number;
  size: number;
  facilities: string[];
  description: string;
  deposit: number;
  rules: string[];
  availability: object;
  partialSpace: boolean;
  street: string;
  streetNumber: number;
  city: string;
  zip: number;
}

const ListedKitchen = (props: ListedKitchenProps) => {
  const month = new Date(props.availability.startDate).toLocaleString('default', { month: 'long' });
  console.log(month);

  return (
    <div>
      <div className={styles['step5']}>
        <div className={styles['formItem']}>
          <h2 className={styles['step2__marginHeadline'] + ' header-tertiary'}>Summary</h2>
          <div className="gallery__container">
            <div className="gallery">
              {/*               {props.images.map((image: UploaderImage, index) => (
                <div key={index} className={'gallery__item gallery__item--' + index}>
                  <Image src={image.file} width={460} height={516} className="gallery__img" alt={'Image ' + index} />
                </div>
              ))} */}
            </div>
          </div>

          <div className={styles['step5__titleWrapper'] + ' ' + styles['step2__marginHeadline']}>
            <h3 className="header-tertiary">{props.title}</h3>
            <div className={styles['step5__flexWrapper']}>
              <p className="body-text">{props.hourlyPrice}</p>
              <p className="body-text">€/h</p>
            </div>
          </div>
        </div>
        <div className={styles['formItem']}>
          <h2 className={styles['step2__marginHeadline'] + ' header-tertiary'}>Overview</h2>
          <div className={styles['step5__flexWrapper']}>
            <p className="body-text-secondary">Size -&nbsp; </p>
            <p className="body-text-secondary">{props.size}</p>
            <p className="body-text-secondary">&nbsp;square meters</p>
          </div>
          <br />
          <div className={styles['step5__featureTagWrapper']}>
            {props.facilities.map((feature: string) => (
              <span key={feature} className="feature-tag">
                <p>{feature.toUpperCase()}</p>
              </span>
            ))}
          </div>
          <br />
          <p className="small-text">{props.description}</p>
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
          <PriceLine label="Rental Fee" text={props.hourlyPrice + '€ / hr'} />
          <PriceLine label="Booking Fee" text={props.hourlyPrice + '€ / hr'} />
          <PriceLine label="Service Fee" text="0€" />
          <PriceLine label="Deposit" text={props.deposit + '€'} />
          <PriceLine label="Cancellation Type" text="Full Refund 2 weeks before, partial after." />
        </div>
        <div className={styles['formItem']}>
          <h2 className={styles['step2__marginHeadline'] + ' header-tertiary'}>Rules</h2>
          <p className="small-text">
            {props.rules}
            <br /> <br />
          </p>
        </div>
        <div className={styles['formItem']}>
          <h2 className={styles['step2__marginHeadline'] + ' header-tertiary'}>Availability</h2>
          <div className={styles['step5__availabilityGrid']}>
            <div className={styles['step5__availabilityDate']}>
              <p className="small-text">{month}</p>
              <p className="small-text">{new Date(props.availability.startDate).getFullYear()}</p>
            </div>

            <div className={styles['step5__nextMonthButton']}>
              <button className="flat-btn">&lt; PREVIOUS MONTH</button>
              <button className="flat-btn">NEXT MONTH &gt;</button>
            </div>
            <div className={styles['step5__weekDayCheckboxWrapper--week1'] + ' ' + styles['weekDays__container']}>
              <input
                type="checkbox"
                checked={true}
                id="1-weekday-mon"
                className={styles['weekDays__checkbox'] + ' weekday'}
              />
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
          </div>
        </div>
        <div className={styles['step5__thingsToKnowContainer']}></div>
      </div>
    </div>
  );
};

export default ListedKitchen;
