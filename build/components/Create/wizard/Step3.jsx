"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DaySelector_1 = __importDefault(require("../DaySelector"));
var TimeInput_1 = __importDefault(require("../TimeInput"));
var Wizard_1 = require("./Wizard");
var Wizard_module_scss_1 = __importDefault(require("./Wizard.module.scss"));
function Step3() {
    var _a, _b, _c, _d, _e, _f;
    var _g = (0, Wizard_1.useWizardContext)(), formState = _g.formState, nextStep = _g.nextStep, register = _g.register, setValue = _g.setValue;
    var _h = (0, Wizard_1.useWizardContext)().getValues().availability.daySlots, monday = _h.monday, tuesday = _h.tuesday, wednesday = _h.wednesday, thursday = _h.thursday, friday = _h.friday, saturday = _h.saturday, sunday = _h.sunday;
    return (<div className={Wizard_module_scss_1.default['step3']}>
      <div className={Wizard_module_scss_1.default['formItem']}>
        <h2 className={Wizard_module_scss_1.default['step2__marginHeadline'] + ' header-tertiary'}>How much is rent?</h2>
        <div className={Wizard_module_scss_1.default['step3__flexWrapper']}>
          <input className={Wizard_module_scss_1.default['step3__shortInput'] + ' standard-form'} type="number" id="hourlyPrice" {...register('hourlyPrice')} onChange={function (c) { return setValue('hourlyPrice', parseInt(c.target.value), Wizard_1.touchDirtyValidate); }}></input>
          <label htmlFor={'hourlyPrice'} className="body-text-secondary">
            € per hour
          </label>
        </div>
        {formState.errors.hourlyPrice && (<span className={Wizard_module_scss_1.default['error']}>{formState.errors.hourlyPrice.message}</span>)}
      </div>
      <div className={Wizard_module_scss_1.default['formItem']}>
        <h2 className={Wizard_module_scss_1.default['step2__marginHeadline'] + ' header-tertiary'}>Is there a deposit?</h2>
        <p className="body-text-secondary">
          This one time payment will be refunded at the end of the lease. If there is no deposit just type in 0.
        </p>
        <div className={Wizard_module_scss_1.default['step3__flexWrapper']}>
          <input className={Wizard_module_scss_1.default['step3__shortInput'] + ' standard-form'} type="number" {...register('deposit')} onChange={function (c) { return setValue('deposit', parseInt(c.target.value), Wizard_1.touchDirtyValidate); }}></input>
          <label className="body-text-secondary">€</label>
        </div>
        {formState.errors.deposit && <span className={Wizard_module_scss_1.default['error']}>{formState.errors.deposit.message}</span>}
      </div>
      <div className={Wizard_module_scss_1.default['formItem time-container']}>
        <h2 className={Wizard_module_scss_1.default['step2__marginHeadline'] + ' header-tertiary'}>When is it available?</h2>
        <label className="label-text">Starting</label> <br />
        <input className="standard-form" type="date" {...register('availability.startDate')} onChange={function (c) {
            console.log(c.target.value);
            setValue('availability.startDate', c.target.value, Wizard_1.touchDirtyValidate);
        }}></input>
        {((_a = formState.errors.availability) === null || _a === void 0 ? void 0 : _a.startDate) && (<span className={Wizard_module_scss_1.default['error']}>{(_b = formState.errors.availability) === null || _b === void 0 ? void 0 : _b.startDate.message}</span>)}
        {/* <--------- DAYS OF WEEK INPUTS ---------> */}
        <div className={Wizard_module_scss_1.default['step3__weekDaysSelector']}>
          <div className={Wizard_module_scss_1.default['step3__daysOfWeek']}>
            <label className="label-text">Days of week</label>
            <div className={Wizard_module_scss_1.default['step3__weekDayCheckboxWrapper']}>
              <DaySelector_1.default weekday={'Monday'} short={'mon'} shortest={'M'}/>
              <DaySelector_1.default weekday={'Tuesday'} short={'tue'} shortest={'T'}/>
              <DaySelector_1.default weekday={'Wednesday'} short={'wed'} shortest={'W'}/>
              <DaySelector_1.default weekday={'Thursday'} short={'thu'} shortest={'T'}/>
              <DaySelector_1.default weekday={'Friday'} short={'fri'} shortest={'F'}/>
              <DaySelector_1.default weekday={'Saturday'} short={'sat'} shortest={'S'}/>
              <DaySelector_1.default weekday={'Sunday'} short={'sun'} shortest={'S'}/>
            </div>
            {/* TODO: Add validation and error messages for all day inputs  */}
            {/* {formState.errors.availability?.days && (
          <span className={styles['error']}>{formState.errors.availability.days.map((e) => e.message)}</span>
        )} */}
          </div>
          <div className={Wizard_module_scss_1.default['step3__timeInput']}>
            {monday.selected && <TimeInput_1.default shortest={'M'} short={'mon'}/>}
            {tuesday.selected && <TimeInput_1.default shortest={'T'} short={'tue'}/>}
            {wednesday.selected && <TimeInput_1.default shortest={'W'} short={'wed'}/>}
            {thursday.selected && <TimeInput_1.default shortest={'T'} short={'thu'}/>}
            {friday.selected && <TimeInput_1.default shortest={'F'} short={'fri'}/>}
            {saturday.selected && <TimeInput_1.default shortest={'S'} short={'sat'}/>}
            {sunday.selected && <TimeInput_1.default shortest={'S'} short={'sun'}/>}
          </div>

          <div className={Wizard_module_scss_1.default['step3__weekRepeatSelect']}>
            <select className="standard-form__selectMedium" {...register('availability.repeat')} onChange={function (c) {
            setValue('availability.repeat', c.target.value, Wizard_1.touchDirtyValidate);
        }}>
              {' '}
              <option value="weekly">weekly</option>
              <option value="none">none</option>
            </select>
            <div className={Wizard_module_scss_1.default['step3__untilDatePicker']}>
              <label className="label-text">Until</label> <br />
              <input className="standard-form" type="date" {...register('availability.endDate')} onChange={function (c) {
            setValue('availability.endDate', c.target.value, Wizard_1.touchDirtyValidate);
        }}></input>
              {((_c = formState.errors.availability) === null || _c === void 0 ? void 0 : _c.endDate) && (<span className={Wizard_module_scss_1.default['error']}>{(_d = formState.errors.availability) === null || _d === void 0 ? void 0 : _d.endDate.message}</span>)}
            </div>
          </div>

          {((_e = formState.errors.availability) === null || _e === void 0 ? void 0 : _e.repeat) && (<span className={Wizard_module_scss_1.default['error']}>{(_f = formState.errors.availability) === null || _f === void 0 ? void 0 : _f.repeat.message}</span>)}
        </div>
      </div>
      <div className={Wizard_module_scss_1.default['formItem']}>
        <h2 className={Wizard_module_scss_1.default['step2__marginHeadline'] + ' header-tertiary'}>What are the rules?</h2>
        <p className="body-text-secondary mb-two">
          Please let the prospective booker know about cleanliness standards, key pick up and drop off processes, and
          anything else they should know.
        </p>
        <textarea className={'textArea standard-form'} {...register('rules')} onChange={function (c) {
            setValue('rules', c.target.value, Wizard_1.touchDirtyValidate);
        }}></textarea>
        {formState.errors.rules && <span className={Wizard_module_scss_1.default['error']}>{formState.errors.rules.message}</span>}
      </div>
      <div className={Wizard_module_scss_1.default['step2__formWrapper']}>
        <h2 className={Wizard_module_scss_1.default['step2__marginHeadline'] + ' header-tertiary'}>What’s the minimum stay?</h2>
        <div className={Wizard_module_scss_1.default['step2__flexWrapper']}>
          <input className="standard-form__inputSmall" placeholder="0" type="number" id="months" {...register('minMonths')} onChange={function (c) { return setValue('minMonths', parseInt(c.target.value), Wizard_1.touchDirtyValidate); }}></input>
          <label htmlFor="months" className={Wizard_module_scss_1.default['step2__label'] + ' body-text-secondary'}>
            Recurring months
          </label>
        </div>
        {formState.errors.minMonths && <span className={Wizard_module_scss_1.default['error']}>{formState.errors.minMonths.message}</span>}
      </div>
    </div>);
}
exports.default = Step3;
