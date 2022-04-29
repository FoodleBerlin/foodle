"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Navbar_1 = __importDefault(require("../components/Layout/Navbar"));
var Tabs_1 = __importDefault(require("../components/Profile/Tabs"));
function Profile() {
    return (<>
      <Navbar_1.default></Navbar_1.default>
      <Tabs_1.default tabs={['Profile', 'My Bookings', 'My Payments']}/>
    </>);
}
exports.default = Profile;
