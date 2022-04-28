"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Wizard_module_scss_1 = __importDefault(require("../Create/wizard/Wizard.module.scss"));
var PriceLine = function (props) {
    return (<div className={Wizard_module_scss_1.default['step5__priceLinesContainer']}>
      <div className={Wizard_module_scss_1.default['step5__priceLineLeft']}>
        <p className="small-text">{props.label}</p>
      </div>
      <div className={Wizard_module_scss_1.default['step5__priceLineRight']}>
        <p className="small-text">{props.text}</p>
      </div>
    </div>);
};
exports.default = PriceLine;
