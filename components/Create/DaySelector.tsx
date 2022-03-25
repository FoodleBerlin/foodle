import { useWizardContext } from './wizard/Wizard';
import styles from '../Create/wizard/Wizard.module.scss';
import { FormData, touchDirtyValidate } from './wizard/Wizard';

interface DaySelectorProps {
  weekday: string;
  short: string;
  shortest: string;
}
const DaySelector = (props: DaySelectorProps) => {
  const { register, setValue } = useWizardContext();

  const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } =
    useWizardContext().getValues().availability.daySlots;
  const toggleDay = (day: string) => {
    switch (day) {
      case 'Monday':
        setValue(
          'availability.daySlots.monday.selected',
          !monday.selected as FormData['availability']['daySlots']['monday']['selected'],
          touchDirtyValidate
        );
        break;
      case 'Tuesday':
        setValue(
          'availability.daySlots.tuesday.selected',
          !tuesday.selected as FormData['availability']['daySlots']['tuesday']['selected'],
          touchDirtyValidate
        );
        break;
      case 'Wednesday':
        setValue(
          'availability.daySlots.wednesday.selected',
          !wednesday.selected as FormData['availability']['daySlots']['wednesday']['selected'],
          touchDirtyValidate
        );
        break;
      case 'Thursday':
        setValue(
          'availability.daySlots.thursday.selected',
          !thursday.selected as FormData['availability']['daySlots']['thursday']['selected'],
          touchDirtyValidate
        );
        break;
      case 'Friday':
        setValue(
          'availability.daySlots.friday.selected',
          !friday.selected as FormData['availability']['daySlots']['friday']['selected'],
          touchDirtyValidate
        );
        break;
      case 'Saturday':
        setValue(
          'availability.daySlots.saturday.selected',
          !saturday.selected as FormData['availability']['daySlots']['saturday']['selected'],
          touchDirtyValidate
        );
        break;
      case 'Sunday':
        setValue(
          'availability.daySlots.sunday.selected',
          !sunday.selected as FormData['availability']['daySlots']['sunday']['selected'],
          touchDirtyValidate
        );
        break;
    }
  };
  const registered: any = () => {
    console.log(props.weekday);
    switch (props.short) {
      case 'mon':
        return { selectedRegister: { ...register('availability.daySlots.monday.selected') }, weekday: 'Monday' };
      case 'tue':
        return { selectedRegister: { ...register('availability.daySlots.tuesday.selected') }, weekday: 'Tuesday' };
      case 'wed':
        return { selectedRegister: { ...register('availability.daySlots.wednesday.selected') }, weekday: 'Wednesday' };
      case 'thu':
        return { selectedRegister: { ...register('availability.daySlots.thursday.selected') }, weekday: 'Thursday' };
      case 'fri':
        return { selectedRegister: { ...register('availability.daySlots.friday.selected') }, weekday: 'Friday' };
      case 'sat':
        return { selectedRegister: { ...register('availability.daySlots.saturday.selected') }, weekday: 'Saturday' };
      case 'sun':
        return { selectedRegister: { ...register('availability.daySlots.sunday.selected') }, weekday: 'Sunday' };
    }
  };
  return (
    <>
      <input
        {...registered().selectedRegister}
        type="checkbox"
        id={'weekday-' + props.short}
        value={registered()?.weekday}
        className={styles['step3__weekDayCheckbox'] + ' weekday'}
        onChange={(c) => toggleDay(c.target.value)}
      />
      <label className="bold" htmlFor={'weekday-' + props.short}>
        {props.shortest}
      </label>
    </>
  );
};
export default DaySelector;
