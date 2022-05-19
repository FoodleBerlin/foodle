"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Wizard_1 = require("./Wizard");
var Wizard_module_scss_1 = __importDefault(require("./Wizard.module.scss"));
var Facility_1 = __importDefault(require("../Facility"));
function Step2() {
    var _a, _b;
    var _c = (0, Wizard_1.useWizardContext)(), formState = _c.formState, nextStep = _c.nextStep, register = _c.register, setValue = _c.setValue;
    return (<div className={Wizard_module_scss_1.default['step2']}>
      <div className={Wizard_module_scss_1.default['step2__formWrapper']}>
        <div className={Wizard_module_scss_1.default['formItem']}>
          <h2 className={' header-tertiary'}>How would you describe the space?</h2>
          <p className="body-text-secondary">
            This is what users will see as the description under the overview tab on the listing page.
          </p>
          <div className={Wizard_module_scss_1.default['step1__flexWrapper']}>
            <textarea className="textArea standard-form" {...register('description')} onChange={function (c) { return setValue('description', c.target.value, Wizard_1.touchDirtyValidate); }} style={{ width: '100%' }}></textarea>
          </div>
          {formState.errors.description && (<span className={Wizard_module_scss_1.default['error']}>{formState.errors.description.message}</span>)}
        </div>
        <div className={Wizard_module_scss_1.default['formItem']}>
          <h2 className={Wizard_module_scss_1.default['step2__marginHeadline'] + ' header-tertiary mb-two'}>
            What features does your kitchen offer?
          </h2>

          <div className={Wizard_module_scss_1.default['step2__buttonsGridWrapper']}>
            {['Unfurnished', 'A/C', 'Elevator', 'Storefront', 'Parking', 'Dishwasher', 'Heating', 'Water', 'Oven'].map(function (facilityString, index) {
            return <Facility_1.default key={index + 1} facility={facilityString} id={index + 1}/>;
        })}
            {((_a = formState === null || formState === void 0 ? void 0 : formState.errors) === null || _a === void 0 ? void 0 : _a.facilities) && (<span className={Wizard_module_scss_1.default['error']}>{((_b = formState === null || formState === void 0 ? void 0 : formState.errors) === null || _b === void 0 ? void 0 : _b.facilities).message}</span>)}
          </div>
        </div>
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
exports.default = Step2;
