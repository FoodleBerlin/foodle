"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var link_1 = __importDefault(require("next/link"));
var react_1 = __importDefault(require("react"));
var Navbar_module_scss_1 = __importDefault(require("./Navbar.module.scss"));
var Tab = function (props) { return (<link_1.default href={props.href || '/'}>
    <a className={Navbar_module_scss_1.default['navbar__menu--link'] + ' flex-center'}>
      <span className={'underline-link small-text'}>{props.title}</span>
    </a>
  </link_1.default>); };
exports.default = Tab;
