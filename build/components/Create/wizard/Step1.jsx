"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Wizard_1 = require("./Wizard");
var Wizard_module_scss_1 = __importDefault(require("./Wizard.module.scss"));
function Step1() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    var _l = (0, Wizard_1.useWizardContext)(), formState = _l.formState, nextStep = _l.nextStep, register = _l.register, setValue = _l.setValue;
    return (<div className={Wizard_module_scss_1.default['step1']}>
      <div className={Wizard_module_scss_1.default['formItem']}>
        <h2 className="header-tertiary">What kind of property do you own?</h2>
        <div className={Wizard_module_scss_1.default['step1__buttonWrapper']}>
          <input {...register('partialSpace')} type="radio" id="full" className="radio" name="kitchen" value="full" onChange={function (c) { return setValue('partialSpace', c.target.value, Wizard_1.touchDirtyValidate); }}/>
          <label className={Wizard_module_scss_1.default['labelButton']} htmlFor="full">
            <p className="body-text__small">Entire Kitchen</p>
          </label>

          <input {...register('partialSpace')} type="radio" id="partial" className="radio" name="kitchen" value="partial" onChange={function (c) { return setValue('partialSpace', c.target.value, Wizard_1.touchDirtyValidate); }}/>
          <label className={Wizard_module_scss_1.default['labelButton']} htmlFor="partial">
            <p className="body-text__small">Part of kitchen</p>
          </label>
          {formState.errors.partialSpace && (<span className={Wizard_module_scss_1.default['error']}>{formState.errors.partialSpace.message}</span>)}
        </div>
      </div>
      <div className={Wizard_module_scss_1.default['formItem']}>
        <h2 className="header-tertiary">How big is the kitchen?</h2>
        <div className={Wizard_module_scss_1.default['step1__flexWrapper']}>
          <input className={'standard-form__inputMedium'} placeholder="200" type="number" {...register('size')} onChange={function (c) { return setValue('size', parseInt(c.target.value), Wizard_1.touchDirtyValidate); }}></input>
          <label className={Wizard_module_scss_1.default['step1__label'] + ' body-text-secondary'}>Size in square meters</label>
        </div>
        {formState.errors.size && <span className={Wizard_module_scss_1.default['error']}>{formState.errors.size.message}</span>}
      </div>
      <div className={Wizard_module_scss_1.default['formItem']}>
        <h2 className={Wizard_module_scss_1.default['step1__addressHeader'] + ' header-tertiary'}>Where is it located?</h2>
        <label className="label-text">Address</label>
        <div className={Wizard_module_scss_1.default['step1__addressGridWrapper']}>
          <input className={Wizard_module_scss_1.default['step1__input--street'] + ' standard-form'} placeholder="Foodlestraße" {...register('location.street')} onChange={function (c) { return setValue('location.street', c.target.value, Wizard_1.touchDirtyValidate); }}></input>
          {((_a = formState.errors.location) === null || _a === void 0 ? void 0 : _a.street) && (<span className={Wizard_module_scss_1.default['error'] + ' ' + Wizard_module_scss_1.default['step1__validationSpan--street']}>
              {(_b = formState.errors.location) === null || _b === void 0 ? void 0 : _b.street.message}
            </span>)}
          <input className={Wizard_module_scss_1.default['step1__input--number'] + ' standard-form'} placeholder="12" type="number" {...register('location.number')} onChange={function (c) { return setValue('location.number', parseInt(c.target.value), Wizard_1.touchDirtyValidate); }}></input>
          {((_c = formState.errors.location) === null || _c === void 0 ? void 0 : _c.number) && (<span className={Wizard_module_scss_1.default['error'] + ' ' + Wizard_module_scss_1.default['step1__validationSpan--number']}>
              {(_d = formState.errors.location) === null || _d === void 0 ? void 0 : _d.number.message}
            </span>)}

          <input className={Wizard_module_scss_1.default['step1__input--zip'] + ' standard-form'} placeholder="12435" type="number" {...register('location.zip')} onChange={function (c) { return setValue('location.zip', parseInt(c.target.value), Wizard_1.touchDirtyValidate); }}></input>
          {((_e = formState.errors.location) === null || _e === void 0 ? void 0 : _e.zip) && (<span className={Wizard_module_scss_1.default['error'] + ' ' + Wizard_module_scss_1.default['step1__validationSpan--zip']}>
              {(_f = formState.errors.location) === null || _f === void 0 ? void 0 : _f.zip.message}
            </span>)}

          <input className={Wizard_module_scss_1.default['step1__input--city'] + ' standard-form'} placeholder="Berlin" {...register('location.city')} onChange={function (c) { return setValue('location.city', c.target.value, Wizard_1.touchDirtyValidate); }}></input>
          {((_g = formState.errors.location) === null || _g === void 0 ? void 0 : _g.city) && (<span className={Wizard_module_scss_1.default['error'] + ' ' + Wizard_module_scss_1.default['step1__validationSpan--city']}>
              {(_h = formState.errors.location) === null || _h === void 0 ? void 0 : _h.city.message}
            </span>)}

          <input className={Wizard_module_scss_1.default['step1__input--country'] + ' standard-form'} placeholder="Germany" {...register('location.country')} onChange={function (c) { return setValue('location.country', c.target.value, Wizard_1.touchDirtyValidate); }}></input>
          {((_j = formState.errors.location) === null || _j === void 0 ? void 0 : _j.country) && (<span className={Wizard_module_scss_1.default['error'] + ' ' + Wizard_module_scss_1.default['step1__validationSpan--country']}>
              {(_k = formState.errors.location) === null || _k === void 0 ? void 0 : _k.country.message}
            </span>)}
        </div>
        <div className="spacer"></div>
      </div>
    </div>);
}
exports.default = Step1;
