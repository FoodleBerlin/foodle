"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeWrapperAbstract = void 0;
var stripe_1 = __importDefault(require("stripe"));
var StripeWrapperAbstract = /** @class */ (function () {
    function StripeWrapperAbstract(stripeAccountKey, publishableKey) {
        this.stripeAccountKey = stripeAccountKey;
        this.publishableKey = publishableKey;
    }
    return StripeWrapperAbstract;
}());
exports.StripeWrapperAbstract = StripeWrapperAbstract;
var StripeWrapper = /** @class */ (function (_super) {
    __extends(StripeWrapper, _super);
    function StripeWrapper() {
        var _this = _super.call(this, process.env.STRIPE_ACCOUNT_ID, process.env.STRIPE_PUBLISHABLE_KEY) || this;
        _this.getCustomerCharges = function (params) { return __awaiter(_this, void 0, void 0, function () {
            var res, charges, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.stripe.charges.list({ customer: params.customerId })];
                    case 1:
                        charges = _a.sent();
                        res = {
                            response: {
                                failure: null,
                                success: {
                                    body: charges,
                                },
                            },
                        };
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        res = {
                            response: {
                                failure: __assign({}, createApiError(e_1)),
                                success: null,
                            },
                        };
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, res];
                }
            });
        }); };
        _this.getCustomer = function (params) { return __awaiter(_this, void 0, void 0, function () {
            var res, customer, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.stripe.customers.retrieve(params.customerId)];
                    case 1:
                        customer = _a.sent();
                        res = {
                            response: {
                                failure: null,
                                success: {
                                    body: customer,
                                },
                            },
                        };
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        res = {
                            response: {
                                failure: __assign({}, createApiError(e_2)),
                                success: null,
                            },
                        };
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, res];
                }
            });
        }); };
        _this.getCustomerPaymentMethods = function (params) { return __awaiter(_this, void 0, void 0, function () {
            var res, paymentMethod, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.stripe.paymentMethods.list({ type: 'card', customer: params.customerId })];
                    case 1:
                        paymentMethod = _a.sent();
                        res = {
                            response: {
                                failure: null,
                                success: {
                                    body: paymentMethod,
                                },
                            },
                        };
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _a.sent();
                        res = {
                            response: {
                                failure: __assign({}, createApiError(e_3)),
                                success: null,
                            },
                        };
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, res];
                }
            });
        }); };
        // TODO set payment method as default
        // TODO fetch customer.invoice_settings.default payment method
        /** Payment method needs to be created in the front end first */
        _this.attachPaymentMethodToCustomer = function (params) { return __awaiter(_this, void 0, void 0, function () {
            var res, paymentMethod, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.stripe.paymentMethods.attach(params.paymentMethodId, // <-- your payment method ID collected via Stripe.js
                            { customer: params.customerId } // <-- your customer id from the request body
                            )];
                    case 1:
                        paymentMethod = _a.sent();
                        res = {
                            response: {
                                failure: null,
                                success: {
                                    body: paymentMethod,
                                },
                            },
                        };
                        return [3 /*break*/, 3];
                    case 2:
                        e_4 = _a.sent();
                        res = {
                            response: {
                                success: null,
                                failure: __assign({}, createApiError(e_4)),
                            },
                        };
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, res];
                }
            });
        }); };
        _this.listProducts = function () { return __awaiter(_this, void 0, void 0, function () {
            var res, prices, pricesFormatted, e_5;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.stripe.prices.list()];
                    case 1:
                        prices = _a.sent();
                        return [4 /*yield*/, Promise.all(prices.data.map(function (price, i) { return __awaiter(_this, void 0, void 0, function () {
                                var productId, product;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            productId = price.product;
                                            return [4 /*yield*/, this.stripe.products.retrieve(productId)];
                                        case 1:
                                            product = _a.sent();
                                            // Add product details to query
                                            return [2 /*return*/, __assign(__assign({}, price), { productData: product })];
                                    }
                                });
                            }); }))];
                    case 2:
                        pricesFormatted = _a.sent();
                        res = {
                            response: {
                                failure: null,
                                success: {
                                    body: pricesFormatted,
                                },
                            },
                        };
                        return [3 /*break*/, 4];
                    case 3:
                        e_5 = _a.sent();
                        res = {
                            response: {
                                success: null,
                                failure: __assign({}, createApiError(e_5)),
                            },
                        };
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, res];
                }
            });
        }); };
        _this.createInvoice = function (params) { return __awaiter(_this, void 0, void 0, function () {
            var res, invoice, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.stripe.invoices.create({
                                customer: params.customerId,
                                auto_advance: true,
                                collection_method: 'charge_automatically',
                                metadata: {
                                    pick_up: 'saturday',
                                },
                                default_payment_method: params.payment_method_id,
                            })];
                    case 1:
                        invoice = _a.sent();
                        res = {
                            response: {
                                failure: null,
                                success: {
                                    body: invoice,
                                },
                            },
                        };
                        return [3 /*break*/, 3];
                    case 2:
                        e_6 = _a.sent();
                        res = {
                            response: {
                                success: null,
                                failure: __assign({}, createApiError(e_6)),
                            },
                        };
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, res];
                }
            });
        }); };
        _this.createInvoiceItem = function (params) { return __awaiter(_this, void 0, void 0, function () {
            var res, invoiceItem, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.stripe.invoiceItems.create(__assign(__assign({}, params), { currency: 'eur', description: 'booking in industrial kitchen mitte' }), {
                                stripeAccount: this.stripeAccountKey,
                            })];
                    case 1:
                        invoiceItem = _a.sent();
                        res = {
                            response: {
                                failure: null,
                                success: {
                                    body: invoiceItem,
                                },
                            },
                        };
                        return [2 /*return*/, res];
                    case 2:
                        e_7 = _a.sent();
                        res = {
                            response: {
                                success: null,
                                failure: __assign({}, createApiError(e_7)),
                            },
                        };
                        return [2 /*return*/, res];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.payInvoice = function (params) { return __awaiter(_this, void 0, void 0, function () {
            var res, invoice, e_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.stripe.invoices.pay(params.invoiceId)];
                    case 1:
                        invoice = _a.sent();
                        res = {
                            response: {
                                failure: null,
                                success: {
                                    body: invoice,
                                },
                            },
                        };
                        return [3 /*break*/, 3];
                    case 2:
                        e_8 = _a.sent();
                        res = {
                            response: {
                                failure: __assign({}, createApiError(e_8)),
                                success: null,
                            },
                        };
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, res];
                }
            });
        }); };
        _this.createCustomer = function (params) { return __awaiter(_this, void 0, void 0, function () {
            var res, customer, e_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.stripe.customers.create(__assign({}, params))];
                    case 1:
                        customer = _a.sent();
                        res = {
                            response: {
                                failure: null,
                                success: {
                                    body: customer,
                                },
                            },
                        };
                        return [3 /*break*/, 3];
                    case 2:
                        e_9 = _a.sent();
                        res = {
                            response: {
                                success: null,
                                failure: __assign({}, createApiError(e_9)),
                            },
                        };
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, res];
                }
            });
        }); };
        var stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2020-08-27',
            appInfo: {
                name: 'fixed-payments',
                version: '0.0.2',
            },
            typescript: true,
        });
        _this.stripe = stripe;
        return _this;
    }
    return StripeWrapper;
}(StripeWrapperAbstract));
var createApiError = function (e) {
    return {
        type: 'unknown',
        message: e,
    };
};
exports.default = StripeWrapper;
