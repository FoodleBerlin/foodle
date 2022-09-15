//TODO: Refactor FormData out from Wizard.tsx
import { FormData } from "../Create/wizard/Wizard";
import styles from "./ListingSideBar.module.scss";


function ListingSideBar(props: { listingsData: FormData }) {
    return (
        <>
            <div className={styles["sidebarcontainer"]}>
                <div className={styles["startdate"]}>
                    <h3>Starting week of</h3>
                    <input type="date" name="date" id="date" />
                </div>
                <div>
                    <h3>Days of the week</h3>
                    <div className={styles['listingoverview__weekDayCheckboxWrapper--week1'] + ' ' + styles['weekDays__container']}>
                        <>{Object.keys(props.listingsData.daySlots).map((day, index) =>
                            <>
                                <input type="checkbox" id={"1-weekday-" + day.slice(0, 2)} className={styles['weekDays__checkbox'] + ' weekday'} checked={false} />
                                <label htmlFor={"1-weekday-" + day.slice(0, 2)}>{day[0].toUpperCase()}</label></>)
                        }</>
                    </div>
                </div>
                {/* Display time selectors here for each day*/}
                {/* Add hidden label*/}
                <select name="repetition" id="repetition">
                    <option value="weekly">Every week</option>
                    <option value="monthly">Every Month</option>
                </select>
                <div>
                    <h3>Until</h3>
                    <input type="date" name="date" id="date" />
                </div>
                <button>Request to book</button>
                <div className={styles["ownercard"]}>
                    <div className={styles["ownercard__grid"]}>
                        <div className={styles["ownercard___avatar"]}></div>
                        <p>Mrs. Landloard</p>
                        <p>Since 2022</p>
                        <p>Super owner</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListingSideBar;