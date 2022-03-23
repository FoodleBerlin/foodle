import { useWizardContext } from '../Layout/wizard/Wizard';
import { FormData, touchDirtyValidate } from '../Layout/wizard/Wizard';
import styles from '../../components/Layout/wizard/Wizard.module.scss';

interface FacilityProps {
  facility: string;
  id: number;
}

const Facility = (props: FacilityProps) => {
  const { setValue, register } = useWizardContext();
  const wizardContext = useWizardContext();

  /* 
  toggle handler function that allows user to select and deselect a feature
  */
  const toggleFeature = (feature: string) => {
    /*
    when feature is already in the wizardContext, it will be deleted
    */
    if ([...wizardContext.getValues().facilities].includes(feature)) {
      setValue(
        'facilities',
        [...wizardContext.getValues().facilities].filter((x) => x !== feature) as FormData['facilities'],
        touchDirtyValidate
      );
      /*
      when 'Unfurnished' is already clicked, unclick and delete it from
      wizardContext as soon as one of the other feature is clicked
      */
    } else if ([...wizardContext.getValues().facilities].includes('Unfurnished')) {
      setValue(
        'facilities',
        [...wizardContext.getValues().facilities].filter((x) => x !== 'Unfurnished') as FormData['facilities'],
        touchDirtyValidate
      );
      setValue(
        'facilities',
        [...wizardContext.getValues().facilities, feature] as FormData['facilities'],
        touchDirtyValidate
      );
      /* 
      when 'Unfurnished' is clicked again, unclick and delete all the other features so that
      just 'Unfurnished' is back in the wizardContext
      */
    } else if (feature === 'Unfurnished') {
      setValue(
        'facilities',
        [...wizardContext.getValues().facilities].filter((x) => x === 'Unfurnished') as FormData['facilities'],
        touchDirtyValidate
      );
      setValue(
        'facilities',
        [...wizardContext.getValues().facilities, 'Unfurnished'] as FormData['facilities'],
        touchDirtyValidate
      );
      // in any other case the clicked feature will be added to the wizardContext
    } else {
      setValue(
        'facilities',
        [...wizardContext.getValues().facilities, feature] as FormData['facilities'],
        touchDirtyValidate
      );
    }
  };

  return (
    <>
      <input
        {...register('facilities')}
        type="checkbox"
        value={props.facility}
        id={'features' + props.id}
        className="checkbox"
        name={'features' + props.id}
        onChange={(c) => toggleFeature(c.target.value)}
      ></input>
      <label className={styles['labelButton'] + ' small-text'} htmlFor={'features' + props.id}>
        {props.facility}
      </label>
    </>
  );
};

export default Facility;
