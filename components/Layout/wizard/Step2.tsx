import { FormData, useWizardContext } from './Wizard';
import styles from './Wizard.module.scss';
import { shouldValidate } from './Step3';
import { FieldError } from 'react-hook-form';

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
        shouldValidate
      );
      /*
      when 'Unfurnished' is already clicked, unclick and delete it from
      wizardContext as soon as one of the other feature is clicked
      */
    } else if ([...wizardContext.getValues().features].includes('Unfurnished')) {
      setValue(
        'features',
        [...wizardContext.getValues().features].filter((x) => x !== 'Unfurnished') as FormData['features'],
        shouldValidate
      );
      setValue('features', [...wizardContext.getValues().features, feature] as FormData['features'], shouldValidate);
      /* 
      when 'Unfurnished' is clicked again, unclick and delete all the other features so that
      just 'Unfurnished' is back in the wizardContext
      */
    } else if (feature === 'Unfurnished') {
      setValue(
        'features',
        [...wizardContext.getValues().features].filter((x) => x === 'Unfurnished') as FormData['features'],
        shouldValidate
      );
      setValue(
        'features',
        [...wizardContext.getValues().features, 'Unfurnished'] as FormData['features'],
        shouldValidate
      );
      // in any other case the clicked feature will be added to the wizardContext
    } else {
      setValue('features', [...wizardContext.getValues().features, feature] as FormData['features'], shouldValidate);
    }
  };
  const facility = (facility: string, id: number) => {
    return (
      <>
        <input
          {...register('features')}
          type="checkbox"
          value={facility}
          id={'features' + id}
          className="checkbox"
          name={'features' + id}
          onChange={(c) => toggleFeature(c.target.value)}
        ></input>
        <label className={styles['labelButton'] + ' small-text'} htmlFor={'features' + id}>
          {facility}
        </label>
      </>
    );
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
              className="textArea standard-form"
              {...register('description')}
              onChange={(c) => setValue('description', c.target.value, shouldValidate)}
            ></textarea>
          </div>
          {formState.errors.description && (
            <span className={styles['error']}>{formState.errors.description.message}</span>
          )}
        </div>
        <div className={styles['formItem']}>
          <h2 className={styles['step2__marginHeadline'] + ' header-tertiary mb-two'}>
            What features does your kitchen offer?
          </h2>

          <div className={styles['step2__buttonsGridWrapper']}>
            {['Unfurnished', 'A/C', 'Elevator', 'Storefront', 'Parking', 'Dishwasher', 'Heating', 'Water', 'Oven'].map(
              (facilityString: string, index) => {
                return facility(facilityString, index + 1);
              }
            )}
            {formState?.errors?.features && (
              <span className={styles['error']}>{(formState?.errors?.features as any).message}</span>
            )}
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
            id="months"
            {...register('minMonths')}
            onChange={(c) => setValue('minMonths', parseInt(c.target.value), shouldValidate)}
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
