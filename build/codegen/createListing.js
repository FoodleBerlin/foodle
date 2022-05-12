"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateListing = void 0;
var graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.CreateListing = (0, graphql_tag_1.default)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation CreateListing(\n    $size: Int!\n    $ownerId: String!\n    $street: String!\n    $streetNumber: Int!\n    $zip: Int!\n    $city: String!\n    $description: String!\n    $pickup: Boolean!\n    $rules: [String!]!\n    $title: String!\n    $hourlyPrice: Int!\n    $serviceFee: Int!\n    $facilities: [String!]!\n    $deposit: Int!\n    $images: [String!]!\n    $partialSpace: Boolean!\n    $availabilities: PropertySlotInput!\n  ) {\n    createListing(\n      size: $size\n      ownerId: $ownerId\n      street: $street\n      streetNumber: $streetNumber\n      zip: $zip\n      city: $city\n      description: $description\n      pickup: $pickup\n      rules: $rules\n      title: $title\n      hourlyPrice: $hourlyPrice\n      serviceFee: $serviceFee\n      facilities: $facilities\n      deposit: $deposit\n      images: $images\n      partialSpace: $partialSpace\n      availabilities: $availabilities\n    ) {\n      Property {\n        size\n        owner {\n          id\n          fullName\n          email\n        }\n        kind\n        bookings {\n          id\n        }\n        street\n        streetNumber\n        zip\n        city\n        description\n        pickup\n        facilities\n        isVerified\n        hourlyPrice\n        serviceFee\n        deposit\n        rules\n        availabilities {\n          startDate\n          endDate\n          minMonths\n          frequency\n          availableDays {\n            weekday\n            startTime\n            endTime\n          }\n        }\n      }\n      ClientErrorUserNotExists {\n        message\n      }\n      ClientErrorInvalidHandle {\n        message\n      }\n      ClientErrorInvalidPropertyInput {\n        message\n      }\n      UnknownError {\n        message\n      }\n    }\n  }\n"], ["\n  mutation CreateListing(\n    $size: Int!\n    $ownerId: String!\n    $street: String!\n    $streetNumber: Int!\n    $zip: Int!\n    $city: String!\n    $description: String!\n    $pickup: Boolean!\n    $rules: [String!]!\n    $title: String!\n    $hourlyPrice: Int!\n    $serviceFee: Int!\n    $facilities: [String!]!\n    $deposit: Int!\n    $images: [String!]!\n    $partialSpace: Boolean!\n    $availabilities: PropertySlotInput!\n  ) {\n    createListing(\n      size: $size\n      ownerId: $ownerId\n      street: $street\n      streetNumber: $streetNumber\n      zip: $zip\n      city: $city\n      description: $description\n      pickup: $pickup\n      rules: $rules\n      title: $title\n      hourlyPrice: $hourlyPrice\n      serviceFee: $serviceFee\n      facilities: $facilities\n      deposit: $deposit\n      images: $images\n      partialSpace: $partialSpace\n      availabilities: $availabilities\n    ) {\n      Property {\n        size\n        owner {\n          id\n          fullName\n          email\n        }\n        kind\n        bookings {\n          id\n        }\n        street\n        streetNumber\n        zip\n        city\n        description\n        pickup\n        facilities\n        isVerified\n        hourlyPrice\n        serviceFee\n        deposit\n        rules\n        availabilities {\n          startDate\n          endDate\n          minMonths\n          frequency\n          availableDays {\n            weekday\n            startTime\n            endTime\n          }\n        }\n      }\n      ClientErrorUserNotExists {\n        message\n      }\n      ClientErrorInvalidHandle {\n        message\n      }\n      ClientErrorInvalidPropertyInput {\n        message\n      }\n      UnknownError {\n        message\n      }\n    }\n  }\n"])));
var templateObject_1;