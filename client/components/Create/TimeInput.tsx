import styles from '../Create/wizard/Wizard.module.scss';
import { FormData, touchDirtyValidate, useWizardContext } from './wizard/Wizard';
interface TimeInputProps {
  shortest: string;
  short: string;
}
const TimeInput = (props: TimeInputProps) => {
  let shortest = props.shortest,
    short = props.short;
  const { setValue, register } = useWizardContext();
  const setDayStartingTime = (day: string, startingTime: string) => {
    switch (day) {
      case 'Monday':
        return setValue(
          'daySlots.monday.startingTime',
          startingTime as FormData['daySlots']['monday']['startingTime'],
          touchDirtyValidate
        );
      case 'Tuesday':
        return setValue(
          'daySlots.tuesday.startingTime',
          startingTime as FormData['daySlots']['tuesday']['startingTime'],
          touchDirtyValidate
        );
      case 'Wednesday':
        return setValue(
          'daySlots.wednesday.startingTime',
          startingTime as FormData['daySlots']['wednesday']['startingTime'],
          touchDirtyValidate
        );
      case 'Thursday':
        return setValue(
          'daySlots.thursday.startingTime',
          startingTime as FormData['daySlots']['thursday']['startingTime'],
          touchDirtyValidate
        );
      case 'Friday':
        return setValue(
          'daySlots.friday.startingTime',
          startingTime as FormData['daySlots']['friday']['startingTime'],
          touchDirtyValidate
        );
      case 'Saturday':
        return setValue(
          'daySlots.saturday.startingTime',
          startingTime as FormData['daySlots']['saturday']['startingTime'],
          touchDirtyValidate
        );
      case 'Sunday':
        return setValue(
          'daySlots.sunday.startingTime',
          startingTime as FormData['daySlots']['sunday']['startingTime'],
          touchDirtyValidate
        );
    }
  };
  const setDayEndingTime = (day: string, endingTime: string) => {
    switch (day) {
      case 'Monday':
        return setValue(
          'daySlots.monday.endingTime',
          endingTime as FormData['daySlots']['monday']['endingTime'],
          touchDirtyValidate
        );
      case 'Tuesday':
        return setValue(
          'daySlots.tuesday.endingTime',
          endingTime as FormData['daySlots']['tuesday']['endingTime'],
          touchDirtyValidate
        );
      case 'Wednesday':
        return setValue(
          'daySlots.wednesday.endingTime',
          endingTime as FormData['daySlots']['wednesday']['endingTime'],
          touchDirtyValidate
        );
      case 'Thursday':
        return setValue(
          'daySlots.thursday.endingTime',
          endingTime as FormData['daySlots']['thursday']['endingTime'],
          touchDirtyValidate
        );
      case 'Friday':
        return setValue(
          'daySlots.friday.endingTime',
          endingTime as FormData['daySlots']['friday']['endingTime'],
          touchDirtyValidate
        );
      case 'Saturday':
        return setValue(
          'daySlots.saturday.endingTime',
          endingTime as FormData['daySlots']['saturday']['endingTime'],
          touchDirtyValidate
        );
      case 'Sunday':
        return setValue(
          'daySlots.sunday.endingTime',
          endingTime as FormData['daySlots']['sunday']['endingTime'],
          touchDirtyValidate
        );
    }
  };
  const registered: any = () => {
    switch (short) {
      case 'mon':
        return {
          startRegister: { ...register('daySlots.monday.startingTime') },
          endRegister: { ...register('daySlots.monday.endingTime') },
          normalWeekString: 'Monday',
        };
      case 'tue':
        return {
          startRegister: { ...register('daySlots.tuesday.startingTime') },
          endRegister: { ...register('daySlots.tuesday.endingTime') },
          normalWeekString: 'Tuesday',
        };
      case 'wed':
        return {
          startRegister: { ...register('daySlots.wednesday.startingTime') },
          endRegister: { ...register('daySlots.wednesday.endingTime') },
          normalWeekString: 'Wednesday',
        };
      case 'thu':
        return {
          startRegister: { ...register('daySlots.thursday.startingTime') },
          endRegister: { ...register('daySlots.friday.endingTime') },
          normalWeekString: 'Thursday',
        };
      case 'fri':
        return {
          startRegister: { ...register('daySlots.friday.startingTime') },
          endRegister: { ...register('daySlots.friday.endingTime') },
          normalWeekString: 'Friday',
        };
      case 'sat':
        return {
          startRegister: { ...register('daySlots.saturday.startingTime') },
          endRegister: { ...register('daySlots.saturday.endingTime') },
          normalWeekString: 'Saturday',
        };
      case 'sun':
        return {
          startRegister: { ...register('daySlots.sunday.startingTime') },
          endRegister: { ...register('daySlots.sunday.endingTime') },
          normalWeekString: 'Sunday',
        };
    }
  };

  return (
    <span className={styles['step3__timeInputWrapper'] + ' mb-one'}>
      <input type="checkbox" checked id={'time-' + short} className="weekday" />
      <label className="bold" htmlFor={'time-' + short}>
        {shortest}
      </label>
      <input
        {...registered().startRegister}
        onChange={(e) => setDayStartingTime(registered.normalWeekString, e.target.value)}
        className="standard-form__inputTime"
        type="time"
      />
      <label className="small-text bold"> to</label>
      <input
        {...registered().endRegister}
        onChange={(e) => setDayEndingTime(registered.normalWeekString, e.target.value)}
        className="standard-form__inputTime"
        type="time"
      />
    </span>
  );
};
export default TimeInput;
