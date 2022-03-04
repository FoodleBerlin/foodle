import { FormData, useWizardContext } from './Wizard';
import styles from './Wizard.module.scss';
export default function Step1() {
  const { formState, nextStep, register, setValue } = useWizardContext();
  return (
    <div>
      <h1>Landlord component flow 1</h1>
      <div className={styles['step1']}>
        <h2 className='header-secondary'>What kind of property do you own?</h2>
        <div className={styles['step1__buttonWrapper']} >
        <button className='inactive-btn' >Entire Kitchen</button>
        <button className='active-btn' >Part of Kitchen</button>
        </div>
        {/*<input
          {...register('property')}
          onChange={(c) =>
            setValue('property', c.target.value as FormData['property'], {
              shouldTouch: true,
              shouldDirty: true,
              shouldValidate: true,
            })
          }
        ></input>*/}
        {formState.errors.property && <span className={styles['error']}>{formState.errors.property.message}</span>}
        {/* The current form value that will be submitted {getValues('property')} */}
        <h2 className='header-secondary'>How big is the kitchen?</h2>
        <div className={styles['step1__flexWrapper']}>
        <input
          className={styles['step1__shortInput']+ ' standard-form'}
          placeholder='200'
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
        <h2 className='header-secondary'>Where is it located?</h2>
        <label className={styles['step1__label']}>Address</label>
        <div className={styles['step1__addressGridWrapper']}>
        <input
          className={styles['step1__inputWide']+ ' standard-form'} 
          placeholder='Foodlestraße'
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
          className='standard-form'      
          placeholder='12'
          type="number"></input>
        <input
          className='standard-form'
          placeholder='12435'
          type="number"></input>
        <input
          className='standard-form'
          placeholder='Berlin'></input>
        <input
          className='standard-form'
          placeholder='Germany'></input>
          </div>
      </div>
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
