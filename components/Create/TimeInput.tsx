import { useWizardContext } from '../Layout/wizard/Wizard';
import { FormData, touchDirtyValidate } from '../Layout/wizard/Wizard';
import styles from '../../components/Layout/wizard/Wizard.module.scss';
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
          'availability.daySlots.monday.startingTime',
          startingTime as FormData['availability']['daySlots']['monday']['startingTime'],
          touchDirtyValidate
        );
      case 'Tuesday':
        return setValue(
          'availability.daySlots.tuesday.startingTime',
          startingTime as FormData['availability']['daySlots']['tuesday']['startingTime'],
          touchDirtyValidate
        );
      case 'Wednesday':
        return setValue(
          'availability.daySlots.wednesday.startingTime',
          startingTime as FormData['availability']['daySlots']['wednesday']['startingTime'],
          touchDirtyValidate
        );
      case 'Thursday':
        return setValue(
          'availability.daySlots.thursday.startingTime',
          startingTime as FormData['availability']['daySlots']['thursday']['startingTime'],
          touchDirtyValidate
        );
      case 'Friday':
        return setValue(
          'availability.daySlots.friday.startingTime',
          startingTime as FormData['availability']['daySlots']['friday']['startingTime'],
          touchDirtyValidate
        );
      case 'Saturday':
        return setValue(
          'availability.daySlots.saturday.startingTime',
          startingTime as FormData['availability']['daySlots']['saturday']['startingTime'],
          touchDirtyValidate
        );
      case 'Sunday':
        return setValue(
          'availability.daySlots.sunday.startingTime',
          startingTime as FormData['availability']['daySlots']['sunday']['startingTime'],
          touchDirtyValidate
        );
    }
  };
  const setDayEndingTime = (day: string, endingTime: string) => {
    switch (day) {
      case 'Monday':
        return setValue(
          'availability.daySlots.monday.endingTime',
          endingTime as FormData['availability']['daySlots']['monday']['endingTime'],
          touchDirtyValidate
        );
      case 'Tuesday':
        return setValue(
          'availability.daySlots.tuesday.endingTime',
          endingTime as FormData['availability']['daySlots']['tuesday']['endingTime'],
          touchDirtyValidate
        );
      case 'Wednesday':
        return setValue(
          'availability.daySlots.wednesday.endingTime',
          endingTime as FormData['availability']['daySlots']['wednesday']['endingTime'],
          touchDirtyValidate
        );
      case 'Thursday':
        return setValue(
          'availability.daySlots.thursday.endingTime',
          endingTime as FormData['availability']['daySlots']['thursday']['endingTime'],
          touchDirtyValidate
        );
      case 'Friday':
        return setValue(
          'availability.daySlots.friday.endingTime',
          endingTime as FormData['availability']['daySlots']['friday']['endingTime'],
          touchDirtyValidate
        );
      case 'Saturday':
        return setValue(
          'availability.daySlots.saturday.endingTime',
          endingTime as FormData['availability']['daySlots']['saturday']['endingTime'],
          touchDirtyValidate
        );
      case 'Sunday':
        return setValue(
          'availability.daySlots.sunday.endingTime',
          endingTime as FormData['availability']['daySlots']['sunday']['endingTime'],
          touchDirtyValidate
        );
    }
  };
  const registered: any = () => {
    switch (short) {
      case 'mon':
        return {
          startRegister: { ...register('availability.daySlots.monday.startingTime') },
          endRegister: { ...register('availability.daySlots.monday.endingTime') },
          normalWeekString: 'Monday',
        };
      case 'tue':
        return {
          startRegister: { ...register('availability.daySlots.tuesday.startingTime') },
          endRegister: { ...register('availability.daySlots.tuesday.endingTime') },
          normalWeekString: 'Tuesday',
        };
      case 'wed':
        return {
          startRegister: { ...register('availability.daySlots.wednesday.startingTime') },
          endRegister: { ...register('availability.daySlots.wednesday.endingTime') },
          normalWeekString: 'Wednesday',
        };
      case 'thu':
        return {
          startRegister: { ...register('availability.daySlots.thursday.startingTime') },
          endRegister: { ...register('availability.daySlots.friday.endingTime') },
          normalWeekString: 'Thursday',
        };
      case 'fri':
        return {
          startRegister: { ...register('availability.daySlots.friday.startingTime') },
          endRegister: { ...register('availability.daySlots.friday.endingTime') },
          normalWeekString: 'Friday',
        };
      case 'sat':
        return {
          startRegister: { ...register('availability.daySlots.saturday.startingTime') },
          endRegister: { ...register('availability.daySlots.saturday.endingTime') },
          normalWeekString: 'Saturday',
        };
      case 'sun':
        return {
          startRegister: { ...register('availability.daySlots.sunday.startingTime') },
          endRegister: { ...register('availability.daySlots.sunday.endingTime') },
          normalWeekString: 'Sunday',
        };
    }
  };

  return (
    <span className={styles['step3__timeInputWrapper']}>
      <input type="checkbox" checked id={'time-' + short} className="weekday" />
      <label htmlFor={'time-' + short}>{shortest}</label>
      <input
        {...registered().startRegister}
        onChange={(e) => setDayStartingTime(registered.normalWeekString, e.target.value)}
        className="standard-form__inputTime"
        type="time"
      />
      <label className="body-text"> to</label>
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
