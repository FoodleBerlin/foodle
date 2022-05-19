"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Wizard_1 = require("./wizard/Wizard");
var Wizard_2 = require("./wizard/Wizard");
var Wizard_module_scss_1 = __importDefault(require("../Create/wizard/Wizard.module.scss"));
var Facility = function (props) {
    var _a = (0, Wizard_1.useWizardContext)(), setValue = _a.setValue, register = _a.register;
    var wizardContext = (0, Wizard_1.useWizardContext)();
    /*
    toggle handler function that allows user to select and deselect a feature
    */
    var toggleFeature = function (feature) {
        /*
        when feature is already in the wizardContext, it will be deleted
        */
        if (__spreadArray([], wizardContext.getValues().facilities, true).includes(feature)) {
            setValue('facilities', __spreadArray([], wizardContext.getValues().facilities, true).filter(function (x) { return x !== feature; }), Wizard_2.touchDirtyValidate);
            /*
            when 'Unfurnished' is already clicked, unclick and delete it from
            wizardContext as soon as one of the other feature is clicked
            */
        }
        else if (__spreadArray([], wizardContext.getValues().facilities, true).includes('Unfurnished')) {
            setValue('facilities', __spreadArray([], wizardContext.getValues().facilities, true).filter(function (x) { return x !== 'Unfurnished'; }), Wizard_2.touchDirtyValidate);
            setValue('facilities', __spreadArray(__spreadArray([], wizardContext.getValues().facilities, true), [feature], false), Wizard_2.touchDirtyValidate);
            /*
            when 'Unfurnished' is clicked again, unclick and delete all the other features so that
            just 'Unfurnished' is back in the wizardContext
            */
        }
        else if (feature === 'Unfurnished') {
            setValue('facilities', __spreadArray([], wizardContext.getValues().facilities, true).filter(function (x) { return x === 'Unfurnished'; }), Wizard_2.touchDirtyValidate);
            setValue('facilities', __spreadArray(__spreadArray([], wizardContext.getValues().facilities, true), ['Unfurnished'], false), Wizard_2.touchDirtyValidate);
            // in any other case the clicked feature will be added to the wizardContext
        }
        else {
            setValue('facilities', __spreadArray(__spreadArray([], wizardContext.getValues().facilities, true), [feature], false), Wizard_2.touchDirtyValidate);
        }
    };
    return (<>
      <input {...register('facilities')} type="checkbox" value={props.facility} id={'features' + props.id} className="checkbox" name={'features' + props.id} onChange={function (c) { return toggleFeature(c.target.value); }}></input>
      <label className={Wizard_module_scss_1.default['labelButton'] + ' small-text'} htmlFor={'features' + props.id}>
        {props.facility}
      </label>
    </>);
};
exports.default = Facility;
