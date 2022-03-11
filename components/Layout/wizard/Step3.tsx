import { FormData, useWizardContext } from './Wizard';
import styles from './Wizard.module.scss';

export default function Step3() {
  const { formState, nextStep, register, setValue } = useWizardContext();
  const wizardContext = useWizardContext();

  return (
    <div>
      <h1>Landlord component flow 3</h1>
      <div className={styles['step3']}>
        <h2 className="header-secondary">How much is rent?</h2>
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
          <label className={styles['step3__label']}>€ per hour</label>
        </div>
        {formState.errors.rent && <span className={styles['error']}>{formState.errors.rent.message}</span>}
        <h2 className="header-secondary">Is there a deposit?</h2>
        <p className="body-text">
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
          <label className={styles['step3__label']}>€</label>
        </div>
        {formState.errors.deposit && <span className={styles['error']}>{formState.errors.deposit.message}</span>}
        <h2 className="header-secondary">When is it available?</h2>
        <label className={styles['step3__label']}>Starting</label> <br />
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
            <label className={styles['step3__label']}>Days of week</label>
            <div>
              <input type="checkbox" id="weekday-mon" className={'weekday'} />
              <label htmlFor="weekday-mon">M</label>
              <input type="checkbox" id="weekday-tue" className="weekday" />
              <label htmlFor="weekday-tue">T</label>
              <input type="checkbox" id="weekday-wed" className="weekday" />
              <label htmlFor="weekday-wed">W</label>
              <input type="checkbox" id="weekday-thu" className="weekday" />
              <label htmlFor="weekday-thu">T</label>
              <input type="checkbox" id="weekday-fri" className="weekday" />
              <label htmlFor="weekday-fri">F</label>
              <input type="checkbox" id="weekday-sat" className="weekday" />
              <label htmlFor="weekday-sat">S</label>
              <input type="checkbox" id="weekday-sun" className="weekday" />
              <label htmlFor="weekday-sun">S</label>
            </div>
          </div>
          <div className={styles['step3__timeInput']}>
            <span className={styles['step3__flexWrapper']}>
              <input type="checkbox" checked id="time-mon" className="weekday" />
              <label htmlFor="time-mon">M</label>
              <input className="standard-form" type="time" />
              <label className={styles['step3__label']}>to</label>
              <input className="standard-form" type="time" />
            </span>
            <span className={styles['step3__flexWrapper']}>
              <input type="checkbox" checked id="time-tue" className="weekday" />
              <label htmlFor="time-tue">T</label>
              <input className="standard-form" type="time" />
              <label className={styles['step3__label']}>to</label>
              <input className="standard-form" type="time" />
            </span>
            <span className={styles['step3__flexWrapper']}>
              <input type="checkbox" checked id="time-wed" className="weekday" />
              <label htmlFor="time-wed">W</label>
              <input className="standard-form" type="time" />
              <label className={styles['step3__label']}>to</label>
              <input className="standard-form" type="time" />
            </span>
            <span className={styles['step3__flexWrapper']}>
              <input type="checkbox" checked id="time-thu" className="weekday" />
              <label htmlFor="time-thu">T</label>
              <input className="standard-form" type="time" />
              <label className={styles['step3__label']}>to</label>
              <input className="standard-form" type="time" />
            </span>
            <span className={styles['step3__flexWrapper']}>
              <input type="checkbox" checked id="time-fri" className="weekday" />
              <label htmlFor="time-fri">F</label>
              <input className="standard-form" type="time" />
              <label className={styles['step3__label']}>to</label>
              <input className="standard-form" type="time" />
            </span>
            <span className={styles['step3__flexWrapper']}>
              <input type="checkbox" checked id="time-sat" className="weekday" />
              <label htmlFor="time-sat">S</label>
              <input className="standard-form" type="time" />
              <label className={styles['step3__label']}>to</label>
              <input className="standard-form" type="time" />
            </span>
            <span className={styles['step3__flexWrapper']}>
              <input type="checkbox" checked id="time-sun" className="weekday" />
              <label htmlFor="time-sun">S</label>
              <input className="standard-form" type="time" />
              <label className={styles['step3__label']}>to</label>
              <input className="standard-form" type="time" />
            </span>
          </div>

          <input
            type="button"
            {...register('availability.days')}
            onChange={(c) => {
              setValue('availability.days', c.target.value, {
                shouldTouch: true,
                shouldDirty: true,
                shouldValidate: true,
              });
            }}
          ></input>
          {formState.errors.availability?.days && (
            <span className={styles['error']}>{formState.errors.availability?.days.message}</span>
          )}
          <input
            type="number"
            {...register('availability.from')}
            onChange={(c) => {
              setValue('availability.from', parseInt(c.target.value), {
                shouldTouch: true,
                shouldDirty: true,
                shouldValidate: true,
              });
            }}
          ></input>
          {formState.errors.availability?.from && (
            <span className={styles['error']}>{formState.errors.availability?.from.message}</span>
          )}

          <input
            type="number"
            {...register('availability.to')}
            onChange={(c) => {
              setValue('availability.to', parseInt(c.target.value), {
                shouldTouch: true,
                shouldDirty: true,
                shouldValidate: true,
              });
            }}
          ></input>
          {formState.errors.availability?.to && (
            <span className={styles['error']}>{formState.errors.availability?.to.message}</span>
          )}
          <div className={styles['step3__weekRepeatSelect']} >
            <select
              
              {...register('availability.repeat')}
              onChange={(c) => {
                setValue('availability.repeat', c.target.value as FormData['availability.repeat'], {
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
            <label className={styles['step3__label']}>Until</label> <br />
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
            <label className={styles['step3__label']}>Minimum stay</label> <br />
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
        <h2 className="header-secondary">What are the rules?</h2>
       
        <textarea
          className={styles['step3__textArea']+ ' standard-form'}
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
