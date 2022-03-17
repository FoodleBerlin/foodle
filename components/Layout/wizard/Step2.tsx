import { FormData, useWizardContext } from './Wizard';
import styles from './Wizard.module.scss';

export default function Step2() {
  const { formState, nextStep, register, setValue } = useWizardContext();
  const wizardContext = useWizardContext();

  return (
    <div className={styles['step2']}>
      <div className={styles['formItem']}>
        <h2 className={styles['step2__marginHeadline'] + ' header-tertiary'}>How would you describe the space?</h2>
        <p className="body-text-secondary">
          This is what users will see as the description under the overview tab on the listing page.
        </p>
        <div className={styles['step1__flexWrapper']}>
          <textarea
            className={'standard-form__textarea'}
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
        {formState.errors.description && (
          <span className={styles['error']}>{formState.errors.description.message}</span>
        )}

        <h2 className={styles['step2__marginHeadline'] + ' header-tertiary'}>What features does your kitchen offer?</h2>

        <div className={styles['step2__buttonsGridWrapper']}>
          <input
            {...register('features')}
            type="checkbox"
            value="Unfurnished"
            id="features1"
            className="checkbox"
            name="features1"
            onChange={(c) =>
              setValue('features', c.target.value as FormData['features'], {
                shouldTouch: true,
                shouldDirty: true,
                shouldValidate: true,
              })
            }
          ></input>
          <label className={styles['labelButton']} htmlFor="features1">
            Unfurnished
          </label>

          <input
            {...register('features')}
            type="checkbox"
            value="A/C"
            id="features2"
            className="checkbox"
            name="features2"
            onChange={(c) =>
              setValue('features', c.target.value as FormData['features'], {
                shouldTouch: true,
                shouldDirty: true,
                shouldValidate: true,
              })
            }
          ></input>
          <label className={styles['labelButton']} htmlFor="features2">
            A/C
          </label>

          <input
            {...register('features')}
            type="checkbox"
            value="Elevator"
            id="features3"
            className="checkbox"
            name="features3"
            onChange={(c) =>
              setValue('features', c.target.value as FormData['features'], {
                shouldTouch: true,
                shouldDirty: true,
                shouldValidate: true,
              })
            }
          ></input>
          <label className={styles['labelButton']} htmlFor="features3">
            Elevator
          </label>

          <input
            {...register('features')}
            type="checkbox"
            value="Storefront"
            id="features4"
            className="checkbox"
            name="features4"
            onChange={(c) =>
              setValue('features', c.target.value as FormData['features'], {
                shouldTouch: true,
                shouldDirty: true,
                shouldValidate: true,
              })
            }
          ></input>
          <label className={styles['labelButton']} htmlFor="features4">
            Storefront
          </label>

          <input
            {...register('features')}
            type="checkbox"
            value="Parking"
            id="features5"
            className="checkbox"
            name="features5"
            onChange={(c) =>
              setValue('features', c.target.value as FormData['features'], {
                shouldTouch: true,
                shouldDirty: true,
                shouldValidate: true,
              })
            }
          ></input>
          <label className={styles['labelButton']} htmlFor="features5">
            Parking
          </label>

          <input
            {...register('features')}
            type="checkbox"
            value="Dishwasher"
            id="features6"
            className="checkbox"
            name="features6"
            onChange={(c) =>
              setValue('features', c.target.value as FormData['features'], {
                shouldTouch: true,
                shouldDirty: true,
                shouldValidate: true,
              })
            }
          ></input>
          <label className={styles['labelButton']} htmlFor="features6">
            Dishwasher
          </label>

          <input
            {...register('features')}
            type="checkbox"
            value="Heating"
            id="features7"
            className="checkbox"
            name="features7"
            onChange={(c) =>
              setValue('features', c.target.value as FormData['features'], {
                shouldTouch: true,
                shouldDirty: true,
                shouldValidate: true,
              })
            }
          ></input>
          <label className={styles['labelButton']} htmlFor="features7">
            Heating
          </label>

          <input
            {...register('features')}
            type="checkbox"
            value="Water"
            id="features8"
            className="checkbox"
            name="features8"
            onChange={(c) =>
              setValue('features', c.target.value as FormData['features'], {
                shouldTouch: true,
                shouldDirty: true,
                shouldValidate: true,
              })
            }
          ></input>
          <label className={styles['labelButton']} htmlFor="features8">
            Water
          </label>

          <input
            {...register('features')}
            type="checkbox"
            value="Oven"
            id="features9"
            className="checkbox"
            name="features9"
            onChange={(c) =>
              setValue('features', c.target.value as FormData['features'], {
                shouldTouch: true,
                shouldDirty: true,
                shouldValidate: true,
              })
            }
          ></input>
          <label className={styles['labelButton']} htmlFor="features9">
            Oven
          </label>

          {formState.errors.features && <span className={styles['error']}>{formState.errors.features.message}</span>}
        </div>
      </div>

      <div className={styles['step2__formWrapper']}>
        <h2 className={styles['step2__marginHeadline'] + ' header-tertiary'}>What’s the minimum stay?</h2>
        <div className={styles['step2__flexWrapper']}>
          <input
            className="standard-form__inputSmall"
            placeholder="0"
            type="number"
            id="hours"
            {...register('stay.hours')}
            onChange={(c) =>
              setValue('stay.hours', parseInt(c.target.value), {
                shouldTouch: true,
                shouldDirty: true,
                shouldValidate: true,
              })
            }
          ></input>
          <label htmlFor="hours" className={styles['step2__label'] + ' body-text-secondary'}>
            Hours per week
          </label>
          {formState.errors.stay?.hours && (
            <span className={styles['error']}>{formState.errors.stay?.hours.message}</span>
          )}
        </div>
        <div className={styles['step2__flexWrapper']}>
          <input
            className="standard-form__inputSmall"
            placeholder="0"
            type="number"
            id="weeks"
            {...register('stay.weeks')}
            onChange={(c) =>
              setValue('stay.weeks', parseInt(c.target.value), {
                shouldTouch: true,
                shouldDirty: true,
                shouldValidate: true,
              })
            }
          ></input>
          <label htmlFor="weeks" className={styles['step2__label'] + ' body-text-secondary'}>
            Recurring weeks
          </label>
          {formState.errors.stay?.weeks && (
            <span className={styles['error']}>{formState.errors.stay?.weeks.message}</span>
          )}
        </div>
      </div>
    </div>
  );
}
