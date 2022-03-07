import { FormData, useWizardContext } from './Wizard';
import styles from './Wizard.module.scss';

export default function Step3() {
  const { formState, nextStep, register, setValue } = useWizardContext();
  const wizardContext = useWizardContext();

  return (
    <div>
      <h1>Landlord component flow 3</h1>

      <h2>How much is rent?</h2>
      <input
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
      <p>€ per hour</p>
      {formState.errors.rent && <span className={styles['error']}>{formState.errors.rent.message}</span>}

      <h2>Is there a deposit?</h2>
      <p>This one time payment will be refunded at the end of the lease. If there is no deposit just type in 0.</p>
      <input
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
      <p>€</p>
      {formState.errors.deposit && <span className={styles['error']}>{formState.errors.deposit.message}</span>}

      <p>Starting</p>
      <input
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

      <p>Days of week</p>
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

      <p>to</p>
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
      {formState.errors.availability?.repeat && (
        <span className={styles['error']}>{formState.errors.availability?.repeat.message}</span>
      )}

      <p>Until</p>
      <input
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

      <p>Minimum stay</p>
      <input
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

      <p>What are the rules?</p>
      <textarea
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

      <button onClick={() => wizardContext.previousStep(3)}>previous</button>
      <button onClick={() => wizardContext.nextStep(3)}>next</button>
    </div>
  );
}
