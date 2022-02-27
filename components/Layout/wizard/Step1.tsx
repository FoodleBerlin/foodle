import { FormData, useWizardContext } from './Wizard';
import styles from './Wizard.module.scss';
export default function Step1() {
  const { formState, nextStep, register, setValue } = useWizardContext();
  return (
    <div>
      <h1>Landlord component flow 1</h1>
      <label>What kind of property is it?</label>
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
      <label>How big is is it?</label>
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
      <label>Where is it located?</label>
      <input type="number"></input>
      <button
        onClick={() => {
          nextStep(1);
        }}
      >
        {/* TODO disable unless all fields in this step are valid */}
        next
      </button>
    </div>
  );
}
