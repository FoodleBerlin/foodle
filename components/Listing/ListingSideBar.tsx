//TODO: Refactor FormData out from Wizard.tsx
import DaySelector from "../Create/DaySelector";
import TimeInput from "../Create/TimeInput";
import { FormData, touchDirtyValidate } from "../Create/wizard/Wizard";
import { useBookingContext } from "./BookingContext";
import styles from "./ListingSideBar.module.scss";


function ListingSideBar(props: { listingsData: FormData }) {
    const { register, setValue } = useBookingContext();
    const weekDays = useBookingContext().getValues().daySlots;
    const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = useBookingContext().getValues().daySlots;
    const bookingContext = useBookingContext();

    console.log(weekDays)
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
                    <div className={styles['listingoverview__weekDayCheckboxWrapper--week1'] + ' ' + styles['weekDays__container'] + ' ' + styles["sidebar__weekDayMargin"]}>
                        <div className={styles['weekDays__daysOfWeek']}>
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
                {console.log(bookingContext.getValues())}
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
                <button className={styles["sidebar__bookingbutton"]}>REQUEST TO BOOK</button>
            </div>
            <div className={styles["ownercard"]}>
                <div className={styles["ownercard__avatar"]}></div>
                <div className={styles["ownercard__profileinfo"]}>
                    <p className="bold">Mrs. Landloard</p>
                    <p>Since 2022</p>
                    <p className="bold">Super owner</p>
                </div>
            </div>

        </>
    );
}

export default ListingSideBar;