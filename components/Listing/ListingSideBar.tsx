//TODO: Refactor FormData out from Wizard.tsx
import DaySelector from "../Create/DaySelector";
import TimeInput from "../Create/TimeInput";
import { FormData } from "../Create/wizard/Wizard";
import { useBookingContext } from "./BookingContext";
import styles from "./ListingSideBar.module.scss";


function ListingSideBar(props: { listingsData: FormData }) {
    const { register, setValue } = useBookingContext();
    const weekDays = useBookingContext().getValues().daySlots;
    const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = useBookingContext().getValues().daySlots;

    console.log(weekDays)
    return (
        <>
            <div className={styles["sidebar"]}>
                <div className={styles["sidebar__startDate"]}>
                    <h3 className={styles["sidebar__smallheading"]}>Starting week of</h3>
                    <input type="date" name="date" className={styles["sidebar__dateInputField"]} />
                </div>
                <div className={styles["sidebar__dateTimeSelection"]}>
                    <h3 className={styles["sidebar__smallheading"]}>Days of the week</h3>
                    <div className={styles['listingoverview__weekDayCheckboxWrapper--week1'] + ' ' + styles['weekDays__container'] + ' ' + styles["sidebar__weekDayMargin"]}>
                        <div className={styles['weekDays__daysOfWeek']}>
                            <div className={styles['weekDays__weekDayCheckboxWrapper']}>
                                <DaySelector weekday={'Monday'} short={'mon'} shortest={'M'} register={register} setValue={setValue} weekdays={weekDays} />
                                <DaySelector weekday={'Tuesday'} short={'tue'} shortest={'T'} register={register} setValue={setValue} weekdays={weekDays} />
                                <DaySelector weekday={'Wednesday'} short={'wed'} shortest={'W'} register={register} setValue={setValue} weekdays={weekDays} />
                                <DaySelector weekday={'Thursday'} short={'thu'} shortest={'T'} register={register} setValue={setValue} weekdays={weekDays} />
                                <DaySelector weekday={'Friday'} short={'fri'} shortest={'F'} register={register} setValue={setValue} weekdays={weekDays} />
                                <DaySelector weekday={'Saturday'} short={'sat'} shortest={'S'} register={register} setValue={setValue} weekdays={weekDays} />
                                <DaySelector weekday={'Sunday'} short={'sun'} shortest={'S'} register={register} setValue={setValue} weekdays={weekDays} />
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
                <select name="repetition" id="repetition" className={styles["sidebar__repetition"]}>
                    <option value="weekly">Every week</option>
                    <option value="monthly">Every Month</option>
                </select>
                <div>
                    <h3 className={styles["sidebar__smallheading"]}>Until</h3>
                    <input type="date" className={styles["sidebar__dateInputField"]} />
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