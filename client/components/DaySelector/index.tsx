import { UseFormRegister } from 'react-hook-form';
import { FormData, touchDirtyValidate, WizardContext } from '../Create/wizard/Wizard';
import { BookingContext } from '../Listing/BookingContext';

///Checks if a context is a [BookingContext]
function isBookingContext(
  context: BookingContext | WizardContext
): context is BookingContext {
  return (context as BookingContext).setF !== undefined
}

interface DaySelectorProps {
  weekday: string;
  short: string;
  shortest: string;
  setValue: (a: any, b: any, c: any) => void;
  register: UseFormRegister<any>;
  context: BookingContext | WizardContext;
}
const DaySelector = (props: DaySelectorProps) => {
  const context = props.context;
  const toggleDay = (day: string) => {
    switch (day) {
      case 'Monday':
        props.setValue(
          'daySlots.monday.selected',
          !context.getValues().daySlots.monday.selected as FormData['daySlots']['monday']['selected'],
          touchDirtyValidate
        );
        ///Workaround to force rerender
        isBookingContext(context) ? (context as BookingContext).setF() : null;

        break;
      case 'Tuesday':

        props.setValue(
          'daySlots.tuesday.selected',
          !context.getValues().daySlots.tuesday.selected as FormData['daySlots']['tuesday']['selected'],
          touchDirtyValidate
        );
        isBookingContext(context) ? (context as BookingContext).setF() : null;

        break;
      case 'Wednesday':

        props.setValue(
          'daySlots.wednesday.selected',
          !context.getValues().daySlots.wednesday.selected as FormData['daySlots']['wednesday']['selected'],
          touchDirtyValidate
        );
        isBookingContext(context) ? (context as BookingContext).setF() : null;

        break;
      case 'Thursday':
        props.setValue(
          'daySlots.thursday.selected',
          !context.getValues().daySlots.thursday.selected as FormData['daySlots']['thursday']['selected'],
          touchDirtyValidate
        );
        typeof context === typeof BookingContext ? (context as BookingContext).setF() : null;
        break;
      case 'Friday':
        props.setValue(
          'daySlots.friday.selected',
          !context.getValues().daySlots.friday.selected as FormData['daySlots']['friday']['selected'],
          touchDirtyValidate
        );
        isBookingContext(context) ? (context as BookingContext).setF() : null;
        break;
      case 'Saturday':
        props.setValue(
          'daySlots.saturday.selected',
          !context.getValues().daySlots.saturday.selected as FormData['daySlots']['saturday']['selected'],
          touchDirtyValidate
        );
        isBookingContext(context) ? (context as BookingContext).setF() : null;
        break;
      case 'Sunday':
        props.setValue(
          'daySlots.sunday.selected',
          !context.getValues().daySlots.sunday.selected as FormData['daySlots']['sunday']['selected'],
          touchDirtyValidate
        );
        isBookingContext(context) ? (context as BookingContext).setF() : null;
        break;
    }
  };
  const registered: any = () => {
    switch (props.short) {
      case 'mon':
        return { selectedRegister: props.register('daySlots.monday.selected'), weekday: 'Monday' };
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
        className={'weekDays__weekDayCheckbox' + ' weekday'}
        onChange={(c) => toggleDay(c.target.value)}
      />
      <label className="bold" htmlFor={'weekday-' + props.short}>
        {props.shortest}
      </label>
    </>
  );
};
export default DaySelector;