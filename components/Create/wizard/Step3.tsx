import DaySelector from '../DaySelector';
import TimeInput from '../TimeInput';
import { FormData, touchDirtyValidate, useWizardContext } from './Wizard';
import styles from './Wizard.module.scss';

export type DaySlot = {
  selected: boolean;
  startingTime: string;
  endingTime: string;
};

export default function Step3() {
  const { formState, nextStep, register, setValue } = useWizardContext();
  const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = useWizardContext().getValues().daySlots;

  return (
    <div className={styles['step3']}>
      <div className={styles['formItem']}>
        <h2 className={styles['step2__marginHeadline'] + ' header-tertiary'}>How much is rent?</h2>
        <div className={styles['step3__flexWrapper']}>
          <input
            className={styles['step3__shortInput'] + ' standard-form'}
            type="number"
            id="hourlyPrice"
            {...register('hourlyPrice')}
            onChange={(c) => setValue('hourlyPrice', parseInt(c.target.value), touchDirtyValidate)}
          ></input>
          <label htmlFor={'hourlyPrice'} className="body-text-secondary">
            € per hour
          </label>
        </div>
        {formState.errors.hourlyPrice && (
          <span className={styles['error']}>{formState.errors.hourlyPrice.message}</span>
        )}
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
            onChange={(c) => setValue('deposit', parseInt(c.target.value), touchDirtyValidate)}
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
          {...register('startDate')}
          onChange={(c) => {
            console.log(c.target.value);
            setValue('startDate', c.target.value as any, touchDirtyValidate);
          }}
        ></input>
        {formState.errors.startDate && <span className={styles['error']}>{formState.errors.startDate.message}</span>}
        {/* <--------- DAYS OF WEEK INPUTS ---------> */}
        <div className={styles['step3__weekDaysSelector']}>
          <div className={styles['step3__daysOfWeek']}>
            <label className="label-text">Days of week</label>
            <div className={styles['step3__weekDayCheckboxWrapper']}>
              <DaySelector weekday={'Monday'} short={'mon'} shortest={'M'} />
              <DaySelector weekday={'Tuesday'} short={'tue'} shortest={'T'} />
              <DaySelector weekday={'Wednesday'} short={'wed'} shortest={'W'} />
              <DaySelector weekday={'Thursday'} short={'thu'} shortest={'T'} />
              <DaySelector weekday={'Friday'} short={'fri'} shortest={'F'} />
              <DaySelector weekday={'Saturday'} short={'sat'} shortest={'S'} />
              <DaySelector weekday={'Sunday'} short={'sun'} shortest={'S'} />
            </div>
            {/* TODO: Add validation and error messages for all day inputs  */}
            {/* {formState.errors.days && (
              <span className={styles['error']}>{formState.errors.days.map((e) => e.message)}</span>
            )} */}
          </div>
          <div className={styles['step3__timeInput']}>
            {monday.selected && <TimeInput shortest={'M'} short={'mon'} />}
            {tuesday.selected && <TimeInput shortest={'T'} short={'tue'} />}
            {wednesday.selected && <TimeInput shortest={'W'} short={'wed'} />}
            {thursday.selected && <TimeInput shortest={'T'} short={'thu'} />}
            {friday.selected && <TimeInput shortest={'F'} short={'fri'} />}
            {saturday.selected && <TimeInput shortest={'S'} short={'sat'} />}
            {sunday.selected && <TimeInput shortest={'S'} short={'sun'} />}
          </div>

          <div className={styles['step3__weekRepeatSelect']}>
            <select
              className="standard-form__selectMedium"
              {...register('repeat')}
              onChange={(c) => {
                setValue('repeat', c.target.value as FormData['repeat'], touchDirtyValidate);
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
                {...register('endDate')}
                onChange={(c) => {
                  setValue('endDate', c.target.value as any, touchDirtyValidate);
                }}
              ></input>
              {formState.errors.endDate && <span className={styles['error']}>{formState.errors.endDate.message}</span>}
            </div>
          </div>

          {formState.errors.repeat && <span className={styles['error']}>{formState.errors.repeat.message}</span>}
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
            setValue('rules', c.target.value, touchDirtyValidate);
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
            onChange={(c) => setValue('minMonths', parseInt(c.target.value), touchDirtyValidate)}
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
