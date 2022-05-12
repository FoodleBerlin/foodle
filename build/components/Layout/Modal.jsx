"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Modal_module_scss_1 = __importDefault(require("./Modal.module.scss"));
var link_1 = __importDefault(require("next/link"));
var image_1 = __importDefault(require("next/image"));
var Modal = function (props) {
    if (!props.show) {
        return null;
    }
    return (<div className={Modal_module_scss_1.default['modal']} onClick={props.onClose}>
      <div className={Modal_module_scss_1.default['modal__content']} onClick={function (e) { return e.stopPropagation(); }}>
        <div className={Modal_module_scss_1.default['modal__header']}>
          <div className={Modal_module_scss_1.default['modal__title'] + ' body-text'}>Log in or sign up</div>
          <link_1.default href="/">
            <a className={Modal_module_scss_1.default['modal__close']} onClick={props.onClose}>
              <image_1.default src="/close-x.svg" width={21} height={21} alt="Close Login"/>
            </a>
          </link_1.default>
        </div>
        <div className={Modal_module_scss_1.default['modal__body']}>
          <h2 className="header-secondary">Welcome to Foodle!</h2>
          <div className={Modal_module_scss_1.default['modal__form']}>
            <input className={Modal_module_scss_1.default['modal__body--zip'] + ' standard-form'} type="number" placeholder="Enter your zip code..."></input>
            <link_1.default href={'/heroku-auth'} passHref>
              <a className={'primary-btn'}>Continue with google</a>
            </link_1.default>
          </div>
        </div>
        <div className={Modal_module_scss_1.default['modal__footer']}></div>
      </div>
    </div>);
};
exports.default = Modal;
