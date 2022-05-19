"use strict";
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
exports.User = exports.CustomerCharge = exports.PaymentInformation = void 0;
var nexus_1 = require("nexus");
exports.PaymentInformation = (0, nexus_1.objectType)({
    name: 'PaymentInformation',
    definition: function (t) {
        t.nullable.string('cardNumber');
        t.nullable.int('expiryMonth');
        t.nullable.int('expiryYear');
        t.nullable.string('type');
    },
});
exports.CustomerCharge = (0, nexus_1.objectType)({
    name: 'CustomerCharge',
    definition: function (t) {
        t.nullable.int('amount');
        t.nullable.int('date');
        t.nullable.string('card');
        t.nullable.string('status');
        t.nullable.string('description');
        t.nullable.string('invoiceId');
        t.nullable.string('currency');
    },
});
exports.User = (0, nexus_1.objectType)({
    name: 'User',
    definition: function (t) {
        var _this = this;
        t.string('id');
        t.string('fullName');
        t.string('email');
        t.string('handle');
        t.int('zip');
        t.list.field('charges', {
            type: 'CustomerCharge',
            resolve: function (_, args, ctx) { return __awaiter(_this, void 0, void 0, function () {
                var charges;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!((_a = ctx.user) === null || _a === void 0 ? void 0 : _a.stripeId) || _.email !== ((_b = ctx.user) === null || _b === void 0 ? void 0 : _b.email))
                                return [2 /*return*/, []];
                            return [4 /*yield*/, ctx.dataSources.stripeWrapper.getCustomerCharges({ customerId: ctx.user.stripeId })];
                        case 1:
                            charges = _c.sent();
                            if (!charges.response.success)
                                return [2 /*return*/, []];
                            return [2 /*return*/, charges.response.success.body.data.map(function (charge) {
                                    var _a, _b;
                                    return {
                                        currency: charge.currency,
                                        amount: charge.amount,
                                        date: charge.created,
                                        card: (_b = (_a = charge.payment_method_details) === null || _a === void 0 ? void 0 : _a.card) === null || _b === void 0 ? void 0 : _b.last4,
                                        status: charge.status,
                                        description: charge.description,
                                        invoiceId: charge.invoice,
                                    };
                                })];
                    }
                });
            }); },
        });
        t.list.field('paymentMethods', {
            type: 'PaymentInformation',
            resolve: function (_, args, ctx) { return __awaiter(_this, void 0, void 0, function () {
                var userInfo;
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            console.log((_a = ctx.user) === null || _a === void 0 ? void 0 : _a.stripeId);
                            if (!((_b = ctx.user) === null || _b === void 0 ? void 0 : _b.stripeId) || _.email !== ((_c = ctx.user) === null || _c === void 0 ? void 0 : _c.email))
                                return [2 /*return*/, []];
                            return [4 /*yield*/, ctx.dataSources.stripeWrapper.getCustomerPaymentMethods({
                                    customerId: ctx.user.stripeId,
                                })];
                        case 1:
                            userInfo = _d.sent();
                            if (!userInfo.response.success)
                                return [2 /*return*/, []];
                            return [2 /*return*/, userInfo.response.success.body.data.map(function (info) {
                                    var _a, _b, _c, _d;
                                    return {
                                        cardNumber: (_a = info.card) === null || _a === void 0 ? void 0 : _a.last4,
                                        type: (_b = info.card) === null || _b === void 0 ? void 0 : _b.brand,
                                        expiryMonth: (_c = info === null || info === void 0 ? void 0 : info.card) === null || _c === void 0 ? void 0 : _c.exp_month,
                                        expiryYear: (_d = info === null || info === void 0 ? void 0 : info.card) === null || _d === void 0 ? void 0 : _d.exp_year,
                                    };
                                })];
                    }
                });
            }); },
        });
        t.nullable.field('defaultPayment', {
            type: exports.PaymentInformation,
            resolve: function (_, args, ctx) { return __awaiter(_this, void 0, void 0, function () {
                var userInfo, info;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!((_a = ctx.user) === null || _a === void 0 ? void 0 : _a.stripeId) || _.email !== ((_b = ctx.user) === null || _b === void 0 ? void 0 : _b.email))
                                return [2 /*return*/, null];
                            return [4 /*yield*/, ctx.dataSources.stripeWrapper.getCustomer({ customerId: ctx.user.stripeId })];
                        case 1:
                            userInfo = _c.sent();
                            if (!userInfo.response.success)
                                return [2 /*return*/, null];
                            info = userInfo.response.success.body;
                            return [2 /*return*/, {
                                    // TODO default pay
                                    cardNumber: info.invoice_settings.default_payment_method,
                                    type: 'notsure yet',
                                    expiryMonth: 0,
                                    expiryYear: 7,
                                }];
                    }
                });
            }); },
        });
    },
});
