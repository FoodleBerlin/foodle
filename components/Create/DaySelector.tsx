import { UseFormRegister } from 'react-hook-form';
import styles from '../Create/wizard/Wizard.module.scss';
import { FormData, touchDirtyValidate } from './wizard/Wizard';

interface DaySelectorProps {
  weekday: string;
  short: string;
  shortest: string;
  setValue: (a: any, b: any, c: any) => void;
  register: UseFormRegister<any>;
  weekdays: any
}
const DaySelector = (props: DaySelectorProps) => {

  const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = props.weekdays;
  const toggleDay = (day: string) => {
    switch (day) {
      case 'Monday':
        props.setValue(
          'daySlots.monday.selected',
          !monday.selected as FormData['daySlots']['monday']['selected'],
          touchDirtyValidate
        );
        break;
      case 'Tuesday':
        props.setValue(
          'daySlots.tuesday.selected',
          !tuesday.selected as FormData['daySlots']['tuesday']['selected'],
          touchDirtyValidate
        );
        break;
      case 'Wednesday':
        props.setValue(
          'daySlots.wednesday.selected',
          !wednesday.selected as FormData['daySlots']['wednesday']['selected'],
          touchDirtyValidate
        );
        break;
      case 'Thursday':
        props.setValue(
          'daySlots.thursday.selected',
          !thursday.selected as FormData['daySlots']['thursday']['selected'],
          touchDirtyValidate
        );
        break;
      case 'Friday':
        props.setValue(
          'daySlots.friday.selected',
          !friday.selected as FormData['daySlots']['friday']['selected'],
          touchDirtyValidate
        );
        break;
      case 'Saturday':
        props.setValue(
          'daySlots.saturday.selected',
          !saturday.selected as FormData['daySlots']['saturday']['selected'],
          touchDirtyValidate
        );
        break;
      case 'Sunday':
        props.setValue(
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
        return { selectedRegister: { ...props.register('daySlots.monday.selected') }, weekday: 'Monday' };
      case 'tue':
        return { selectedRegister: { ...props.register('daySlots.tuesday.selected') }, weekday: 'Tuesday' };
      case 'wed':
        return { selectedRegister: { ...props.register('daySlots.wednesday.selected') }, weekday: 'Wednesday' };
      case 'thu':
        return { selectedRegister: { ...props.register('daySlots.thursday.selected') }, weekday: 'Thursday' };
      case 'fri':
        return { selectedRegister: { ...props.register('daySlots.friday.selected') }, weekday: 'Friday' };
      case 'sat':
        return { selectedRegister: { ...props.register('daySlots.saturday.selected') }, weekday: 'Saturday' };
      case 'sun':
        return { selectedRegister: { ...props.register('daySlots.sunday.selected') }, weekday: 'Sunday' };
    }
  };
  return (
    <>
      <input
        {...registered().selectedRegister}
        type="checkbox"
        id={'weekday-' + props.short}
        value={registered()?.weekday}
        className={styles['weekDays__weekDayCheckbox'] + ' weekday'}
        onChange={(c) => toggleDay(c.target.value)}
      />
      <label className="bold" htmlFor={'weekday-' + props.short}>
        {props.shortest}
      </label>
    </>
  );
};
export default DaySelector;
