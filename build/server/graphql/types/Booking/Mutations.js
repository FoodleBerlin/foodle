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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingOnListing = exports.CreateBookingReturn = void 0;
var client_1 = require("@prisma/client");
var moment_1 = __importDefault(require("moment"));
var nexus_1 = require("nexus");
var bookingService_1 = require("../../../singletons/bookingService");
var validatorService_1 = require("../../../singletons/validatorService");
var Enums_1 = require("../EnumsScalars/Enums");
var Error_1 = require("../Error");
var helperFunctions_1 = require("../helperFunctions");
var Property_1 = require("../Property");
var Objects_1 = require("./Objects");
exports.CreateBookingReturn = (0, nexus_1.objectType)({
    name: 'CreateBookingReturn',
    definition: function (t) {
        t.nullable.field('Booking', { type: Objects_1.Booking });
        t.nullable.field('ClientErrorUserNotExists', {
            type: Error_1.ClientErrorUserNotExists,
        });
        t.nullable.field('ClientErrorPropertyNotExists', {
            type: Error_1.ClientErrorPropertyNotExists,
        });
        t.nullable.field('ClientErrorInvalidInput', {
            type: Error_1.ClientErrorInvalidInput,
        });
        t.nullable.field('NoAvailableSlots', {
            type: Error_1.NoAvailableSlots,
        });
        t.nullable.field('ClientErrorInvalidPropertyInput', {
            type: Error_1.ClientErrorInvalidPropertyInput,
        });
        t.nullable.field('UnknownError', {
            type: Error_1.UnknownError,
        });
    },
});
exports.BookingOnListing = (0, nexus_1.extendType)({
    type: 'Mutation',
    definition: function (b) {
        b.field('createBooking', {
            type: exports.CreateBookingReturn,
            args: {
                propertyHandle: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                startDate: (0, nexus_1.nonNull)('DateTime'),
                endDate: (0, nexus_1.nonNull)('DateTime'),
                frequency: (0, nexus_1.nonNull)(Enums_1.FrequencyEnum),
                daySlots: (0, nexus_1.nonNull)((0, nexus_1.list)((0, nexus_1.nonNull)(Property_1.AvailableDay))),
            },
            resolve: function (_root, args, ctx) {
                var e_1, _a;
                var _b;
                return __awaiter(this, void 0, void 0, function () {
                    var property, id, user, startDate, endDate, frequency, daySlotDates, daySlotDates_1, daySlotDates_1_1, day, daySlot, e_1_1, booking, price, error_1, errorMessage, errorMessage;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0: return [4 /*yield*/, ctx.prisma.property.findUnique({
                                    where: {
                                        handle: args.propertyHandle,
                                    },
                                })];
                            case 1:
                                property = _c.sent();
                                if (property == null) {
                                    return [2 /*return*/, {
                                            ClientErrorPropertyNotExists: {
                                                message: "Property for propertyHandle ".concat(args.propertyHandle, " does not exist"),
                                            },
                                        }];
                                }
                                id = (_b = ctx.user) === null || _b === void 0 ? void 0 : _b.id;
                                if (process.env.DEV_LOGIN === 'true') {
                                    id = process.env.DEV_USER_ID;
                                }
                                return [4 /*yield*/, ctx.prisma.user.findUnique({
                                        where: {
                                            id: id,
                                        },
                                    })];
                            case 2:
                                user = _c.sent();
                                args.daySlots.forEach(function (day) {
                                    if (validatorService_1.ValidatorService.validateDaySlot(day)) {
                                        return {
                                            ClientErrorInvalidInput: {
                                                message: "Invalid input for availableDay: startTime can't be after endTime, startTime and endTime have to be on the same day and have to match weekday.",
                                            },
                                        };
                                    }
                                });
                                if (user == null || user == undefined) {
                                    return [2 /*return*/, {
                                            ClientErrorUserNotExists: {
                                                message: "User is not logged in.",
                                            },
                                        }];
                                }
                                if (user.role === client_1.Role.landlord) {
                                    return [2 /*return*/, {
                                            ClientErrorUserNotExists: {
                                                message: "User for userHandle ".concat(user.handle, " does not have a tenant role"),
                                            },
                                        }];
                                }
                                startDate = (0, moment_1.default)(args.startDate);
                                endDate = (0, moment_1.default)(args.endDate);
                                frequency = args.frequency;
                                daySlotDates = bookingService_1.BookingService.calculateDates(args.daySlots, startDate, endDate, frequency);
                                _c.label = 3;
                            case 3:
                                _c.trys.push([3, 9, 10, 15]);
                                daySlotDates_1 = __asyncValues(daySlotDates);
                                _c.label = 4;
                            case 4: return [4 /*yield*/, daySlotDates_1.next()];
                            case 5:
                                if (!(daySlotDates_1_1 = _c.sent(), !daySlotDates_1_1.done)) return [3 /*break*/, 8];
                                day = daySlotDates_1_1.value;
                                return [4 /*yield*/, ctx.prisma.daySlot.findFirst({
                                        where: {
                                            propertyId: property.id,
                                            startTime: {
                                                lte: (0, moment_1.default)(day.startTime).toISOString(),
                                            },
                                            endTime: {
                                                gte: (0, moment_1.default)(day.endTime).toISOString(),
                                            },
                                        },
                                    })];
                            case 6:
                                daySlot = _c.sent();
                                if (daySlot !== null) {
                                    // check if slot is still available
                                    if (!(daySlot.bookingId === null && daySlot.bookedStartTime === null && daySlot.bookedEndTime === null)) {
                                        return [2 /*return*/, {
                                                NoAvailableSlots: {
                                                    message: "No available daySlot on ".concat(day.startTime, " for booking request."),
                                                },
                                            }];
                                    }
                                    day.daySlotId = daySlot.id;
                                }
                                else {
                                    return [2 /*return*/, {
                                            NoAvailableSlots: {
                                                message: "No available daySlot on ".concat(day.startTime, " for booking request."),
                                            },
                                        }];
                                }
                                _c.label = 7;
                            case 7: return [3 /*break*/, 4];
                            case 8: return [3 /*break*/, 15];
                            case 9:
                                e_1_1 = _c.sent();
                                e_1 = { error: e_1_1 };
                                return [3 /*break*/, 15];
                            case 10:
                                _c.trys.push([10, , 13, 14]);
                                if (!(daySlotDates_1_1 && !daySlotDates_1_1.done && (_a = daySlotDates_1.return))) return [3 /*break*/, 12];
                                return [4 /*yield*/, _a.call(daySlotDates_1)];
                            case 11:
                                _c.sent();
                                _c.label = 12;
                            case 12: return [3 /*break*/, 14];
                            case 13:
                                if (e_1) throw e_1.error;
                                return [7 /*endfinally*/];
                            case 14: return [7 /*endfinally*/];
                            case 15:
                                price = (0, helperFunctions_1.calculatePrice)(daySlotDates, property.hourlyPrice);
                                _c.label = 16;
                            case 16:
                                _c.trys.push([16, 18, , 19]);
                                return [4 /*yield*/, bookingService_1.BookingService.createBooking(user.id, property.id, price, startDate, endDate, frequency)];
                            case 17:
                                booking = _c.sent();
                                return [3 /*break*/, 19];
                            case 18:
                                error_1 = _c.sent();
                                errorMessage = 'Unknown error when creating booking';
                                if (error_1 instanceof Error) {
                                    errorMessage = "".concat(errorMessage, ": ").concat(error_1.message, ".");
                                }
                                return [2 /*return*/, {
                                        UnknownError: {
                                            message: errorMessage,
                                        },
                                    }];
                            case 19:
                                // update daySlots to mark them as booked
                                try {
                                    bookingService_1.BookingService.bookDaySlots(daySlotDates, property.id, booking.id);
                                }
                                catch (error) {
                                    // if error occurs delete existing booking
                                    ctx.prisma.booking.delete({
                                        where: {
                                            id: booking.id,
                                        },
                                    });
                                    errorMessage = 'Unknown error when updating daySlots';
                                    if (error instanceof Error) {
                                        errorMessage = "".concat(errorMessage, ": ").concat(error.message, ".");
                                    }
                                    return [2 /*return*/, {
                                            UnknownError: {
                                                message: errorMessage,
                                            },
                                        }];
                                }
                                // if no error was returned so far every step is succeeded, booking can be returned
                                return [2 /*return*/, { Booking: booking }];
                        }
                    });
                });
            },
        });
    },
});
