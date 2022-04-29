"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var endpoints_1 = __importDefault(require("./stripe/endpoints"));
var datasources = function () {
    var stripeWrapper = new endpoints_1.default();
    return {
        stripeWrapper: stripeWrapper,
    };
};
exports.default = datasources;
