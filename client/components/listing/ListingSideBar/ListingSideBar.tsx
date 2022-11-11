//TODO: Refactor FormData out from Wizard.tsx
import { AvailableDay, FrequencyEnum, useCreateBookingMutation } from "../../../codegen";
import { useAlertContext } from "../../../components/utilities/Alert/AlertContext";
import DaySelector from "../../create/DaySelector";
import TimeInput from "../../create/TimeInput";
import { FormData, touchDirtyValidate } from "../../create/wizard/Wizard";
import { useBookingContext } from "../BookingContext";
import styles from "./ListingSideBar.module.scss";


function ListingSideBar(props: { handle: string, owner: any }) {
    //TODO: REFACTOR
    const { register, setValue } = useBookingContext();
    const { shouldHide, setMessage } = useAlertContext();
    const weekDays = useBookingContext().getValues().daySlots;
    const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = useBookingContext().getValues().daySlots;
    const bookingContext = useBookingContext();
    const values = bookingContext.getValues();
    register("propertyHandle");
    setValue("propertyHandle", props.handle, touchDirtyValidate);

    const { mutate, data, isError, error } = useCreateBookingMutation({
        endpoint: process.env.NEXT_PUBLIC_SERVER_URL + 'graphql',
        fetchParams: {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    });

    function onSubmitt() {
        mutate({ propertyHandle: values.propertyHandle, startDate: new Date(values.startDate), endDate: new Date(values.endDate), frequency: values.frequency == FrequencyEnum.Monthly ? FrequencyEnum.Monthly : FrequencyEnum.Weekly, daySlots: convertToAvailableDays(values) })
        //A list of all errors that can occure
        const possibleErrors = [data?.createBooking.ClientErrorInvalidInput, data?.createBooking.ClientErrorInvalidPropertyInput, data?.createBooking.ClientErrorPropertyNotExists, data?.createBooking.ClientErrorPropertyNotExists, data?.createBooking.ClientErrorUserNotExists, data?.createBooking.NoAvailableSlots];
        if (isError) {
            setMessage((error ?? "Could not create booking!" as any).toString())
            shouldHide(false)
        }
        if (possibleErrors.some((v) => v != null)) {
            setMessage(((possibleErrors.filter((e) => e != null))[0]?.message) as string);
            shouldHide(false)
        }

    }




    return (
        <>
            <div className={styles["sidebar"]}>
                <div className={styles["sidebar__startDate"]}>
                    <h3 className={styles["sidebar__smallheading"]}>Starting week of</h3>
                    <input type="date" className={styles["sidebar__dateInputField"]} {...register('startDate')}
                        onChange={(c) => {
                            setValue('startDate', c.target.value as any, touchDirtyValidate);
                            bookingContext.setF();
                        }} />
                </div>
                <div className={styles["sidebar__dateTimeSelection"]}>
                    <h3 className={styles["sidebar__smallheading"]}>Days of the week</h3>
                    <div className={styles['sidebar__weekDayCheckboxWrapper--week1'] + ' ' + styles['weekDays__container'] + ' ' + styles["sidebar__weekDayMargin"]}>
                        <div className={'weekDays__daysOfWeek'}>
                            <div className={styles['weekDays__weekDayCheckboxWrapper']}>
                                <DaySelector weekday={'Monday'} short={'mon'} shortest={'M'} register={register} setValue={setValue} context={bookingContext} />
                                <DaySelector weekday={'Tuesday'} short={'tue'} shortest={'T'} register={register} setValue={setValue} context={bookingContext} />
                                <DaySelector weekday={'Wednesday'} short={'wed'} shortest={'W'} register={register} setValue={setValue} context={bookingContext} />
                                <DaySelector weekday={'Thursday'} short={'thu'} shortest={'T'} register={register} setValue={setValue} context={bookingContext} />
                                <DaySelector weekday={'Friday'} short={'fri'} shortest={'F'} register={register} setValue={setValue} context={bookingContext} />
                                <DaySelector weekday={'Saturday'} short={'sat'} shortest={'S'} register={register} setValue={setValue} context={bookingContext} />
                                <DaySelector weekday={'Sunday'} short={'sun'} shortest={'S'} register={register} setValue={setValue} context={bookingContext} />
                            </div>

                            {<div className={styles['sidebar__timeInput']}>
                                {monday.selected && <TimeInput shortest={'M'} short={'mon'} register={register} setValue={setValue} />}
                                {tuesday.selected && <TimeInput shortest={'T'} short={'tue'} register={register} setValue={setValue} />}
                                {wednesday.selected && <TimeInput shortest={'W'} short={'wed'} register={register} setValue={setValue} />}
                                {thursday.selected && <TimeInput shortest={'T'} short={'thu'} register={register} setValue={setValue} />}
                                {friday.selected && <TimeInput shortest={'F'} short={'fri'} register={register} setValue={setValue} />}
                                {saturday.selected && <TimeInput shortest={'S'} short={'sat'} register={register} setValue={setValue} />}
                                {sunday.selected && <TimeInput shortest={'S'} short={'sun'} register={register} setValue={setValue} />}
                            </div>}
                        </div>
                    </div>
                </div>

                {/* Add hidden label*/}
                <select id="repetition" className={styles["sidebar__repetition"]} {...register('frequency')}
                    onChange={(c) => {
                        setValue('frequency', c.target.value as FormData['frequency'], touchDirtyValidate);
                        bookingContext.setF();
                    }}>
                    <option value="weekly">Every week</option>
                    <option value="monthly">Every Month</option>
                </select>
                <div>
                    <h3 className={styles["sidebar__smallheading"]}>Until</h3>
                    <input type="date" className={styles["sidebar__dateInputField"]} {...register('endDate')}
                        onChange={(c) => {
                            setValue('endDate', c.target.value as any, touchDirtyValidate);
                            bookingContext.setF();
                        }} />
                </div>
                {/*TODO: For what ever reason all types need to be manually converted to their type again, if not the input will not be accepted*/}
                <button onClick={() => onSubmitt()} className={styles["sidebar__bookingbutton"]}>REQUEST TO BOOK</button>
            </div>
            <div className={styles["ownercard"]}>
                <div className={styles["ownercard__avatar"]}></div>
                <div className={styles["ownercard__profileinfo"]}>
                    {/*TODO: Extend owner properties! */}
                    <p className="bold">{props.owner.fullName}</p>
                    <p>Long time owner</p>
                    <p className="bold">Super owner</p>
                </div>
            </div>

        </>
    );
    function convertToAvailableDays(values: any) {
        let availableDays = Object.values(values.daySlots).map((value: any, index) => value.selected ? ({ startTime: parseTimeAsDateTime(value.startingTime), endTime: parseTimeAsDateTime(value.endingTime) } as AvailableDay) : null).filter((value: any) => value != null) as AvailableDay[];
        return availableDays;
    }
    function parseTimeAsDateTime(time: string) {
        let date = new Date("0000");//Set it to 0000 as we dont care for the date
        date.setHours(Number.parseInt(time.split(":")[0]))
        date.setMinutes(Number.parseInt(time.split(":")[1]))
        return date;
    }
}

export default ListingSideBar;