import { useWizardContext } from '../Layout/wizard/Wizard';
import { FormData } from '../Layout/wizard/Wizard';
import { shouldValidate } from '../Layout/wizard/Step3';
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
          shouldValidate
        );
      case 'Tuesday':
        return setValue(
          'availability.daySlots.tuesday.startingTime',
          startingTime as FormData['availability']['daySlots']['tuesday']['startingTime'],
          shouldValidate
        );
      case 'Wednesday':
        return setValue(
          'availability.daySlots.wednesday.startingTime',
          startingTime as FormData['availability']['daySlots']['wednesday']['startingTime'],
          shouldValidate
        );
      case 'Thursday':
        return setValue(
          'availability.daySlots.thursday.startingTime',
          startingTime as FormData['availability']['daySlots']['thursday']['startingTime'],
          shouldValidate
        );
      case 'Friday':
        return setValue(
          'availability.daySlots.friday.startingTime',
          startingTime as FormData['availability']['daySlots']['friday']['startingTime'],
          shouldValidate
        );
      case 'Saturday':
        return setValue(
          'availability.daySlots.saturday.startingTime',
          startingTime as FormData['availability']['daySlots']['saturday']['startingTime'],
          shouldValidate
        );
      case 'Sunday':
        return setValue(
          'availability.daySlots.sunday.startingTime',
          startingTime as FormData['availability']['daySlots']['sunday']['startingTime'],
          shouldValidate
        );
    }
  };
  const setDayEndingTime = (day: string, endingTime: string) => {
    switch (day) {
      case 'Monday':
        return setValue(
          'availability.daySlots.monday.endingTime',
          endingTime as FormData['availability']['daySlots']['monday']['endingTime'],
          shouldValidate
        );
      case 'Tuesday':
        return setValue(
          'availability.daySlots.tuesday.endingTime',
          endingTime as FormData['availability']['daySlots']['tuesday']['endingTime'],
          shouldValidate
        );
      case 'Wednesday':
        return setValue(
          'availability.daySlots.wednesday.endingTime',
          endingTime as FormData['availability']['daySlots']['wednesday']['endingTime'],
          shouldValidate
        );
      case 'Thursday':
        return setValue(
          'availability.daySlots.thursday.endingTime',
          endingTime as FormData['availability']['daySlots']['thursday']['endingTime'],
          shouldValidate
        );
      case 'Friday':
        return setValue(
          'availability.daySlots.friday.endingTime',
          endingTime as FormData['availability']['daySlots']['friday']['endingTime'],
          shouldValidate
        );
      case 'Saturday':
        return setValue(
          'availability.daySlots.saturday.endingTime',
          endingTime as FormData['availability']['daySlots']['saturday']['endingTime'],
          shouldValidate
        );
      case 'Sunday':
        return setValue(
          'availability.daySlots.sunday.endingTime',
          endingTime as FormData['availability']['daySlots']['sunday']['endingTime'],
          shouldValidate
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
