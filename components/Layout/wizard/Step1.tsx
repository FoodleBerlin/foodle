import { FormData, useWizardContext } from './Wizard';
import styles from './Wizard.module.scss';
export default function Step1() {
  const { formState, nextStep, register, setValue } = useWizardContext();
  return (
    <div>
      <h1>Landlord component flow 1</h1>
      <h2>What kind of property is it?</h2>
      <input
        {...register('property')}
        onChange={(c) =>
          setValue('property', c.target.value as FormData['property'], {
            shouldTouch: true,
            shouldDirty: true,
            shouldValidate: true,
          })
        }
      ></input>
      {formState.errors.property && <span className={styles['error']}>{formState.errors.property.message}</span>}
      {/* The current form value that will be submitted {getValues('property')} */}
      <h2>How big is is it?</h2>
      <input
        type="number"
        {...register('size')}
        onChange={(c) =>
          setValue('size', parseInt(c.target.value), {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
          })
        }
      ></input>
      {formState.errors.size && <span className={styles['error']}>{formState.errors.size.message}</span>}
      <h2>Where is it located?</h2>
      <label>Adress</label>
      <input
        {...register('location.street')}
        onChange={(c) =>
          setValue('location.street', c.target.value, {
            shouldTouch: true,
            shouldDirty: true,
            shouldValidate: true,
          })
        }
      ></input>
      {formState.errors.location?.street && (
        <span className={styles['error']}>{formState.errors.location?.street.message}</span>
      )}

      <input
        type="number"
        {...register('location.number')}
        onChange={(c) =>
          setValue('location.number', parseInt(c.target.value), {
            shouldTouch: true,
            shouldDirty: true,
            shouldValidate: true,
          })
        }
      ></input>
      {formState.errors.location?.number && (
        <span className={styles['error']}>{formState.errors.location?.number.message}</span>
      )}

      <input
        type="number"
        {...register('location.zip')}
        onChange={(c) =>
          setValue('location.zip', parseInt(c.target.value), {
            shouldTouch: true,
            shouldDirty: true,
            shouldValidate: true,
          })
        }
      ></input>
      {formState.errors.location?.zip && (
        <span className={styles['error']}>{formState.errors.location?.zip.message}</span>
      )}

      <input
        {...register('location.city')}
        onChange={(c) =>
          setValue('location.city', c.target.value, {
            shouldTouch: true,
            shouldDirty: true,
            shouldValidate: true,
          })
        }
      ></input>
      {formState.errors.location?.city && (
        <span className={styles['error']}>{formState.errors.location?.city.message}</span>
      )}

      <input
        {...register('location.country')}
        onChange={(c) =>
          setValue('location.country', c.target.value, {
            shouldTouch: true,
            shouldDirty: true,
            shouldValidate: true,
          })
        }
      ></input>
      {formState.errors.location?.country && (
        <span className={styles['error']}>{formState.errors.location?.country.message}</span>
      )}

      <button
        disabled={formState.errors.property || formState.errors.size || formState.errors.location ? true : false}
        onClick={() => {
          nextStep(1);
        }}
      >
        {/* TODO: create helper function for checking every field for disabling the button*/}
        {/* TODO: this button goes into a own component --> see design in figma! */}
        next
      </button>

    </div>
  );
}
