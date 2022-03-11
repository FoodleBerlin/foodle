import { FormData, useWizardContext } from './Wizard';
import styles from './Wizard.module.scss';
export default function Step1() {
  const { formState, nextStep, register, setValue } = useWizardContext();
  return (
    <div>
      <h1>Landlord component flow 1</h1>
      <div className={styles['step1']}>
        <h2 className="header-secondary">What kind of property do you own?</h2>

        <div className={styles['step1__buttonWrapper']}>
          <input
            {...register('property')}
            type="radio"
            id="full"
            name="kitchen"
            value="full"
            onChange={(c) =>
              setValue('property', c.target.value as FormData['property'], {
                shouldTouch: true,
                shouldDirty: true,
                shouldValidate: true,
              })
            }
          />
          <label className={styles['propertyLabel']} htmlFor="full">
            <p className="body-text">Entire Kitchen</p>
          </label>

          <input
            {...register('property')}
            type="radio"
            id="partial"
            name="kitchen"
            value="partial"
            onChange={(c) =>
              setValue('property', c.target.value as FormData['property'], {
                shouldTouch: true,
                shouldDirty: true,
                shouldValidate: true,
              })
            }
          />
          <label className={styles['propertyLabel']} htmlFor="partial">
            <p className="body-text">Part of kitchen</p>
          </label>
          {formState.errors.property && <span className={styles['error']}>{formState.errors.property.message}</span>}
        </div>

        {/* The current form value that will be submitted {getValues('property')} */}
        <h2 className="header-secondary">How big is the kitchen?</h2>
        <div className={styles['step1__flexWrapper']}>
          <input
            className={styles['step1__shortInput'] + ' standard-form'}
            placeholder="200"
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
          <label className={styles['step1__label']}>Size in square meters</label>
        </div>
        {formState.errors.size && <span className={styles['error']}>{formState.errors.size.message}</span>}
        <h2 className="header-secondary">Where is it located?</h2>
        <label className={styles['step1__label']}>Address</label>
        <div className={styles['step1__addressGridWrapper']}>
          <input
            className={styles['step1__input--street'] + ' standard-form'}
            placeholder="Foodlestraße"
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
            <span className={styles['error'] + ' ' + styles['step1__validationSpan--street']}>
              {formState.errors.location?.street.message}
            </span>
          )}
          <input
            className={styles['step1__input--number'] + ' standard-form'}
            placeholder="12"
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
            <span className={styles['error'] + ' ' + styles['step1__validationSpan--number']}>
              {formState.errors.location?.number.message}
            </span>
          )}

          <input
            className={styles['step1__input--zip'] + ' standard-form'}
            placeholder="12435"
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
            <span className={styles['error'] + ' ' + styles['step1__validationSpan--zip']}>
              {formState.errors.location?.zip.message}
            </span>
          )}

          <input
            className={styles['step1__input--city'] + ' standard-form'}
            placeholder="Berlin"
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
            <span className={styles['error'] + ' ' + styles['step1__validationSpan--city']}>
              {formState.errors.location?.city.message}
            </span>
          )}

          <input
            className={styles['step1__input--country'] + ' standard-form'}
            placeholder="Germany"
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
            <span className={styles['error'] + ' ' + styles['step1__validationSpan--country']}>
              {formState.errors.location?.country.message}
            </span>
          )}
        </div>
      </div>

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
