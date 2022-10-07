import Facility from '../Facility';
import { touchDirtyValidate, useWizardContext } from './Wizard';
import styles from './Wizard.module.scss';

export default function Step2() {
  const { formState, nextStep, register, setValue } = useWizardContext();

  return (
    <div className={styles['step2']}>
      <div className={styles['step2__formWrapper']}>
        <div className={styles['formItem']}>
          <h2 className="header-secondary">What is the name of your property?</h2>
          <p className="body-text-secondary">
            This is what users will see as the title of your property on the listings page.
          </p>
          <div className={styles['step1__flexWrapper']}>
            <input
              className="standard-form__inputLarge"
              placeholder="Industrial Grade Kitchen in Mitte"
              type="text"
              {...register('title')}
              onChange={(c) => setValue('title', c.target.value, touchDirtyValidate)}
            ></input>
          </div>
          {formState.errors.title && <span className={styles['error']}>{formState.errors.title.message}</span>}
        </div>
        <div className={styles['formItem']}>
          <h2 className={' header-secondary'}>How would you describe the space?</h2>
          <p className="body-text-secondary">
            This is what users will see as the description under the overview tab on the listing page.
          </p>
          <div className={styles['step1__flexWrapper']}>
            <textarea
              className="textArea standard-form"
              {...register('description')}
              onChange={(c) => setValue('description', c.target.value, touchDirtyValidate)}
              style={{ width: '100%' }}
            ></textarea>
          </div>
          {formState.errors.description && (
            <span className={styles['error']}>{formState.errors.description.message}</span>
          )}
        </div>
        <div className={styles['formItem']}>
          <h2 className={styles['step2__marginHeadline'] + ' header-secondary mb-two'}>
            What features does your kitchen offer?
          </h2>

          <div className={styles['step2__buttonsGridWrapper']}>
            {['Unfurnished', 'A/C', 'Elevator', 'Storefront', 'Parking', 'Dishwasher', 'Heating', 'Water', 'Oven'].map(
              (facilityString: string, index) => {
                return <Facility key={index + 1} facility={facilityString} id={index + 1} />;
              }
            )}
            {formState?.errors?.facilities && (
              <span className={styles['error']}>{(formState?.errors?.facilities as any).message}</span>
            )}
          </div>
        </div>
      </div>

      <div className={styles['step2__formWrapper']}>
        <h2 className={styles['step2__marginHeadline'] + ' header-secondary'}>What’s the minimum stay?</h2>
        <div className={styles['step2__flexWrapper']}>
          <input
            className="standard-form__inputSmall"
            placeholder="0"
            type="number"
            id="months"
            {...register('minMonths')}
            onChange={(c) => setValue('minMonths', parseInt(c.target.value), touchDirtyValidate)}
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