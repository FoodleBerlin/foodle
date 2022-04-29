"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useListingsQuery = exports.ListingsDocument = exports.useCreateListingMutation = exports.CreateListingDocument = exports.useUpdateUserMutation = exports.UpdateUserDocument = exports.useFindUserQuery = exports.FindUserDocument = exports.Frequency = void 0;
var react_query_1 = require("react-query");
function fetcher(endpoint, requestInit, query, variables) {
    var _this = this;
    return function () { return __awaiter(_this, void 0, void 0, function () {
        var res, json, message;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(endpoint, __assign(__assign({ method: 'POST' }, requestInit), { body: JSON.stringify({ query: query, variables: variables }) }))];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    json = _a.sent();
                    if (json.errors) {
                        message = json.errors[0].message;
                        throw new Error(message);
                    }
                    return [2 /*return*/, json.data];
            }
        });
    }); };
}
var Frequency;
(function (Frequency) {
    Frequency["Biweekly"] = "biweekly";
    Frequency["None"] = "none";
    Frequency["Triweekly"] = "triweekly";
    Frequency["Weekly"] = "weekly";
})(Frequency = exports.Frequency || (exports.Frequency = {}));
exports.FindUserDocument = "\n    query FindUser($handle: String!) {\n  findUser(handle: $handle) {\n    __typename\n    User {\n      __typename\n      email\n      handle\n      fullName\n      description\n      zip\n      dob\n      passportS3Id\n      solvencyS3Id\n      licenseS3Id\n      charges {\n        amount\n        date\n        card\n        status\n        description\n        invoiceId\n        currency\n      }\n      paymentMethods {\n        cardNumber\n        expiryMonth\n        expiryYear\n        type\n      }\n      defaultPayment {\n        cardNumber\n        expiryMonth\n        expiryYear\n        type\n      }\n    }\n    ClientErrorUserNotExists {\n      __typename\n      message\n    }\n    ClientErrorInvalidHandle {\n      __typename\n      message\n    }\n  }\n}\n    ";
var useFindUserQuery = function (dataSource, variables, options) {
    return (0, react_query_1.useQuery)(['FindUser', variables], fetcher(dataSource.endpoint, dataSource.fetchParams || {}, exports.FindUserDocument, variables), options);
};
exports.useFindUserQuery = useFindUserQuery;
exports.UpdateUserDocument = "\n    mutation UpdateUser($id: String, $fullName: String, $zip: Int, $description: String, $dob: String, $passportS3Id: String, $solvencyS3Id: String, $licenseS3Id: String) {\n  updateUser(id: $id, fullName: $fullName, zip: $zip, description: $description, dob: $dob, passportS3Id: $passportS3Id, solvencyS3Id: $solvencyS3Id, licenseS3Id: $licenseS3Id) {\n    User {\n      id\n      fullName\n      email\n      handle\n      description\n      zip\n      dob\n      passportS3Id\n      solvencyS3Id\n      licenseS3Id\n    }\n    ClientErrorUserNotExists {\n      message\n    }\n    ClientErrorInvalidInputLength {\n      message\n    }\n    ClientErrorInvalidHandle {\n      message\n    }\n  }\n}\n    ";
var useUpdateUserMutation = function (dataSource, options) {
    return (0, react_query_1.useMutation)(['UpdateUser'], function (variables) { return fetcher(dataSource.endpoint, dataSource.fetchParams || {}, exports.UpdateUserDocument, variables)(); }, options);
};
exports.useUpdateUserMutation = useUpdateUserMutation;
exports.CreateListingDocument = "\n    mutation CreateListing($size: Int!, $ownerId: String!, $street: String!, $streetNumber: Int!, $zip: Int!, $city: String!, $description: String!, $pickup: Boolean!, $rules: [String!]!, $title: String!, $hourlyPrice: Int!, $serviceFee: Int!, $facilities: [String!]!, $deposit: Int!, $images: [String!]!, $partialSpace: Boolean!, $availabilities: PropertySlotInput!) {\n  createListing(size: $size, ownerId: $ownerId, street: $street, streetNumber: $streetNumber, zip: $zip, city: $city, description: $description, pickup: $pickup, rules: $rules, title: $title, hourlyPrice: $hourlyPrice, serviceFee: $serviceFee, facilities: $facilities, deposit: $deposit, images: $images, partialSpace: $partialSpace, availabilities: $availabilities) {\n    Property {\n      size\n      owner {\n        id\n        fullName\n        email\n      }\n      title\n      kind\n      bookings {\n        id\n      }\n      street\n      streetNumber\n      zip\n      city\n      description\n      pickup\n      facilities\n      isVerified\n      hourlyPrice\n      serviceFee\n      deposit\n      rules\n      availabilities {\n        startDate\n        endDate\n        minMonths\n        frequency\n        availableDays {\n          weekday\n          startTime\n          endTime\n        }\n      }\n    }\n    ClientErrorUserNotExists {\n      message\n    }\n    ClientErrorInvalidHandle {\n      message\n    }\n    ClientErrorInvalidPropertyInput {\n      message\n    }\n    UnknownError {\n      message\n    }\n  }\n}\n    ";
var useCreateListingMutation = function (dataSource, options) {
    return (0, react_query_1.useMutation)(['CreateListing'], function (variables) { return fetcher(dataSource.endpoint, dataSource.fetchParams || {}, exports.CreateListingDocument, variables)(); }, options);
};
exports.useCreateListingMutation = useCreateListingMutation;
exports.ListingsDocument = "\n    query Listings {\n  findAllProperties {\n    Properties {\n      handle\n      title\n      size\n      owner {\n        id\n        fullName\n        email\n        handle\n        zip\n        charges {\n          amount\n          date\n          card\n          status\n          description\n          invoiceId\n          currency\n        }\n        paymentMethods {\n          cardNumber\n          expiryMonth\n          expiryYear\n          type\n        }\n        defaultPayment {\n          cardNumber\n          expiryMonth\n          expiryYear\n          type\n        }\n      }\n      kind\n      bookings {\n        id\n      }\n      street\n      streetNumber\n      zip\n      city\n      description\n      pickup\n      facilities\n      deposit\n      images\n      partialSpace\n      isVerified\n      hourlyPrice\n      serviceFee\n      rules\n      availabilities {\n        startDate\n        endDate\n        minMonths\n        propertyId\n        property {\n          handle\n          title\n          size\n          owner {\n            id\n            fullName\n            email\n            handle\n            zip\n            charges {\n              amount\n              date\n              card\n              status\n              description\n              invoiceId\n              currency\n            }\n            paymentMethods {\n              cardNumber\n              expiryMonth\n              expiryYear\n              type\n            }\n            defaultPayment {\n              cardNumber\n              expiryMonth\n              expiryYear\n              type\n            }\n          }\n          kind\n          bookings {\n            id\n          }\n          street\n          streetNumber\n          zip\n          city\n          description\n          pickup\n          facilities\n          deposit\n          images\n          partialSpace\n          isVerified\n          hourlyPrice\n          serviceFee\n          rules\n          availabilities {\n            startDate\n            endDate\n            minMonths\n            propertyId\n            property {\n              handle\n              title\n              size\n              owner {\n                id\n                fullName\n                email\n                handle\n                zip\n                charges {\n                  amount\n                  date\n                  card\n                  status\n                  description\n                  invoiceId\n                  currency\n                }\n                paymentMethods {\n                  cardNumber\n                  expiryMonth\n                  expiryYear\n                  type\n                }\n                defaultPayment {\n                  cardNumber\n                  expiryMonth\n                  expiryYear\n                  type\n                }\n              }\n              kind\n              bookings {\n                id\n              }\n              street\n              streetNumber\n              zip\n              city\n              description\n              pickup\n              facilities\n              deposit\n              images\n              partialSpace\n              isVerified\n              hourlyPrice\n              serviceFee\n              rules\n              availabilities {\n                startDate\n                endDate\n                minMonths\n                propertyId\n                property {\n                  handle\n                  title\n                  size\n                }\n                availableDays {\n                  id\n                  propertySlotId\n                  startTime\n                  endTime\n                  weekday\n                  propertySlot {\n                    startDate\n                  }\n                }\n                frequency\n              }\n            }\n          }\n        }\n      }\n    }\n    UnknownError {\n      message\n    }\n  }\n}\n    ";
var useListingsQuery = function (dataSource, variables, options) {
    return (0, react_query_1.useQuery)(variables === undefined ? ['Listings'] : ['Listings', variables], fetcher(dataSource.endpoint, dataSource.fetchParams || {}, exports.ListingsDocument, variables), options);
};
exports.useListingsQuery = useListingsQuery;
