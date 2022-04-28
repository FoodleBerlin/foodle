"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Home_module_scss_1 = __importDefault(require("../../styles/pages/Home.module.scss"));
var LandingInfo = function (props) {
    return (<div className={Home_module_scss_1.default[props.containerStyle]}>
      <div className={Home_module_scss_1.default["landing-info__wrapper"]}>
        <div className={Home_module_scss_1.default["landing-info__left"] + " header-secondary"}>
          {props.leftText}
        </div>
        <div className={Home_module_scss_1.default["landing-info__right"] + " body-text"}>
          {props.rightText}
        </div>
      </div>
    </div>);
};
exports.default = LandingInfo;
