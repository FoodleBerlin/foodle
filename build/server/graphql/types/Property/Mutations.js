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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateListing = exports.CreateListingReturn = void 0;
var moment_1 = __importDefault(require("moment"));
var nexus_1 = require("nexus");
var bookingService_1 = require("../../../singletons/bookingService");
var validatorService_1 = require("../../../singletons/validatorService");
var Enums_1 = require("../EnumsScalars/Enums");
var Error_1 = require("../Error");
var helperFunctions_1 = require("../helperFunctions");
var Objects_1 = require("./Objects");
exports.CreateListingReturn = (0, nexus_1.objectType)({
    name: 'CreateListingReturn',
    definition: function (t) {
        t.nullable.field('Property', { type: 'Property' });
        t.nullable.field('ClientErrorUserNotExists', {
            type: Error_1.ClientErrorUserNotExists,
        });
        t.nullable.field('ClientErrorInvalidInput', {
            type: Error_1.ClientErrorInvalidInput,
        });
        t.nullable.field('NoAvailableSlots', {
            type: Error_1.NoAvailableSlots,
        });
        t.nullable.field('UnknownError', {
            type: Error_1.UnknownError,
        });
    },
});
exports.CreateListing = (0, nexus_1.extendType)({
    type: 'Mutation',
    definition: function (p) {
        p.field('createListing', {
            type: exports.CreateListingReturn,
            args: {
                size: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
                title: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                ownerHandle: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                street: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                streetNumber: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
                zip: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
                city: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                description: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                pickup: (0, nexus_1.nullable)((0, nexus_1.booleanArg)()),
                hourlyPrice: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
                serviceFee: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
                rules: (0, nexus_1.nonNull)((0, nexus_1.list)((0, nexus_1.nonNull)((0, nexus_1.stringArg)()))),
                deposit: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
                images: (0, nexus_1.nonNull)((0, nexus_1.list)((0, nexus_1.nonNull)((0, nexus_1.stringArg)()))),
                partialSpace: (0, nexus_1.nonNull)((0, nexus_1.booleanArg)()),
                startDate: (0, nexus_1.nonNull)('DateTime'),
                endDate: (0, nexus_1.nonNull)('DateTime'),
                frequency: (0, nexus_1.nonNull)(Enums_1.FrequencyEnum),
                availableDays: (0, nexus_1.nonNull)((0, nexus_1.list)((0, nexus_1.nonNull)(Objects_1.AvailableDay))),
            },
            resolve: function (_root, args, ctx) {
                var _a, _b, _c;
                return __awaiter(this, void 0, void 0, function () {
                    var user, invalidInputLengthError, startDate, endDate, frequency, a, daySlotDates, prop, error_1, errorMessage, error_2, errorMessage;
                    var _this = this;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                // validate input
                                if (((_a = ctx.user) === null || _a === void 0 ? void 0 : _a.id) == undefined) {
                                    return [2 /*return*/, {
                                            ClientErrorUserNotExists: { message: "User needs to log in when requesting bookings." },
                                        }];
                                }
                                return [4 /*yield*/, validatorService_1.ValidatorService.userExists((_b = ctx.user) === null || _b === void 0 ? void 0 : _b.id)];
                            case 1:
                                user = _d.sent();
                                if (user === null) {
                                    return [2 /*return*/, {
                                            ClientErrorUserNotExists: { message: "User not found." },
                                        }];
                                }
                                invalidInputLengthError = function (inputType, arg, maxLength) {
                                    return {
                                        ClientErrorInvalidInput: {
                                            message: "".concat(inputType, " ").concat(arg, " is invalid, must have a max length of ").concat(maxLength, " characters."),
                                        },
                                    };
                                };
                                if (validatorService_1.ValidatorService.isOverMaxLength(args.zip.toString(), 5)) {
                                    return [2 /*return*/, invalidInputLengthError('Zip code', args.zip.toString(), 5)];
                                }
                                if (validatorService_1.ValidatorService.isOverMaxLength(args.city, 50)) {
                                    return [2 /*return*/, invalidInputLengthError('City name', args.city, 50)];
                                }
                                if (validatorService_1.ValidatorService.isOverMaxLength(args.street, 50)) {
                                    return [2 /*return*/, invalidInputLengthError('Street name', args.street, 50)];
                                }
                                if (validatorService_1.ValidatorService.isOverMaxLength(args.description, 1000)) {
                                    return [2 /*return*/, invalidInputLengthError('Description', args.description, 1000)];
                                }
                                if (!validatorService_1.ValidatorService.validateStartEndDate((0, moment_1.default)(args.startDate), (0, moment_1.default)(args.endDate))) {
                                    return [2 /*return*/, {
                                            ClientErrorInvalidInput: {
                                                message: "startDate should be before endDate",
                                            },
                                        }];
                                }
                                if (!validatorService_1.ValidatorService.validateStartEndDate((0, moment_1.default)(args.startDate), (0, moment_1.default)(args.endDate))) {
                                    return [2 /*return*/, {
                                            ClientErrorInvalidInput: {
                                                message: "Starttime of daySlot should be before endTime.",
                                            },
                                        }];
                                }
                                if (validatorService_1.ValidatorService.checkForEmptyList(args.availableDays)) {
                                    return [2 /*return*/, {
                                            ClientErrorInvalidInput: {
                                                message: "List argument availableDays must not be empty.",
                                            },
                                        }];
                                }
                                args.availableDays.forEach(function (day) {
                                    if (validatorService_1.ValidatorService.validateDaySlot(day)) {
                                        return {
                                            ClientErrorInvalidInput: {
                                                message: "Invalid input for availableDay ".concat(day.startTime, ": startTime can't be after endTime and startTime and endTime have to be on the same day."),
                                            },
                                        };
                                    }
                                });
                                startDate = (0, moment_1.default)(args.startDate);
                                endDate = (0, moment_1.default)(args.endDate);
                                frequency = args.frequency;
                                a = args.availableDays;
                                daySlotDates = bookingService_1.BookingService.calculateDates(args.availableDays, startDate, endDate, frequency);
                                // throw error if more than 100 day slots would be created
                                if (daySlotDates.length > 100) {
                                    return [2 /*return*/, {
                                            ClientErrorInvalidInput: {
                                                message: "".concat(daySlotDates.length, " daySlots, max creation of 100 day slots  at once."),
                                            },
                                        }];
                                }
                                _d.label = 2;
                            case 2:
                                _d.trys.push([2, 4, , 5]);
                                return [4 /*yield*/, ctx.prisma.property.create({
                                        data: {
                                            size: args.size,
                                            ownerId: user.id,
                                            street: args.street,
                                            title: args.title.toLowerCase(),
                                            handle: (0, helperFunctions_1.createHandle)(args.title),
                                            streetNumber: args.streetNumber,
                                            zip: args.zip,
                                            city: args.city,
                                            description: args.description,
                                            rules: args.rules,
                                            serviceFee: args.serviceFee,
                                            hourlyPrice: args.hourlyPrice,
                                            deposit: args.deposit,
                                            images: args.images,
                                            partialSpace: args.partialSpace,
                                            pickup: (_c = args.pickup) !== null && _c !== void 0 ? _c : false,
                                        },
                                    })];
                            case 3:
                                prop = _d.sent();
                                return [3 /*break*/, 5];
                            case 4:
                                error_1 = _d.sent();
                                errorMessage = 'Unknown error when creating a property: ';
                                if (error_1 instanceof Error) {
                                    errorMessage = error_1.message;
                                }
                                return [2 /*return*/, {
                                        UnknownError: {
                                            message: errorMessage,
                                        },
                                    }];
                            case 5:
                                _d.trys.push([5, 7, , 8]);
                                return [4 /*yield*/, Promise.all(daySlotDates.map(function (day) { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, ctx.prisma.daySlot.create({
                                                        data: {
                                                            startTime: day.startTime.toISOString(),
                                                            endTime: day.endTime.toISOString(),
                                                            propertyId: prop.id,
                                                        },
                                                    })];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); }))];
                            case 6:
                                _d.sent();
                                // if no error occured so far, listing was succesfully created and property can be returned
                                return [2 /*return*/, { Property: prop }];
                            case 7:
                                error_2 = _d.sent();
                                errorMessage = 'Unknown error when creating a daySlots ';
                                if (error_2 instanceof Error) {
                                    errorMessage = error_2.message;
                                }
                                return [2 /*return*/, {
                                        UnknownError: {
                                            message: errorMessage,
                                        },
                                    }];
                            case 8: return [2 /*return*/];
                        }
                    });
                });
            },
        });
    },
});
