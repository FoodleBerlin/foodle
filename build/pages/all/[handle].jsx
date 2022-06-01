"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Navbar_1 = __importDefault(require("../../components/Layout/Navbar"));
var ListedKitchen_1 = __importDefault(require("../../components/Book/ListedKitchen"));
var router_1 = require("next/router");
var index_1 = require("../../codegen/index");
var All_module_scss_1 = __importDefault(require("../../styles/pages/All.module.scss"));
var Kitchen = function () {
    var router = (0, router_1.useRouter)();
    var handle = router.query.handle;
    var _a = (0, index_1.useListingsQuery)({
        endpoint: process.env.NEXT_PUBLIC_SERVER_URL + 'graphql',
        fetchParams: {
            headers: {
                'Content-Type': 'application/json',
            },
        },
    }), status = _a.status, data = _a.data, error = _a.error, isFetching = _a.isFetching, isLoading = _a.isLoading;
    if (isLoading)
        console.log('is Loading...');
    var properties = [data === null || data === void 0 ? void 0 : data.findAllProperties.Properties][0];
    return (<>
      <Navbar_1.default />
      <div className={All_module_scss_1.default['properties-container']}>
        {properties === null || properties === void 0 ? void 0 : properties.map(function (property, index) {
            if (property.handle === handle) {
                return (<ListedKitchen_1.default title={property.title} images={property.images} isVerified={property.isVerified} hourlyPrice={property.hourlyPrice} size={property.size} facilities={property.facilities} description={property.description} deposit={property.deposit} rules={property.rules} availability={property.availabilities} partialSpace={property.partialSpace} street={property.street} streetNumber={property.streetNumber} city={property.city} zip={property.zip} key={index + 1}/>);
            }
        })}
      </div>
    </>);
};
exports.default = Kitchen;
