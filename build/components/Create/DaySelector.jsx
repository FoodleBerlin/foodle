"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Wizard_1 = require("./wizard/Wizard");
var Wizard_module_scss_1 = __importDefault(require("../Create/wizard/Wizard.module.scss"));
var Wizard_2 = require("./wizard/Wizard");
var DaySelector = function (props) {
    var _a;
    var _b = (0, Wizard_1.useWizardContext)(), register = _b.register, setValue = _b.setValue;
    var _c = (0, Wizard_1.useWizardContext)().getValues().availability.daySlots, monday = _c.monday, tuesday = _c.tuesday, wednesday = _c.wednesday, thursday = _c.thursday, friday = _c.friday, saturday = _c.saturday, sunday = _c.sunday;
    var toggleDay = function (day) {
        switch (day) {
            case 'Monday':
                setValue('availability.daySlots.monday.selected', !monday.selected, Wizard_2.touchDirtyValidate);
                break;
            case 'Tuesday':
                setValue('availability.daySlots.tuesday.selected', !tuesday.selected, Wizard_2.touchDirtyValidate);
                break;
            case 'Wednesday':
                setValue('availability.daySlots.wednesday.selected', !wednesday.selected, Wizard_2.touchDirtyValidate);
                break;
            case 'Thursday':
                setValue('availability.daySlots.thursday.selected', !thursday.selected, Wizard_2.touchDirtyValidate);
                break;
            case 'Friday':
                setValue('availability.daySlots.friday.selected', !friday.selected, Wizard_2.touchDirtyValidate);
                break;
            case 'Saturday':
                setValue('availability.daySlots.saturday.selected', !saturday.selected, Wizard_2.touchDirtyValidate);
                break;
            case 'Sunday':
                setValue('availability.daySlots.sunday.selected', !sunday.selected, Wizard_2.touchDirtyValidate);
                break;
        }
    };
    var registered = function () {
        console.log(props.weekday);
        switch (props.short) {
            case 'mon':
                return { selectedRegister: __assign({}, register('availability.daySlots.monday.selected')), weekday: 'Monday' };
            case 'tue':
                return { selectedRegister: __assign({}, register('availability.daySlots.tuesday.selected')), weekday: 'Tuesday' };
            case 'wed':
                return { selectedRegister: __assign({}, register('availability.daySlots.wednesday.selected')), weekday: 'Wednesday' };
            case 'thu':
                return { selectedRegister: __assign({}, register('availability.daySlots.thursday.selected')), weekday: 'Thursday' };
            case 'fri':
                return { selectedRegister: __assign({}, register('availability.daySlots.friday.selected')), weekday: 'Friday' };
            case 'sat':
                return { selectedRegister: __assign({}, register('availability.daySlots.saturday.selected')), weekday: 'Saturday' };
            case 'sun':
                return { selectedRegister: __assign({}, register('availability.daySlots.sunday.selected')), weekday: 'Sunday' };
        }
    };
    return (<>
      <input {...registered().selectedRegister} type="checkbox" id={'weekday-' + props.short} value={(_a = registered()) === null || _a === void 0 ? void 0 : _a.weekday} className={Wizard_module_scss_1.default['step3__weekDayCheckbox'] + ' weekday'} onChange={function (c) { return toggleDay(c.target.value); }}/>
      <label className="bold" htmlFor={'weekday-' + props.short}>
        {props.shortest}
      </label>
    </>);
};
exports.default = DaySelector;
