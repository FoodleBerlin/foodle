import { prisma } from '@prisma/client';
import { useEffect } from 'react';
import { CreateListing } from '../../../codegen/createListing';
import Image from 'next/image';
import { useWizardContext } from './Wizard';
import client from '../../../client';
import { AuthenticatedProps } from '../../../pages/account';
import { DaySlot } from './Step3';
import styles from './Wizard.module.scss';

export default function Step5(props: AuthenticatedProps) {
  const { getValues } = useWizardContext();

  const handleSubmit = async () => {
    const wiz = getValues();

    const selectedDaySlots: DaySlot[] = [];
    useEffect(() => {
      const slots = wiz.availability.daySlots;
      if (slots.monday.selected) {
        selectedDaySlots.push(slots.monday);
      }
      if (slots.tuesday.selected) {
        selectedDaySlots.push(slots.tuesday);
      }
      if (slots.wednesday.selected) {
        selectedDaySlots.push(slots.wednesday);
      }
      if (slots.thursday.selected) {
        selectedDaySlots.push(slots.thursday);
      }
      if (slots.friday.selected) {
        selectedDaySlots.push(slots.friday);
      }
      if (slots.saturday.selected) {
        selectedDaySlots.push(slots.saturday);
      }
      if (slots.sunday.selected) {
        selectedDaySlots.push(slots.sunday);
      }
    });

    const res = await client.mutate({
      mutation: CreateListing,
      variables: {
        size: Number(wiz.size), // store as int instead
        ownerId: props.session.id,
        street: wiz.location.street,
        streetNumber: Number(wiz.location.number),
        zip: Number(wiz.location.zip),
        city: wiz.location.city,
        description: wiz.description,
        rules: wiz.rules.split('.'),
        hourlyPrice: Number(wiz.rent),
        facilities: wiz.features,
        deposit: Number(wiz.deposit),
        images: wiz.images,
        minStayHours: 0,
        minStayWeeks: 0,
        pickup: false,
        serviceFee: Number(0),
        partialSpace: wiz.partialSpace === 'partial' ? true : false,
        availabilities: {
          startDate: new Date(wiz.availability.startDate).toISOString(),
          endDate: new Date(wiz.availability.endDate).toISOString(),
          repeats: wiz.availability.repeat,
          genericDaySlots: selectedDaySlots,
          minimumMonth: Number(wiz.minMonths),
          frequency: wiz.availability.repeat,
        },
      },
    });

    console.log({ res });
  };

  return (
    <div>
      <div className={styles['step5']}>
        <div className={styles['formItem']}>
          <h2 className={styles['step2__marginHeadline'] + ' header-tertiary'}>Summary</h2>
          <div className="gallery__container">
            <div className="gallery">
              <div className="gallery__item gallery__item--1">
                <Image src="/carousel-image-2.png" width={460} height={516} className="gallery__img" alt="Image 1" />
              </div>
              <div className="gallery__item gallery__item--2">
                <Image src="/carousel-image-2.png" width={460} height={516} className="gallery__img" alt="Image 2" />
              </div>
              <div className="gallery__item gallery__item--3">
                <Image src="/carousel-image-2.png" width={460} height={516} className="gallery__img" alt="Image 3" />
              </div>
              <div className="gallery__item gallery__item--4">
                <Image src="/carousel-image-2.png" width={460} height={516} className="gallery__img" alt="Image 4" />
              </div>
            </div>
          </div>

          <div className={styles['step5__titleWrapper'] + ' ' + styles['step2__marginHeadline']}>
            <h3 className="header-tertiary">Industrial Grade Kitchen in Mitte</h3>
            <div className={styles['step5__flexWrapper']}>
              <p className="body-text">100</p>
              <p className="body-text">€/h</p>
            </div>
          </div>
        </div>
        <div className={styles['formItem']}>
          <h2 className={styles['step2__marginHeadline'] + ' header-tertiary'}>Overview</h2>
          <div className={styles['step5__flexWrapper']}>
            <p className="body-text-secondary">Size -&nbsp; </p>
            <p className="body-text-secondary"> 90</p>
            <p className="body-text-secondary">&nbsp;square meters</p>
          </div>
          <br />
          <div className={styles['step5__featureTagWrapper']}>
            <span className="feature-tag">
              <p>WASHER</p>
            </span>
            <span className="feature-tag">
              <p>STOREFRONT</p>
            </span>
            <span className="feature-tag">
              <p>ELEVATOR</p>{' '}
            </span>
            <span className="feature-tag">
              <p>OVEN</p>
            </span>
          </div>
          <br />
          <p className="small-text">
            This property is really perfect for one or two chefs. It belongs to an ice cream shop owner and they close
            during the winter. This place is perfect for chefs or bakers that also want to use the property as a store
            front pick up spot. This property is really perfect for one or two chefs. It belongs to an ice cream shop
            owner and they close during the winter. This place is perfect for chefs or bakers that also want to use the
            property as a store front pick up spot.
          </p>
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
          <div className={styles['step5__priceLinesContainer']}>
            <div className={styles['step5__priceLineLeft']}>
              <p className="small-text">Rental Fee</p>
            </div>
            <div className={styles['step5__priceLineRight']}>
              <p className="small-text">90€ / hr</p>
            </div>
          </div>
          <div className={styles['step5__priceLinesContainer']}>
            <div className={styles['step5__priceLineLeft']}>
              <p className="small-text">Booking Fee</p>
            </div>
            <div className={styles['step5__priceLineRight']}>
              <p className="small-text">100€</p>
            </div>
          </div>
          <div className={styles['step5__priceLinesContainer']}>
            <div className={styles['step5__priceLineLeft']}>
              <p className="small-text">Service Fee</p>
            </div>
            <div className={styles['step5__priceLineRight']}>
              <p className="small-text">0€</p>
            </div>
          </div>
          <div className={styles['step5__priceLinesContainer']}>
            <div className={styles['step5__priceLineLeft']}>
              <p className="small-text">Deposit</p>
            </div>
            <div className={styles['step5__priceLineRight']}>
              <p className="small-text">400€</p>
            </div>
          </div>
          <div className={styles['step5__priceLinesContainer']}>
            <div className={styles['step5__priceLineLeft']}>
              <p className="small-text">Cancellation Type</p>
            </div>
            <div className={styles['step5__priceLineRight']}>
              <p className="small-text">90€ / hr</p>
            </div>
          </div>
          <div className={styles['step5__priceLinesContainer']}>
            <div className={styles['step5__priceLineLeft']}>
              <p className="small-text">Deposit</p>
            </div>
            <div className={styles['step5__priceLineRight']}>
              <p className="small-text">Full refund before 1 week</p>
            </div>
          </div>
        </div>
        <div className={styles['formItem']}>
          <h2 className={styles['step2__marginHeadline'] + ' header-tertiary'}>Rules</h2>
          <p className="small-text">
            No smoking on property. <br /> <br />
            Multiple people allowed. <br /> <br />
            Cleaning after mandatory. <br /> <br />
            Full day book only. <br /> <br />
            Pick up spot offered. <br />
          </p>
        </div>
        <div className={styles['formItem']}>
          <h2 className={styles['step2__marginHeadline'] + ' header-tertiary'}>Availability</h2>
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
