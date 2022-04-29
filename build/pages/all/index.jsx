"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Navbar_1 = __importDefault(require("../../components/Layout/Navbar"));
var link_1 = __importDefault(require("next/link"));
var image_1 = __importDefault(require("next/image"));
var All_module_scss_1 = __importDefault(require("../../styles/pages/All.module.scss"));
var index_1 = require("../../codegen/index");
var All = function () {
    var _a = (0, index_1.useListingsQuery)({
        endpoint: process.env.SERVER_URL + 'graphql',
        fetchParams: {
            headers: {
                'Content-Type': 'application/json',
            },
        },
    }), status = _a.status, data = _a.data, error = _a.error, isFetching = _a.isFetching, isLoading = _a.isLoading;
    var properties = [data === null || data === void 0 ? void 0 : data.findAllProperties.Properties][0];
    if (isLoading)
        console.log('is Loading...');
    return (<>
      <Navbar_1.default />
      <div className={All_module_scss_1.default['properties-container']}>
        {isLoading ? (<p className="body-text-secondary">Loading...</p>) : (<ul className="body-text-secondary">
            {properties === null || properties === void 0 ? void 0 : properties.map(function (property, index) {
                return (<li className={All_module_scss_1.default['list-wrapper']} key={index + 1}>
                  <div className="flex-center">
                    <div>
                      <image_1.default src="/kitchen-test.jpg" width={302} height={193} className={All_module_scss_1.default['step5__overview--img']} alt="Image 1"/>
                    </div>
                    <div className={All_module_scss_1.default['list-wrapper__text']}>
                      <link_1.default href={"/all/" + property.handle}>
                        <a className={All_module_scss_1.default['list-wrapper__link']}>{property.title}</a>
                      </link_1.default>
                      <div className={All_module_scss_1.default['list-wrapper__facilities']}>
                        {property.facilities.map(function (feature, index) { return (<span key={index + 1}>{feature} </span>); })}
                      </div>
                      <div className={All_module_scss_1.default['list-wrapper__verification'] + ' flex-column'}>
                        {property.isVerified ? (<span className="feature-tag">VERIFIED</span>) : (<span className="feature-tag__not-verified">NOT VERIFIED</span>)}
                        <p className={All_module_scss_1.default['list-wrapper__price'] + ' body-text__small'}>
                          €{property.hourlyPrice * 8}/Day
                        </p>
                      </div>
                    </div>
                  </div>
                </li>);
            })}
          </ul>)}
      </div>
    </>);
};
exports.default = All;
