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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestService = exports.BookingService = void 0;
var client_1 = require("@prisma/client");
var moment_1 = __importDefault(require("moment"));
var prisma_1 = __importDefault(require("./prisma"));
exports.BookingService = {
    // update all daySlots with bookingId to mark them as booked
    bookDaySlots: function (daySlotDates, propertyId, bookingId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(daySlotDates.map(function (day) {
                            // updates as transaction => if one update fails all fail
                            var id = '';
                            if (day.daySlotId !== undefined) {
                                id = day.daySlotId;
                            }
                            prisma_1.default.$transaction([
                                prisma_1.default.daySlot.update({
                                    where: {
                                        id: id,
                                    },
                                    data: {
                                        bookingId: bookingId,
                                        bookedStartTime: day.startTime.toISOString(),
                                        bookedEndTime: day.endTime.toISOString(),
                                    },
                                }),
                            ]);
                        }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
    createBooking: function (userId, propertyId, price, startDate, endDate, frequency) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, prisma_1.default.booking.create({
                        data: {
                            tenantId: userId,
                            propertyId: propertyId,
                            bookingStatus: client_1.BookingStatus.pending,
                            totalPrice: price,
                            startDate: startDate.toISOString(),
                            endDate: endDate.toISOString(),
                            frequency: frequency,
                        },
                    })];
            });
        });
    },
    calculateDates: function (daySlots, startDate, endDate, frequency) {
        var daySlotDates = [];
        // loop through availableDays and get all specific dates for each generic day
        daySlots.forEach(function (availabeDay) {
            // calling isoWeekday, directly on startTime causes error: "TypeError: availabeDay.startTime.isoWeekday is not a function"
            var weekday = (0, moment_1.default)(availabeDay.startTime.toISOString()).isoWeekday();
            var firstConcreteDate = startDate;
            // find first concrete date for generic weekday (Mon, Tue, etc.) as it does not necessarily match with args.startDate ans save it as nextWeekday
            while (!compareDateWithDayOfWeek(firstConcreteDate, weekday)) {
                firstConcreteDate = (0, moment_1.default)(firstConcreteDate).add(1, 'days');
            }
            // get all concrete dates for the generic weekday in the timeslot, according to the frequency
            var datesForWeekday = getAllDatesForWeekday(firstConcreteDate, frequency, endDate, weekday, (0, moment_1.default)(availabeDay.startTime), (0, moment_1.default)(availabeDay.endTime));
            datesForWeekday.forEach(function (date) {
                daySlotDates.push(date);
            });
        });
        return daySlotDates;
    },
};
function getAllDatesForWeekday(loopDay, frequency, endDate, weekday, starTime, endTime) {
    var allDates = [];
    var copy1 = (0, moment_1.default)(__assign({}, loopDay));
    var copy2 = (0, moment_1.default)(__assign({}, loopDay));
    var firstDay = {
        startTime: copy1.set({ hour: starTime.hour(), minute: starTime.minute() }),
        endTime: copy2.set({ hour: endTime.hour(), minute: endTime.minute() }),
    };
    allDates.push(firstDay);
    var momentCounter = 1;
    while ((0, moment_1.default)(loopDay).isBefore(endDate)) {
        if (frequency == client_1.Frequency.weekly) {
            loopDay = (0, moment_1.default)(loopDay).add(7, 'days');
        }
        else if (frequency == client_1.Frequency.monthly) {
            loopDay = (0, moment_1.default)(loopDay).add(4, 'weeks');
            /*
            Instead of defining monthly as a 4 week intervall we could also define monthly as
            once a month. As this would lead to irregular 4/5 week intervalls and I think that
            landlords and cooks would want constant intervalls I commented it out. But if you
            want rather 'actual' monthly intervalls we can change it back.
            
            loopDay = moment().endOf('month');
            while (loopDay.day() !== weekday) {
              loopDay.subtract(1, 'day');
            }
      
            loopDay = moment(firstDay.startTime).add(momentCounter, 'month');
            const month = loopDay.month();
            momentCounter++;
            while (loopDay.isoWeekday() != weekday) {
              loopDay = moment(loopDay).add(1, 'days');
            }
            // if loopDay is already in next month
            if (loopDay.month() !== month) {
              loopDay = loopDay.subtract(1, 'days');
              while (loopDay.isoWeekday() !== weekday) {
                loopDay = loopDay.subtract(1, 'days');
              }
            }
            */
        }
        if ((0, moment_1.default)(loopDay).isBefore(endDate) && frequency != client_1.Frequency.none) {
            var loopDay1 = (0, moment_1.default)(__assign({}, loopDay));
            var loopDay2 = (0, moment_1.default)(__assign({}, loopDay));
            allDates.push({
                startTime: loopDay1.set({ hour: starTime.hour(), minute: starTime.minute() }),
                endTime: loopDay2.set({ hour: endTime.hour(), minute: endTime.minute() }),
            });
        }
        if (frequency == client_1.Frequency.none) {
            break;
        }
    }
    return allDates;
}
function compareDateWithDayOfWeek(date, weekday) {
    if (date.isoWeekday() === weekday) {
        return true;
    }
    else {
        return false;
    }
}
// Only export for unit testing => https://stackoverflow.com/questions/54116070/how-can-i-unit-test-non-exported-functions
exports.TestService = {
    getAllDatesForWeekday: getAllDatesForWeekday,
    compareDateWithDayOfWeek: compareDateWithDayOfWeek,
};
