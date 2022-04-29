"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var link_1 = __importDefault(require("next/link"));
var image_1 = __importDefault(require("next/image"));
var react_1 = __importDefault(require("react"));
var Navbar_module_scss_1 = __importDefault(require("./Navbar.module.scss"));
var Tab_1 = __importDefault(require("./Tab"));
var Navbar = function (props) {
    return (<nav className={Navbar_module_scss_1.default['navbar'] + ' flex-center'}>
      <div className={Navbar_module_scss_1.default['navbar__logo']}>
        <link_1.default href="/">
          <a>
            <image_1.default src="/foodle_logo.svg" width={50} height={35} alt="Foodle Logo"/>
          </a>
        </link_1.default>
      </div>
      <div className={Navbar_module_scss_1.default['navbar__menu']}>
        <Tab_1.default href="/" title="EN/DE"/>
        <Tab_1.default href="/" title="How It Works"/>
        <Tab_1.default href="/create" title="List Your Kitchen"/>
        <Tab_1.default href="/" title="Contact"/>
      </div>
      {props.user && (<link_1.default href="/account">
          <div className={Navbar_module_scss_1.default['avatar']}></div>
        </link_1.default>)}
    </nav>);
};
exports.default = Navbar;
