"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var head_1 = __importDefault(require("next/head"));
var image_1 = __importDefault(require("next/image"));
var react_1 = __importStar(require("react"));
var Home_module_scss_1 = __importDefault(require("../styles/pages/Home.module.scss"));
var Navbar_1 = __importDefault(require("../components/Layout/Navbar"));
var LandingInfo_1 = __importDefault(require("../components/Layout/LandingInfo"));
var Modal_1 = __importDefault(require("../components/Layout/Modal"));
var Home = function () {
    var _a = react_1.default.useState(''), email = _a[0], setEmail = _a[1];
    var _b = (0, react_1.useState)(false), openModal = _b[0], setOpenModal = _b[1];
    return (<div>
      <head_1.default>
        <title>Foodle</title>
        <meta name="description" content="The landing page of the up and coming
        kitchen rental portal, Foodle."/>
        <link rel="icon" href="/foodle_logo.svg"/>
        <style type="text/css">
          <link href="https://dafonttop.com/wp-data/a/21/8021/file/archia-regular-webfont.ttf" rel="stylesheet"/>
        </style>
      </head_1.default>
      <Navbar_1.default />
      <div className={Home_module_scss_1.default['hero']}>
        <div className={Home_module_scss_1.default['hero__left']}>
          <div className={Home_module_scss_1.default['hero__left--inner']}>
            <h1 className={'header-primary'}>
              Renting kitchens just got <span className={Home_module_scss_1.default['rainbow']}>easier</span>.
            </h1>
            <h3 className={'body-text-secondary'}>
              We pair licensed kitchen owners with new chefs and bakers so businesses can grow together.
            </h3>
            <div>
              <button onClick={function () { return setOpenModal(true); }} className="primary-btn bold-medium">
                Sign Up With Google
              </button>
              <Modal_1.default onClose={function () { return setOpenModal(false); }} show={openModal}/>
            </div>
          </div>
        </div>
        <div className={Home_module_scss_1.default['hero__right']}>
          <div className={Home_module_scss_1.default['hero__right']}>
            <image_1.default alt={'Hero Image'} src={'/programming.png'} width={450} height={350}/>
          </div>
        </div>
      </div>
      <h2 className={Home_module_scss_1.default['random-text'] + ' header-secondary'}>
        Make your entrepreneurial food<span className={Home_module_scss_1.default['rainbow-multi']}> dreams come true.</span>
      </h2>
      <div className={Home_module_scss_1.default['carousel']}>
        <h2 className={'header-secondary'}>Licensed Kitchens For Rent</h2>
        <div className={Home_module_scss_1.default['carousel__wrapper']}>
          <image_1.default alt="carousel-image" src={'/carousel-image-1.png'} width={361} height={415}/>
          <image_1.default alt="carousel-image" src={'/carousel-image-2.png'} width={361} height={415}/>
          <image_1.default alt="carousel-image" src={'/carousel-image-3.png'} width={361} height={415}/>
        </div>
      </div>
      <LandingInfo_1.default leftText="Always wanted to sell your homemade recipes? " rightText="You’ll need to find a licensed kitchen near you. 
        That can be a big challenge." containerStyle={'landing-info__white'}/>
      <LandingInfo_1.default leftText="Foodle helps you do just that." rightText="With the click of a button, browse and book the kitchen that best fits your needs.
        And support local businesses in the process." containerStyle={'landing-info__green'}/>
    </div>);
};
exports.default = Home;
