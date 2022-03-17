import Footer from './Footer';
import { FormData, useWizardContext } from './Wizard';
import styles from './Wizard.module.scss';
export default function Step1() {
  const { formState, nextStep, register, setValue } = useWizardContext();
  return (
    <div className={styles['step1']}>
      <div className={styles['formItem']}>
        <h2 className="header-tertiary">What kind of property do you own?</h2>
        <div className={styles['step1__buttonWrapper']}>
          <input
            {...register('property')}
            type="radio"
            id="full"
            className="radio"
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
          <label className={styles['labelButton']} htmlFor="full">
            <p className="body-text">Entire Kitchen</p>
          </label>

          <input
            {...register('property')}
            type="radio"
            id="partial"
            className="radio"
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
          <label className={styles['labelButton']} htmlFor="partial">
            <p className="body-text">Part of kitchen</p>
          </label>
          {formState.errors.property && <span className={styles['error']}>{formState.errors.property.message}</span>}
        </div>
      </div>
      <div className={styles['formItem']}>
        <h2 className="header-tertiary">How big is the kitchen?</h2>
        <div className={styles['step1__flexWrapper']}>
          <input
            className={'standard-form__inputMedium'}
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
          <label className={styles['step1__label'] + ' body-text-secondary'}>Size in square meters</label>
        </div>
        {formState.errors.size && <span className={styles['error']}>{formState.errors.size.message}</span>}
      </div>
      <div className={styles['formItem']}>
        <h2 className={styles['step1__addressHeader'] + ' header-tertiary'}>Where is it located?</h2>
        <label className={styles['step1__label'] + ' body-text-secondary'}>Address</label>
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
    </div>
  );
}
