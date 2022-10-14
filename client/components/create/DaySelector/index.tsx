import { FormData, touchDirtyValidate, useWizardContext } from '../wizard/Wizard';
import styles from './DaySelector.module.scss';

interface DaySelectorProps {
  weekday: string;
  short: string;
  shortest: string;
}
const DaySelector = (props: DaySelectorProps) => {
  const { register, setValue } = useWizardContext();

  const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = useWizardContext().getValues().daySlots;
  const toggleDay = (day: string) => {
    switch (day) {
      case 'Monday':
        setValue(
          'daySlots.monday.selected',
          !monday.selected as FormData['daySlots']['monday']['selected'],
          touchDirtyValidate
        );
        break;
      case 'Tuesday':
        setValue(
          'daySlots.tuesday.selected',
          !tuesday.selected as FormData['daySlots']['tuesday']['selected'],
          touchDirtyValidate
        );
        break;
      case 'Wednesday':
        setValue(
          'daySlots.wednesday.selected',
          !wednesday.selected as FormData['daySlots']['wednesday']['selected'],
          touchDirtyValidate
        );
        break;
      case 'Thursday':
        setValue(
          'daySlots.thursday.selected',
          !thursday.selected as FormData['daySlots']['thursday']['selected'],
          touchDirtyValidate
        );
        break;
      case 'Friday':
        setValue(
          'daySlots.friday.selected',
          !friday.selected as FormData['daySlots']['friday']['selected'],
          touchDirtyValidate
        );
        break;
      case 'Saturday':
        setValue(
          'daySlots.saturday.selected',
          !saturday.selected as FormData['daySlots']['saturday']['selected'],
          touchDirtyValidate
        );
        break;
      case 'Sunday':
        setValue(
          'daySlots.sunday.selected',
          !sunday.selected as FormData['daySlots']['sunday']['selected'],
          touchDirtyValidate
        );
        break;
    }
  };
  const registered: any = () => {
    switch (props.short) {
      case 'mon':
        return { selectedRegister: { ...register('daySlots.monday.selected') }, weekday: 'Monday' };
      case 'tue':
        return { selectedRegister: { ...register('daySlots.tuesday.selected') }, weekday: 'Tuesday' };
      case 'wed':
        return { selectedRegister: { ...register('daySlots.wednesday.selected') }, weekday: 'Wednesday' };
      case 'thu':
        return { selectedRegister: { ...register('daySlots.thursday.selected') }, weekday: 'Thursday' };
      case 'fri':
        return { selectedRegister: { ...register('daySlots.friday.selected') }, weekday: 'Friday' };
      case 'sat':
        return { selectedRegister: { ...register('daySlots.saturday.selected') }, weekday: 'Saturday' };
      case 'sun':
        return { selectedRegister: { ...register('daySlots.sunday.selected') }, weekday: 'Sunday' };
    }
  };
  return (
    <>
      <input
        {...registered().selectedRegister}
        type="checkbox"
        id={'weekday-' + props.short}
        value={registered()?.weekday}
        className={styles['weekDayCheckbox']}
        onChange={(c) => toggleDay(c.target.value)}
      />
      <label className="bold" htmlFor={'weekday-' + props.short}>
        {props.shortest}
      </label>
    </>
  );
};
export default DaySelector;
