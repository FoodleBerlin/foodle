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
var Wizard_2 = require("./wizard/Wizard");
var Wizard_module_scss_1 = __importDefault(require("../Create/wizard/Wizard.module.scss"));
var TimeInput = function (props) {
    var shortest = props.shortest, short = props.short;
    var _a = (0, Wizard_1.useWizardContext)(), setValue = _a.setValue, register = _a.register;
    var setDayStartingTime = function (day, startingTime) {
        switch (day) {
            case 'Monday':
                return setValue('availability.daySlots.monday.startingTime', startingTime, Wizard_2.touchDirtyValidate);
            case 'Tuesday':
                return setValue('availability.daySlots.tuesday.startingTime', startingTime, Wizard_2.touchDirtyValidate);
            case 'Wednesday':
                return setValue('availability.daySlots.wednesday.startingTime', startingTime, Wizard_2.touchDirtyValidate);
            case 'Thursday':
                return setValue('availability.daySlots.thursday.startingTime', startingTime, Wizard_2.touchDirtyValidate);
            case 'Friday':
                return setValue('availability.daySlots.friday.startingTime', startingTime, Wizard_2.touchDirtyValidate);
            case 'Saturday':
                return setValue('availability.daySlots.saturday.startingTime', startingTime, Wizard_2.touchDirtyValidate);
            case 'Sunday':
                return setValue('availability.daySlots.sunday.startingTime', startingTime, Wizard_2.touchDirtyValidate);
        }
    };
    var setDayEndingTime = function (day, endingTime) {
        switch (day) {
            case 'Monday':
                return setValue('availability.daySlots.monday.endingTime', endingTime, Wizard_2.touchDirtyValidate);
            case 'Tuesday':
                return setValue('availability.daySlots.tuesday.endingTime', endingTime, Wizard_2.touchDirtyValidate);
            case 'Wednesday':
                return setValue('availability.daySlots.wednesday.endingTime', endingTime, Wizard_2.touchDirtyValidate);
            case 'Thursday':
                return setValue('availability.daySlots.thursday.endingTime', endingTime, Wizard_2.touchDirtyValidate);
            case 'Friday':
                return setValue('availability.daySlots.friday.endingTime', endingTime, Wizard_2.touchDirtyValidate);
            case 'Saturday':
                return setValue('availability.daySlots.saturday.endingTime', endingTime, Wizard_2.touchDirtyValidate);
            case 'Sunday':
                return setValue('availability.daySlots.sunday.endingTime', endingTime, Wizard_2.touchDirtyValidate);
        }
    };
    var registered = function () {
        switch (short) {
            case 'mon':
                return {
                    startRegister: __assign({}, register('availability.daySlots.monday.startingTime')),
                    endRegister: __assign({}, register('availability.daySlots.monday.endingTime')),
                    normalWeekString: 'Monday',
                };
            case 'tue':
                return {
                    startRegister: __assign({}, register('availability.daySlots.tuesday.startingTime')),
                    endRegister: __assign({}, register('availability.daySlots.tuesday.endingTime')),
                    normalWeekString: 'Tuesday',
                };
            case 'wed':
                return {
                    startRegister: __assign({}, register('availability.daySlots.wednesday.startingTime')),
                    endRegister: __assign({}, register('availability.daySlots.wednesday.endingTime')),
                    normalWeekString: 'Wednesday',
                };
            case 'thu':
                return {
                    startRegister: __assign({}, register('availability.daySlots.thursday.startingTime')),
                    endRegister: __assign({}, register('availability.daySlots.friday.endingTime')),
                    normalWeekString: 'Thursday',
                };
            case 'fri':
                return {
                    startRegister: __assign({}, register('availability.daySlots.friday.startingTime')),
                    endRegister: __assign({}, register('availability.daySlots.friday.endingTime')),
                    normalWeekString: 'Friday',
                };
            case 'sat':
                return {
                    startRegister: __assign({}, register('availability.daySlots.saturday.startingTime')),
                    endRegister: __assign({}, register('availability.daySlots.saturday.endingTime')),
                    normalWeekString: 'Saturday',
                };
            case 'sun':
                return {
                    startRegister: __assign({}, register('availability.daySlots.sunday.startingTime')),
                    endRegister: __assign({}, register('availability.daySlots.sunday.endingTime')),
                    normalWeekString: 'Sunday',
                };
        }
    };
    return (<span className={Wizard_module_scss_1.default['step3__timeInputWrapper'] + ' mb-one'}>
      <input type="checkbox" checked id={'time-' + short} className="weekday"/>
      <label className="bold" htmlFor={'time-' + short}>
        {shortest}
      </label>
      <input {...registered().startRegister} onChange={function (e) { return setDayStartingTime(registered.normalWeekString, e.target.value); }} className="standard-form__inputTime" type="time"/>
      <label className="small-text bold"> to</label>
      <input {...registered().endRegister} onChange={function (e) { return setDayEndingTime(registered.normalWeekString, e.target.value); }} className="standard-form__inputTime" type="time"/>
    </span>);
};
exports.default = TimeInput;
