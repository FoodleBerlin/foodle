import { FormData, useWizardContext } from './Wizard';
import styles from './Wizard.module.scss';

export default function Step2() {
  const { formState, nextStep, register, setValue } = useWizardContext();
  const wizardContext = useWizardContext();

  /* 
  toggle handler function that allows user to select and deselect a feature
  */
  const toggleFeature = (feature: string) => {
    /*
    when feature is already in the wizardContext, it will be deleted
    */
    if ([...wizardContext.getValues().features].includes(feature)) {
      setValue(
        'features',
        [...wizardContext.getValues().features].filter((x) => x !== feature) as FormData['features'],
        {
          shouldTouch: true,
          shouldDirty: true,
          shouldValidate: true,
        }
      );
      /*
      when 'Unfurnished' is already clicked, unclick and delete it from
      wizardContext as soon as one of the other feature is clicked
      */
    } else if ([...wizardContext.getValues().features].includes('Unfurnished')) {
      setValue(
        'features',
        [...wizardContext.getValues().features].filter((x) => x !== 'Unfurnished') as FormData['features'],
        {
          shouldTouch: true,
          shouldDirty: true,
          shouldValidate: true,
        }
      );
      setValue('features', [...wizardContext.getValues().features, feature] as FormData['features'], {
        shouldTouch: true,
        shouldDirty: true,
        shouldValidate: true,
      });
      /* 
      when 'Unfurnished' is clicked again, unclick and delete all the other features so that
      just 'Unfurnished' is back in the wizardContext
      */
    } else if (feature === 'Unfurnished') {
      setValue(
        'features',
        [...wizardContext.getValues().features].filter((x) => x === 'Unfurnished') as FormData['features'],
        {
          shouldTouch: true,
          shouldDirty: true,
          shouldValidate: true,
        }
      );
      setValue('features', [...wizardContext.getValues().features, 'Unfurnished'] as FormData['features'], {
        shouldTouch: true,
        shouldDirty: true,
        shouldValidate: true,
      });
      // in any other case the clicked feature will be added to the wizardContext
    } else {
      setValue('features', [...wizardContext.getValues().features, feature] as FormData['features'], {
        shouldTouch: true,
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  };

  return (
    <div className={styles['step2']}>
      <div className={styles['step2__formWrapper']}>
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
        </div>
        <div className={styles['formItem']}>
          <h2 className={styles['step2__marginHeadline'] + ' header-tertiary'}>
            What features does your kitchen offer?
          </h2>

          <div className={styles['step2__buttonsGridWrapper']}>
            <input
              {...register('features')}
              type="checkbox"
              value="Unfurnished"
              id="features1"
              className="checkbox"
              name="features1"
              onChange={(c) => toggleFeature(c.target.value)}
            ></input>
            <label className={styles['labelButton']} htmlFor="features1">
              <p className="body-text__small">Unfurnished</p>
            </label>
            <input
              {...register('features')}
              type="checkbox"
              value="A/C"
              id="features2"
              className="checkbox"
              name="features2"
              onChange={(c) => toggleFeature(c.target.value)}
            ></input>
            <label className={styles['labelButton']} htmlFor="features2">
              <p className="body-text__small">A/C</p>
            </label>

            <input
              {...register('features')}
              type="checkbox"
              value="Elevator"
              id="features3"
              className="checkbox"
              name="features3"
              onChange={(c) => toggleFeature(c.target.value)}
            ></input>
            <label className={styles['labelButton']} htmlFor="features3">
              <p className="body-text__small">Elevator</p>
            </label>

            <input
              {...register('features')}
              type="checkbox"
              value="Storefront"
              id="features4"
              className="checkbox"
              name="features4"
              onChange={(c) => toggleFeature(c.target.value)}
            ></input>
            <label className={styles['labelButton']} htmlFor="features4">
              <p className="body-text__small">Storefront</p>
            </label>

            <input
              {...register('features')}
              type="checkbox"
              value="Parking"
              id="features5"
              className="checkbox"
              name="features5"
              onChange={(c) => toggleFeature(c.target.value)}
            ></input>
            <label className={styles['labelButton']} htmlFor="features5">
              <p className="body-text__small">Parking</p>
            </label>

            <input
              {...register('features')}
              type="checkbox"
              value="Dishwasher"
              id="features6"
              className="checkbox"
              name="features6"
              onChange={(c) => toggleFeature(c.target.value)}
            ></input>
            <label className={styles['labelButton']} htmlFor="features6">
              <p className="body-text__small">Dishwasher</p>
            </label>

            <input
              {...register('features')}
              type="checkbox"
              value="Heating"
              id="features7"
              className="checkbox"
              name="features7"
              onChange={(c) => toggleFeature(c.target.value)}
            ></input>
            <label className={styles['labelButton']} htmlFor="features7">
              <p className="body-text__small">Heating</p>
            </label>

            <input
              {...register('features')}
              type="checkbox"
              value="Water"
              id="features8"
              className="checkbox"
              name="features8"
              onChange={(c) => toggleFeature(c.target.value)}
            ></input>
            <label className={styles['labelButton']} htmlFor="features8">
              <p className="body-text__small">Water</p>
            </label>

            <input
              {...register('features')}
              type="checkbox"
              value="Oven"
              id="features9"
              className="checkbox"
              name="features9"
              onChange={(c) => toggleFeature(c.target.value)}
            ></input>
            <label className={styles['labelButton']} htmlFor="features9">
              <p className="body-text__small">Oven</p>
            </label>

            {formState.errors.features && <span className={styles['error']}>{formState.errors.features.message}</span>}
          </div>
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
        </div>
        {formState.errors.stay?.hours && (
          <span className={styles['error']}>{formState.errors.stay?.hours.message}</span>
        )}
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
        </div>
        {formState.errors.stay?.weeks && (
          <span className={styles['error']}>{formState.errors.stay?.weeks.message}</span>
        )}
      </div>
    </div>
  );
}
