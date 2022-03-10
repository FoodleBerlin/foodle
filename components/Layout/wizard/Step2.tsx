import { FormData, useWizardContext } from './Wizard';
import styles from './Wizard.module.scss';

export default function Step2() {
  const { formState, nextStep, register, setValue } = useWizardContext();
  const wizardContext = useWizardContext();

  return (
    <div>
      <h1>Landlord component flow 2</h1>
      <div className={styles['step2']}>
        <h2 className='header-secondary' >How would you describe the space?</h2>
        <p className='body-text'>This is what users will see as the description under the overview tab on the listing page.</p>
        <div className={styles['step1__flexWrapper']}>
          <textarea
            className={styles['step2__textArea'] + ' standard-form'}
            {...register('description')}
            onChange={(c) =>
              setValue('description', c.target.value, {
                shouldTouch: true,
                shouldDirty: true,
                shouldValidate: true,
              })
            }
          ></textarea>
        </div>
        {formState.errors.description && <span className={styles['error']}>{formState.errors.description.message}</span>}
        <h2 className='header-secondary'>What features does your kitchen offer?</h2>
        <input
          {...register('features')}
          onChange={(c) =>
            setValue('features', c.target.value as FormData['features'], {
              shouldTouch: true,
              shouldDirty: true,
              shouldValidate: true,
            })
          }
        ></input>
        {formState.errors.features && <span className={styles['error']}>{formState.errors.features.message}</span>}
        <h2 className='header-secondary'>What’s the minimum stay?</h2>
        <input
          placeholder='0'
          type="number"
          {...register('stay.hours')}
          onChange={(c) =>
            setValue('stay.hours', parseInt(c.target.value), {
              shouldTouch: true,
              shouldDirty: true,
              shouldValidate: true,
            })
          }
        ></input>
        <p>Hours per week</p>
        {formState.errors.stay?.hours && <span className={styles['error']}>{formState.errors.stay?.hours.message}</span>}
        <input
          placeholder='0'
          type="number"

          {...register('stay.weeks')}
          onChange={(c) =>
            setValue('stay.weeks', parseInt(c.target.value), {
              shouldTouch: true,
              shouldDirty: true,
              shouldValidate: true,
            })
          }
        ></input>
        <p>Recurring weeks</p>
        {formState.errors.stay?.weeks && <span className={styles['error']}>{formState.errors.stay?.weeks.message}</span>}
         </div>
        <button onClick={() => wizardContext.previousStep(2)}>previous</button>
      <button
        disabled={formState.errors.description || formState.errors.features || formState.errors.stay ? true : false}
        onClick={() => {
          nextStep(2);
        }}
      >
        {/* TODO: create helper function for checking every field for disabling the button*/}
        {/* TODO: this button goes into a own component --> see design in figma! */}
        next
      </button>
    </div>
  );
}
