"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var link_1 = __importDefault(require("next/link"));
var react_1 = __importDefault(require("react"));
var Sidebar_module_scss_1 = __importDefault(require("./Sidebar.module.scss"));
var Sidebar = function (props) {
    return (<div className={Sidebar_module_scss_1.default['sidebar']}>
      <div className={Sidebar_module_scss_1.default['menu']}>
        {props.children ? (props.children) : (<>
            <div className={'mt-three'}>
              <link_1.default href="/account/profile">
                <a className="body-text">
                  <span className={'underline-link  green-text'}>Profile</span>
                </a>
              </link_1.default>
            </div>
            <div className={'mt-three'}>
              <link_1.default href="/account/bookings">
                <a className="body-text bold">
                  <span className={'underline-link'}>My Bookings</span>
                </a>
              </link_1.default>
            </div>
            <div className={'mt-three'}>
              <link_1.default href="/account/payments">
                <a className="body-text bold">
                  <span className={'underline-link'}>My Payments</span>
                </a>
              </link_1.default>
            </div>
            <button className={'primary-btn mt-two body-text bold'}>Contact support</button>
          </>)}
      </div>
    </div>);
};
exports.default = Sidebar;
