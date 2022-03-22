import { useEffect, useState } from 'react';
import { FormData, useWizardContext } from './Wizard';
import styles from './Wizard.module.scss';

export type DaySlot = {
  selected: boolean;
  startingTime: string;
  endingTime: string;
};
export const shouldValidate = {
  shouldTouch: true,
  shouldDirty: true,
  shouldValidate: true,
};
export default function Step3() {
  const { formState, nextStep, register, setValue } = useWizardContext();
  const wizardContext = useWizardContext();
  const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } =
    wizardContext.getValues().availability.daySlots;

  console.log(JSON.stringify(wizardContext.getValues()));

  const toggleDay = (day: string) => {
    switch (day) {
      case 'Monday':
        setValue(
          'availability.daySlots.monday.selected',
          !monday.selected as FormData['availability']['daySlots']['monday']['selected'],
          shouldValidate
        );
        break;
      case 'Tuesday':
        setValue(
          'availability.daySlots.tuesday.selected',
          !tuesday.selected as FormData['availability']['daySlots']['tuesday']['selected'],
          shouldValidate
        );
        break;
      case 'Wednesday':
        setValue(
          'availability.daySlots.wednesday.selected',
          !wednesday.selected as FormData['availability']['daySlots']['wednesday']['selected'],
          shouldValidate
        );
        break;
      case 'Thursday':
        setValue(
          'availability.daySlots.thursday.selected',
          !thursday.selected as FormData['availability']['daySlots']['thursday']['selected'],
          shouldValidate
        );
        break;
      case 'Friday':
        setValue(
          'availability.daySlots.friday.selected',
          !friday.selected as FormData['availability']['daySlots']['friday']['selected'],
          shouldValidate
        );
        break;
      case 'Saturday':
        setValue(
          'availability.daySlots.saturday.selected',
          !saturday.selected as FormData['availability']['daySlots']['saturday']['selected'],
          shouldValidate
        );
        break;
      case 'Sunday':
        setValue(
          'availability.daySlots.sunday.selected',
          !sunday.selected as FormData['availability']['daySlots']['sunday']['selected'],
          shouldValidate
        );
        break;
    }
  };
  const setDayStartingTime = (day: string, startingTime: string) => {
    switch (day) {
      case 'Monday':
        setValue(
          'availability.daySlots.monday.startingTime',
          startingTime as FormData['availability']['daySlots']['monday']['startingTime'],
          shouldValidate
        );
        break;
      case 'Tuesday':
        setValue(
          'availability.daySlots.tuesday.startingTime',
          startingTime as FormData['availability']['daySlots']['tuesday']['startingTime'],
          shouldValidate
        );
        break;
      case 'Wednesday':
        setValue(
          'availability.daySlots.wednesday.startingTime',
          startingTime as FormData['availability']['daySlots']['wednesday']['startingTime'],
          shouldValidate
        );
        break;
      case 'Thursday':
        setValue(
          'availability.daySlots.thursday.startingTime',
          startingTime as FormData['availability']['daySlots']['thursday']['startingTime'],
          shouldValidate
        );
        break;
      case 'Friday':
        setValue(
          'availability.daySlots.friday.startingTime',
          startingTime as FormData['availability']['daySlots']['friday']['startingTime'],
          shouldValidate
        );
        break;
      case 'Saturday':
        setValue(
          'availability.daySlots.saturday.startingTime',
          startingTime as FormData['availability']['daySlots']['saturday']['startingTime'],
          shouldValidate
        );
        break;
      case 'Sunday':
        setValue(
          'availability.daySlots.sunday.startingTime',
          startingTime as FormData['availability']['daySlots']['sunday']['startingTime'],
          shouldValidate
        );
        break;
    }
  };
  const setDayEndingTime = (day: string, endingTime: string) => {
    switch (day) {
      case 'Monday':
        setValue(
          'availability.daySlots.monday.endingTime',
          endingTime as FormData['availability']['daySlots']['monday']['endingTime'],
          shouldValidate
        );
        break;
      case 'Tuesday':
        setValue(
          'availability.daySlots.tuesday.endingTime',
          endingTime as FormData['availability']['daySlots']['tuesday']['endingTime'],
          shouldValidate
        );
        break;
      case 'Wednesday':
        setValue(
          'availability.daySlots.wednesday.endingTime',
          endingTime as FormData['availability']['daySlots']['wednesday']['endingTime'],
          shouldValidate
        );
        break;
      case 'Thursday':
        setValue(
          'availability.daySlots.thursday.endingTime',
          endingTime as FormData['availability']['daySlots']['thursday']['endingTime'],
          shouldValidate
        );
        break;
      case 'Friday':
        setValue(
          'availability.daySlots.friday.endingTime',
          endingTime as FormData['availability']['daySlots']['friday']['endingTime'],
          shouldValidate
        );
        break;
      case 'Saturday':
        setValue(
          'availability.daySlots.saturday.endingTime',
          endingTime as FormData['availability']['daySlots']['saturday']['endingTime'],
          shouldValidate
        );
        break;
      case 'Sunday':
        setValue(
          'availability.daySlots.sunday.endingTime',
          endingTime as FormData['availability']['daySlots']['sunday']['endingTime'],
          shouldValidate
        );
        break;
    }
  };

  return (
    <div className={styles['step3']}>
      <div className={styles['formItem']}>
        <h2 className={styles['step2__marginHeadline'] + ' header-tertiary'}>How much is rent?</h2>
        <div className={styles['step3__flexWrapper']}>
          <input
            className={styles['step3__shortInput'] + ' standard-form'}
            type="number"
            id="rent"
            {...register('rent')}
            onChange={(c) =>
              setValue('rent', parseInt(c.target.value), {
                shouldTouch: true,
                shouldDirty: true,
                shouldValidate: true,
              })
            }
          ></input>
          <label htmlFor={'rent'} className="body-text-secondary">
            € per hour
          </label>
        </div>
        {formState.errors.rent && <span className={styles['error']}>{formState.errors.rent.message}</span>}
      </div>
      <div className={styles['formItem']}>
        <h2 className={styles['step2__marginHeadline'] + ' header-tertiary'}>Is there a deposit?</h2>
        <p className="body-text-secondary">
          This one time payment will be refunded at the end of the lease. If there is no deposit just type in 0.
        </p>
        <div className={styles['step3__flexWrapper']}>
          <input
            className={styles['step3__shortInput'] + ' standard-form'}
            type="number"
            {...register('deposit')}
            onChange={(c) =>
              setValue('deposit', parseInt(c.target.value), {
                shouldTouch: true,
                shouldDirty: true,
                shouldValidate: true,
              })
            }
          ></input>
          <label className="body-text-secondary">€</label>
        </div>
        {formState.errors.deposit && <span className={styles['error']}>{formState.errors.deposit.message}</span>}
      </div>
      <div className={styles['formItem time-container']}>
        <h2 className={styles['step2__marginHeadline'] + ' header-tertiary'}>When is it available?</h2>
        <label className="label-text">Starting</label> <br />
        <input
          className="standard-form"
          type="date"
          {...register('availability.startDate')}
          onChange={(c) => {
            console.log(c.target.value);
            setValue('availability.startDate', c.target.value as any, {
              shouldTouch: true,
              shouldDirty: true,
              shouldValidate: true,
            });
          }}
        ></input>
        {formState.errors.availability?.startDate && (
          <span className={styles['error']}>{formState.errors.availability?.startDate.message}</span>
        )}
        {/* <--------- DAYS OF WEEK INPUTS ---------> */}
        <div className={styles['step3__weekDaysSelector']}>
          <div className={styles['step3__daysOfWeek']}>
            <label className="label-text">Days of week</label>
            <div className={styles['step3__weekDayCheckboxWrapper']}>
              <input
                {...register('availability.daySlots.monday.selected')}
                type="checkbox"
                id="weekday-mon"
                value="Monday"
                className={styles['step3__weekDayCheckbox'] + ' weekday'}
                onChange={(c) => toggleDay(c.target.value)}
              />
              <label htmlFor="weekday-mon">M</label>
              <input
                {...register('availability.daySlots.tuesday.selected')}
                type="checkbox"
                id="weekday-tue"
                value="Tuesday"
                className={styles['step3__weekDayCheckbox'] + ' weekday'}
                onChange={(c) => toggleDay(c.target.value)}
              />
              <label htmlFor="weekday-tue">T</label>
              <input
                {...register('availability.daySlots.wednesday.selected')}
                type="checkbox"
                id="weekday-wed"
                value="Wednesday"
                className={styles['step3__weekDayCheckbox'] + ' weekday'}
                onChange={(c) => toggleDay(c.target.value)}
              />
              <label htmlFor="weekday-wed">W</label>
              <input
                {...register('availability.daySlots.thursday.selected')}
                type="checkbox"
                id="weekday-thu"
                value="Thursday"
                className={styles['step3__weekDayCheckbox'] + ' weekday'}
                onChange={(c) => toggleDay(c.target.value)}
              />
              <label htmlFor="weekday-thu">T</label>
              <input
                {...register('availability.daySlots.friday.selected')}
                type="checkbox"
                id="weekday-fri"
                value="Friday"
                className={styles['step3__weekDayCheckbox'] + ' weekday'}
                onChange={(c) => toggleDay(c.target.value)}
              />
              <label htmlFor="weekday-fri">F</label>
              <input
                {...register('availability.daySlots.saturday.selected')}
                type="checkbox"
                id="weekday-sat"
                value="Saturday"
                className={styles['step3__weekDayCheckbox'] + ' weekday'}
                onChange={(c) => toggleDay(c.target.value)}
              />
              <label htmlFor="weekday-sat">S</label>
              <input
                {...register('availability.daySlots.sunday.selected')}
                type="checkbox"
                id="weekday-sun"
                value="Sunday"
                className={styles['step3__weekDayCheckbox'] + ' weekday'}
                onChange={(c) => toggleDay(c.target.value)}
              />
              <label htmlFor="weekday-sun">S</label>
            </div>
            {/* {formState.errors.availability?.days && (
              <span className={styles['error']}>{formState.errors.availability.days.map((e) => e.message)}</span>
            )} */}
          </div>

          {/* <--------- TIME INPUTS ---------> */}

          <div className={styles['step3__timeInput']}>
            {monday.selected && (
              <span className={styles['step3__timeInputWrapper']}>
                <input type="checkbox" checked id="time-mon" className="weekday" />
                <label htmlFor="time-mon">M</label>
                <input
                  {...register('availability.daySlots.monday.startingTime')}
                  onChange={(e) => setDayStartingTime('Monday', e.target.value)}
                  className="standard-form__inputTime"
                  type="time"
                />
                <label className="body-text"> to</label>
                <input
                  {...register('availability.daySlots.monday.endingTime')}
                  onChange={(e) => setDayEndingTime('Monday', e.target.value)}
                  className="standard-form__inputTime"
                  type="time"
                />
              </span>
            )}

            {tuesday.selected && (
              <span className={styles['step3__timeInputWrapper']}>
                <input type="checkbox" checked id="time-tue" className="weekday" />
                <label htmlFor="time-tue">T</label>
                <input
                  {...register('availability.daySlots.tuesday.startingTime')}
                  onChange={(e) => setDayStartingTime('Tuesday', e.target.value)}
                  className="standard-form__inputTime"
                  type="time"
                />
                <label className="body-text"> to</label>
                <input
                  {...register('availability.daySlots.tuesday.endingTime')}
                  onChange={(e) => setDayEndingTime('Tuesday', e.target.value)}
                  className="standard-form__inputTime"
                  type="time"
                />
              </span>
            )}

            {wednesday.selected && (
              <span className={styles['step3__timeInputWrapper']}>
                <input type="checkbox" checked id="time-wed" className="weekday" />
                <label htmlFor="time-wed">W</label>
                <input
                  {...register('availability.daySlots.wednesday.startingTime')}
                  onChange={(e) => setDayStartingTime('Wednesday', e.target.value)}
                  className="standard-form__inputTime"
                  type="time"
                />
                <label className="body-text"> to</label>
                <input
                  {...register('availability.daySlots.wednesday.endingTime')}
                  onChange={(e) => setDayEndingTime('Wednesday', e.target.value)}
                  className="standard-form__inputTime"
                  type="time"
                />
              </span>
            )}

            {thursday.selected && (
              <span className={styles['step3__timeInputWrapper']}>
                <input type="checkbox" checked id="time-thu" className="weekday" />
                <label htmlFor="time-thu">T</label>
                <input
                  {...register('availability.daySlots.thursday.startingTime')}
                  onChange={(e) => setDayStartingTime('Thursday', e.target.value)}
                  className="standard-form__inputTime"
                  type="time"
                />
                <label className="body-text"> to</label>
                <input
                  {...register('availability.daySlots.thursday.endingTime')}
                  onChange={(e) => setDayEndingTime('Thursday', e.target.value)}
                  className="standard-form__inputTime"
                  type="time"
                />
              </span>
            )}

            {friday.selected && (
              <span className={styles['step3__timeInputWrapper']}>
                <input type="checkbox" checked id="time-fri" className="weekday" />
                <label htmlFor="time-fri">F</label>
                <input
                  {...register('availability.daySlots.friday.startingTime')}
                  onChange={(e) => setDayStartingTime('Friday', e.target.value)}
                  className="standard-form__inputTime"
                  type="time"
                />
                <label className="body-text"> to</label>
                <input
                  {...register('availability.daySlots.friday.endingTime')}
                  onChange={(e) => setDayEndingTime('Friday', e.target.value)}
                  className="standard-form__inputTime"
                  type="time"
                />
              </span>
            )}

            {saturday.selected && (
              <span className={styles['step3__timeInputWrapper']}>
                <input type="checkbox" checked id="time-sat" className="weekday" />
                <label htmlFor="time-sat">S</label>
                <input
                  {...register('availability.daySlots.saturday.startingTime')}
                  onChange={(e) => setDayStartingTime('Saturday', e.target.value)}
                  className="standard-form__inputTime"
                  type="time"
                />
                <label className="body-text"> to</label>
                <input
                  {...register('availability.daySlots.saturday.endingTime')}
                  onChange={(e) => setDayEndingTime('Saturday', e.target.value)}
                  className="standard-form__inputTime"
                  type="time"
                />
              </span>
            )}

            {sunday.selected && (
              <span className={styles['step3__timeInputWrapper']}>
                <input type="checkbox" checked id="time-sun" className="weekday" />
                <label htmlFor="time-sun">S</label>
                <input
                  {...register('availability.daySlots.sunday.startingTime')}
                  onChange={(e) => setDayStartingTime('Sunday', e.target.value)}
                  className="standard-form__inputTime"
                  type="time"
                />
                <label className="body-text"> to</label>
                <input
                  {...register('availability.daySlots.sunday.endingTime')}
                  onChange={(e) => setDayEndingTime('Sunday', e.target.value)}
                  className="standard-form__inputTime"
                  type="time"
                />
              </span>
            )}
          </div>

          <div className={styles['step3__weekRepeatSelect']}>
            <select
              className="standard-form__selectMedium"
              {...register('availability.repeat')}
              onChange={(c) => {
                setValue('availability.repeat', c.target.value as FormData['availability']['repeat'], {
                  shouldTouch: true,
                  shouldDirty: true,
                  shouldValidate: true,
                });
              }}
            >
              {' '}
              <option value="weekly">weekly</option>
              <option value="none">none</option>
            </select>
            <div className={styles['step3__untilDatePicker']}>
              <label className="label-text">Until</label> <br />
              <input
                className="standard-form"
                type="date"
                {...register('availability.endDate')}
                onChange={(c) => {
                  setValue('availability.endDate', c.target.value as any, {
                    shouldTouch: true,
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                }}
              ></input>
              {formState.errors.availability?.endDate && (
                <span className={styles['error']}>{formState.errors.availability?.endDate.message}</span>
              )}
            </div>
          </div>

          {formState.errors.availability?.repeat && (
            <span className={styles['error']}>{formState.errors.availability?.repeat.message}</span>
          )}
        </div>
      </div>
      <div className={styles['formItem']}>
        <h2 className={styles['step2__marginHeadline'] + ' header-tertiary'}>What are the rules?</h2>
        <p className="body-text-secondary mb-two">
          Please let the prospective booker know about cleanliness standards, key pick up and drop off processes, and
          anything else they should know.
        </p>
        <textarea
          className={'textArea standard-form'}
          {...register('rules')}
          onChange={(c) => {
            setValue('rules', c.target.value, {
              shouldTouch: true,
              shouldDirty: true,
              shouldValidate: true,
            });
          }}
        ></textarea>
        {formState.errors.rules && <span className={styles['error']}>{formState.errors.rules.message}</span>}
      </div>
      <div className={styles['step2__formWrapper']}>
        <h2 className={styles['step2__marginHeadline'] + ' header-tertiary'}>What’s the minimum stay?</h2>
        <div className={styles['step2__flexWrapper']}>
          <input
            className="standard-form__inputSmall"
            placeholder="0"
            type="number"
            id="months"
            {...register('minMonths')}
            onChange={(c) => setValue('minMonths', parseInt(c.target.value), shouldValidate)}
          ></input>
          <label htmlFor="months" className={styles['step2__label'] + ' body-text-secondary'}>
            Recurring months
          </label>
        </div>
        {formState.errors.minMonths && <span className={styles['error']}>{formState.errors.minMonths.message}</span>}
      </div>
    </div>
  );
}
