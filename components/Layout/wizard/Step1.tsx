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
      <input type="number"></input>
      <input type="number"></input>
      <input></input>
      <input></input>
      <button
        disabled={formState.errors.property ? true : false}
        onClick={() => {
          nextStep(1);
        }}
      >
        {/* TODO disable unless all fields in this step are valid */}
        {/* TODO: create helper function for checking every field for disabling the button*/}
        next
      </button>
    </div>
  );
}
