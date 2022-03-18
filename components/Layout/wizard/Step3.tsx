import { FormData, useWizardContext } from './Wizard';
import styles from './Wizard.module.scss';

export default function Step3() {
  const { formState, nextStep, register, setValue } = useWizardContext();
  const wizardContext = useWizardContext();

  console.log(JSON.stringify(wizardContext.getValues()));

  const toggleDays = (day: string) => {
    if ([...wizardContext.getValues().availability.days].includes(day)) {
      setValue(
        'availability.days',
        [...wizardContext.getValues().availability.days].filter((x) => x !== day) as FormData['availability']['days'],
        {
          shouldTouch: true,
          shouldDirty: true,
          shouldValidate: true,
        }
      );
    } else {
      setValue(
        'availability.days',
        [...wizardContext.getValues().availability.days, day] as FormData['availability']['days'],
        {
          shouldTouch: true,
          shouldDirty: true,
          shouldValidate: true,
        }
      );
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
            {...register('rent')}
            onChange={(c) =>
              setValue('rent', parseInt(c.target.value), {
                shouldTouch: true,
                shouldDirty: true,
                shouldValidate: true,
              })
            }
          ></input>
        </div>
        <label className="body-text-secondary">€ per hour</label>
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
      <div className={styles['formItem']}>
        <h2 className={styles['step2__marginHeadline'] + ' header-tertiary'}>When is it available?</h2>
        <label className="label-text">Starting</label> <br />
        <input
          className="standard-form"
          type="date"
          {...register('availability.starting')}
          onChange={(c) => {
            console.log(c.target.value);
            setValue('availability.starting', new Date(c.target.value), {
              shouldTouch: true,
              shouldDirty: true,
              shouldValidate: true,
            });
          }}
        ></input>
        {formState.errors.availability?.starting && (
          <span className={styles['error']}>{formState.errors.availability?.starting.message}</span>
        )}
        <div className={styles['step3__weekDaysSelector']}>
          <div className={styles['step3__daysOfWeek']}>
            <label className="label-text">Days of week</label>
            <div className={styles['step3__weekDayCheckboxWrapper']}>
              <input
                {...register('availability.days')}
                type="checkbox"
                id="weekday-mon"
                value="Monday"
                className={styles['step3__weekDayCheckbox'] + ' weekday'}
                onChange={(c) => toggleDays(c.target.value)}
              />
              <label htmlFor="weekday-mon">M</label>
              <input
                {...register('availability.days')}
                type="checkbox"
                id="weekday-tue"
                value="Tuesday"
                className={styles['step3__weekDayCheckbox'] + ' weekday'}
                onChange={(c) => toggleDays(c.target.value)}
              />
              <label htmlFor="weekday-tue">T</label>
              <input
                {...register('availability.days')}
                type="checkbox"
                id="weekday-wed"
                value="Wednesday"
                className={styles['step3__weekDayCheckbox'] + ' weekday'}
                onChange={(c) => toggleDays(c.target.value)}
              />
              <label htmlFor="weekday-wed">W</label>
              <input
                {...register('availability.days')}
                type="checkbox"
                id="weekday-thu"
                value="Thirsday"
                className={styles['step3__weekDayCheckbox'] + ' weekday'}
                onChange={(c) => toggleDays(c.target.value)}
              />
              <label htmlFor="weekday-thu">T</label>
              <input
                {...register('availability.days')}
                type="checkbox"
                id="weekday-fri"
                value="Friday"
                className={styles['step3__weekDayCheckbox'] + ' weekday'}
                onChange={(c) => toggleDays(c.target.value)}
              />
              <label htmlFor="weekday-fri">F</label>
              <input
                {...register('availability.days')}
                type="checkbox"
                id="weekday-sat"
                value="Saturday"
                className={styles['step3__weekDayCheckbox'] + ' weekday'}
                onChange={(c) => toggleDays(c.target.value)}
              />
              <label htmlFor="weekday-sat">S</label>
              <input
                {...register('availability.days')}
                type="checkbox"
                id="weekday-sun"
                value="Sunday"
                className={styles['step3__weekDayCheckbox'] + ' weekday'}
                onChange={(c) => toggleDays(c.target.value)}
              />
              <label htmlFor="weekday-sun">S</label>
            </div>
            {formState.errors.availability?.days && (
              <span className={styles['error']}>{formState.errors.availability.days.message}</span>
            )}
          </div>
          <div className={styles['step3__timeInput']}>
            <span className={styles['step3__timeInputWrapper']}>
              <input type="checkbox" checked id="time-mon" className="weekday" />
              <label htmlFor="time-mon">M</label>
              <input className="standard-form__inputTime" type="time" />
              <label className="body-text"> to</label>
              <input className="standard-form__inputTime" type="time" />
            </span>
            <span className={styles['step3__timeInputWrapper']}>
              <input type="checkbox" checked id="time-tue" className="weekday" />
              <label htmlFor="time-tue">T</label>
              <input className="standard-form__inputTime" type="time" />
              <label className="body-text"> to</label>
              <input className="standard-form__inputTime" type="time" />
            </span>
            <span className={styles['step3__timeInputWrapper']}>
              <input type="checkbox" checked id="time-wed" className="weekday" />
              <label htmlFor="time-wed">W</label>
              <input className="standard-form__inputTime" type="time" />
              <label className="body-text"> to</label>
              <input className="standard-form__inputTime" type="time" />
            </span>
            <span className={styles['step3__timeInputWrapper']}>
              <input type="checkbox" checked id="time-thu" className="weekday" />
              <label htmlFor="time-thu">T</label>
              <input className="standard-form__inputTime" type="time" />
              <label className="body-text"> to</label>
              <input className="standard-form__inputTime" type="time" />
            </span>
            <span className={styles['step3__timeInputWrapper']}>
              <input type="checkbox" checked id="time-fri" className="weekday" />
              <label htmlFor="time-fri">F</label>
              <input className="standard-form__inputTime" type="time" />
              <label className="body-text"> to</label>
              <input className="standard-form__inputTime" type="time" />
            </span>
            <span className={styles['step3__timeInputWrapper']}>
              <input type="checkbox" checked id="time-sat" className="weekday" />
              <label htmlFor="time-sat">S</label>
              <input className="standard-form__inputTime" type="time" />
              <label className="body-text"> to</label>
              <input className="standard-form__inputTime" type="time" />
            </span>
            <span className={styles['step3__timeInputWrapper']}>
              <input type="checkbox" checked id="time-sun" className="weekday" />
              <label htmlFor="time-sun">S</label>
              <input className="standard-form__inputTime" type="time" />
              <label className="body-text"> to</label>
              <input className="standard-form__inputTime" type="time" />
            </span>
          </div>

          {formState.errors.availability?.from && (
            <span className={styles['error']}>{formState.errors.availability?.from.message}</span>
          )}

          {formState.errors.availability?.to && (
            <span className={styles['error']}>{formState.errors.availability?.to.message}</span>
          )}
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
              <option value="Every week">Every week</option>
              <option value="none">None</option>
            </select>
          </div>

          {formState.errors.availability?.repeat && (
            <span className={styles['error']}>{formState.errors.availability?.repeat.message}</span>
          )}
          <div className={styles['step3__untilDatePicker']}>
            <label className="label-text">Until</label> <br />
            <input
              className="standard-form"
              type="date"
              {...register('availability.until')}
              onChange={(c) => {
                console.log(c.target.value);
                setValue('availability.until', new Date(c.target.value), {
                  shouldTouch: true,
                  shouldDirty: true,
                  shouldValidate: true,
                });
              }}
            ></input>
            {formState.errors.availability?.until && (
              <span className={styles['error']}>{formState.errors.availability?.until.message}</span>
            )}
          </div>
          <div className={styles['step3__minimumStay']}>
            <label className="label-text">Minimum stay</label> <br />
            <input
              className="standard-form"
              {...register('availability.stay')}
              onChange={(c) => {
                setValue('availability.stay', c.target.value, {
                  shouldTouch: true,
                  shouldDirty: true,
                  shouldValidate: true,
                });
              }}
            ></input>
            {formState.errors.availability?.stay && (
              <span className={styles['error']}>{formState.errors.availability?.stay.message}</span>
            )}
          </div>
        </div>
      </div>
      <div className={styles['formItem']}>
        <h2 className={styles['step2__marginHeadline'] + ' header-tertiary'}>What are the rules?</h2>
        <textarea
          className={styles['step3__textArea'] + ' standard-form'}
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
    </div>
  );
}
