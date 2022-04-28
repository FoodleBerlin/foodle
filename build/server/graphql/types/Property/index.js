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
exports.findAllProperties = exports.findAllPropertiesReturn = exports.FindPropertyById = exports.FindPropertyResult = exports.Property = void 0;
var nexus_1 = require("nexus");
var Error_1 = require("../Error");
var User_1 = require("../User");
var Booking_1 = require("../Booking");
var PropertySlot_1 = require("../PropertySlot");
exports.Property = (0, nexus_1.objectType)({
    name: 'Property',
    definition: function (p) {
        p.string('handle');
        p.string('title');
        p.int('size');
        p.nullable.field('owner', {
            type: User_1.User,
            resolve: function (parent, args, ctx) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, ctx.prisma.user.findUnique({
                                    where: {
                                        id: parent.ownerId,
                                    },
                                })];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                });
            },
        });
        p.string('kind');
        p.list.field('bookings', {
            type: Booking_1.Booking,
            resolve: function (parent, args, ctx) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, ctx.prisma.booking.findMany({
                                    where: {
                                        propertyId: parent.id,
                                    },
                                })];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                });
            },
        });
        p.string('street');
        p.int('streetNumber');
        p.int('zip');
        p.string('city');
        p.string('description');
        p.nullable.boolean('pickup');
        p.list.string('facilities');
        p.int('deposit');
        p.list.string('images');
        p.boolean('partialSpace');
        p.boolean('isVerified');
        p.int('hourlyPrice');
        p.int('serviceFee');
        p.list.string('rules');
        p.nullable.field('availabilities', {
            type: PropertySlot_1.PropertySlot,
            resolve: function (parent, args, ctx) {
                return __awaiter(this, void 0, void 0, function () {
                    var slot;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, ctx.prisma.propertySlot.findUnique({
                                    where: {
                                        propertyId: parent.id,
                                    },
                                })];
                            case 1:
                                slot = _a.sent();
                                if (slot) {
                                    return [2 /*return*/, slot];
                                }
                                else {
                                    return [2 /*return*/, null];
                                }
                                return [2 /*return*/];
                        }
                    });
                });
            },
        });
    },
});
exports.FindPropertyResult = (0, nexus_1.objectType)({
    name: 'findPropertyResult',
    definition: function (t) {
        t.nullable.field('Property', { type: 'Property' });
        t.nullable.field('ClientErrorPropertyNotExists', {
            type: Error_1.ClientErrorPropertyNotExists,
        });
        t.nullable.field('ClientErrorInvalidHandle', {
            type: Error_1.ClientErrorInvalidHandle,
        });
    },
});
exports.FindPropertyById = (0, nexus_1.extendType)({
    type: 'Query',
    definition: function (t) {
        var _this = this;
        t.field('findProperty', {
            type: exports.FindPropertyResult,
            description: 'Takes a propertyId and returns the property',
            args: { handle: (0, nexus_1.stringArg)() },
            resolve: function (_, args, ctx) { return __awaiter(_this, void 0, void 0, function () {
                var property, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!args.handle) return [3 /*break*/, 1];
                            return [2 /*return*/, {
                                    ClientErrorInvalidHandle: {
                                        message: 'handle can not be null',
                                    },
                                }];
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, ctx.prisma.property.findUnique({
                                    where: {
                                        id: args.handle,
                                    },
                                })];
                        case 2:
                            property = _a.sent();
                            if (property) {
                                return [2 /*return*/, { Property: property }];
                            }
                            else {
                                return [2 /*return*/, {
                                        ClientErrorPropertyNotExists: {
                                            message: "no property exists with handle ".concat(args.handle),
                                        },
                                    }];
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            e_1 = _a.sent();
                            return [2 /*return*/, {
                                    ClientErrorPropertyNotExists: {
                                        message: "no property exists with handle ".concat(args.handle),
                                    },
                                }];
                        case 4: return [2 /*return*/];
                    }
                });
            }); },
        });
    },
});
exports.findAllPropertiesReturn = (0, nexus_1.objectType)({
    name: 'findAllPropertiesReturn',
    definition: function (t) {
        t.nullable.list.field('Properties', {
            type: exports.Property,
        });
        t.nullable.field('UnknownError', {
            type: Error_1.UnknownError,
        });
    },
});
exports.findAllProperties = (0, nexus_1.extendType)({
    type: 'Query',
    definition: function (t) {
        var _this = this;
        t.field('findAllProperties', {
            type: exports.findAllPropertiesReturn,
            resolve: function (_, args, ctx) { return __awaiter(_this, void 0, void 0, function () {
                var properties, e_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, ctx.prisma.property.findMany()];
                        case 1:
                            properties = _a.sent();
                            return [2 /*return*/, { Properties: properties }];
                        case 2:
                            e_2 = _a.sent();
                            return [2 /*return*/, {
                                    UnknownError: {
                                        message: "Erorr fetching properties from database ".concat(e_2),
                                    },
                                }];
                        case 3: return [2 /*return*/];
                    }
                });
            }); },
        });
    },
});
