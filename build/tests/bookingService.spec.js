"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var moment_1 = __importDefault(require("moment"));
var bookingService_1 = require("../server/singletons/bookingService");
var startDate = (0, moment_1.default)('2022-06-27T10:00:00.000+0200');
var endDate = (0, moment_1.default)('2022-08-27T10:00:00.000+0200');
var startTime = (0, moment_1.default)('2022-06-27T10:00:00.000+0200');
var endTime = (0, moment_1.default)('2022-08-27T18:00:00.000+0200');
var weekDay = 1;
test('tes getAllDatesForWeekday() with frequency = none', function () {
    var actualDates = bookingService_1.TestService.getAllDatesForWeekday(startDate, client_1.Frequency.none, endDate, weekDay, startTime, endTime);
    var expectedDates = [
        {
            startTime: (0, moment_1.default)('2022-06-27T10:00:00.000+0200'),
            endTime: (0, moment_1.default)('2022-06-27T18:00:00.000+0200'),
        },
    ];
    expect(JSON.stringify(expectedDates)).toStrictEqual(JSON.stringify(actualDates));
});
test('tes getAllDatesForWeekday() with frequency = monthly', function () {
    var actualDates = bookingService_1.TestService.getAllDatesForWeekday(startDate, client_1.Frequency.monthly, endDate, weekDay, startTime, endTime);
    var expectedDates = [
        {
            startTime: (0, moment_1.default)('2022-06-27T10:00:00.000+0200'),
            endTime: (0, moment_1.default)('2022-06-27T18:00:00.000+0200'),
        },
        {
            startTime: (0, moment_1.default)('2022-07-25T10:00:00.000+0200'),
            endTime: (0, moment_1.default)('2022-07-25T18:00:00.000+0200'),
        },
        {
            startTime: (0, moment_1.default)('2022-08-22T10:00:00.000+0200'),
            endTime: (0, moment_1.default)('2022-08-22T18:00:00.000+0200'),
        },
    ];
    expect(JSON.stringify(expectedDates)).toStrictEqual(JSON.stringify(actualDates));
});
test('tes getAllDatesForWeekday() with frequency = weekly', function () {
    var actualDates = bookingService_1.TestService.getAllDatesForWeekday(startDate, client_1.Frequency.weekly, endDate, weekDay, startTime, endTime);
    var expectedDates = [
        {
            startTime: (0, moment_1.default)('2022-06-27T10:00:00.000+0200'),
            endTime: (0, moment_1.default)('2022-06-27T18:00:00.000+0200'),
        },
        {
            startTime: (0, moment_1.default)('2022-07-04T10:00:00.000+0200'),
            endTime: (0, moment_1.default)('2022-07-04T18:00:00.000+0200'),
        },
        {
            startTime: (0, moment_1.default)('2022-07-11T10:00:00.000+0200'),
            endTime: (0, moment_1.default)('2022-07-11T18:00:00.000+0200'),
        },
        {
            startTime: (0, moment_1.default)('2022-07-18T10:00:00.000+0200'),
            endTime: (0, moment_1.default)('2022-07-18T18:00:00.000+0200'),
        },
        {
            startTime: (0, moment_1.default)('2022-07-25T10:00:00.000+0200'),
            endTime: (0, moment_1.default)('2022-07-25T18:00:00.000+0200'),
        },
        {
            startTime: (0, moment_1.default)('2022-08-01T10:00:00.000+0200'),
            endTime: (0, moment_1.default)('2022-08-01T18:00:00.000+0200'),
        },
        {
            startTime: (0, moment_1.default)('2022-08-08T10:00:00.000+0200'),
            endTime: (0, moment_1.default)('2022-08-08T18:00:00.000+0200'),
        },
        {
            startTime: (0, moment_1.default)('2022-08-15T10:00:00.000+0200'),
            endTime: (0, moment_1.default)('2022-08-15T18:00:00.000+0200'),
        },
        {
            startTime: (0, moment_1.default)('2022-08-22T10:00:00.000+0200'),
            endTime: (0, moment_1.default)('2022-08-22T18:00:00.000+0200'),
        },
    ];
    expect(JSON.stringify(expectedDates)).toStrictEqual(JSON.stringify(actualDates));
});
test('test calculateDates() with single daySlot, startDate = weekDay', function () {
    var actualDates = bookingService_1.BookingService.calculateDates([
        {
            startTime: (0, moment_1.default)('2022-10-05T09:00:00.000+0200'),
            endTime: (0, moment_1.default)('2022-10-05T16:00:00.000+0200'),
        },
    ], (0, moment_1.default)('2022-10-05T10:00:00.000+0200'), (0, moment_1.default)('2022-11-03T10:00:00.000+0200'), client_1.Frequency.weekly);
    var expectedDates = [
        {
            startTime: (0, moment_1.default)('2022-10-05T09:00:00.000+0200'),
            endTime: (0, moment_1.default)('2022-10-05T16:00:00.000+0200'),
        },
        {
            startTime: (0, moment_1.default)('2022-10-12T09:00:00.000+0200'),
            endTime: (0, moment_1.default)('2022-10-12T16:00:00.000+0200'),
        },
        {
            startTime: (0, moment_1.default)('2022-10-19T09:00:00.000+0200'),
            endTime: (0, moment_1.default)('2022-10-19T16:00:00.000+0200'),
        },
        {
            startTime: (0, moment_1.default)('2022-10-26T09:00:00.000+0200'),
            endTime: (0, moment_1.default)('2022-10-26T16:00:00.000+0200'),
        },
        // Time change to winterTime
        {
            startTime: (0, moment_1.default)('2022-11-02T09:00:00.000+0100'),
            endTime: (0, moment_1.default)('2022-11-02T16:00:00.000+0100'),
        },
    ];
    expect(JSON.stringify(expectedDates)).toStrictEqual(JSON.stringify(actualDates));
});
test('test calculateDates() with single daySlot, startDate before weekDay of startTime', function () {
    var actualDates = bookingService_1.BookingService.calculateDates([
        {
            startTime: (0, moment_1.default)('2022-07-10T09:00:00.000+0200'),
            endTime: (0, moment_1.default)('2022-07-10T16:00:00.000+0200'),
        },
    ], (0, moment_1.default)('2022-07-04T10:00:00.000+0200'), (0, moment_1.default)('2022-08-20T10:00:00.000+0200'), client_1.Frequency.weekly);
    var expectedDates = [
        {
            startTime: (0, moment_1.default)('2022-07-10T09:00:00.000+0200'),
            endTime: (0, moment_1.default)('2022-07-10T16:00:00.000+0200'),
        },
        {
            startTime: (0, moment_1.default)('2022-07-17T09:00:00.000+0200'),
            endTime: (0, moment_1.default)('2022-07-17T16:00:00.000+0200'),
        },
        {
            startTime: (0, moment_1.default)('2022-07-24T09:00:00.000+0200'),
            endTime: (0, moment_1.default)('2022-07-24T16:00:00.000+0200'),
        },
        {
            startTime: (0, moment_1.default)('2022-07-31T09:00:00.000+0200'),
            endTime: (0, moment_1.default)('2022-07-31T16:00:00.000+0200'),
        },
        {
            startTime: (0, moment_1.default)('2022-08-07T09:00:00.000+0200'),
            endTime: (0, moment_1.default)('2022-08-07T16:00:00.000+0200'),
        },
        {
            startTime: (0, moment_1.default)('2022-08-14T09:00:00.000+0200'),
            endTime: (0, moment_1.default)('2022-08-14T16:00:00.000+0200'),
        },
    ];
    expect(JSON.stringify(expectedDates)).toStrictEqual(JSON.stringify(actualDates));
});
test('test calculateDates() with multiple daySlots', function () {
    var actualDates = bookingService_1.BookingService.calculateDates([
        {
            startTime: (0, moment_1.default)('2022-10-25T09:00:00.000+0200'),
            endTime: (0, moment_1.default)('2022-10-25T16:00:00.000+0200'),
        },
        {
            startTime: (0, moment_1.default)('2022-10-28T16:00:00.000+0200'),
            endTime: (0, moment_1.default)('2022-10-28T23:00:00.000+0200'),
        },
    ], (0, moment_1.default)('2022-10-24T09:00:00.000+0200'), (0, moment_1.default)('2023-02-27T16:00:00.000+0200'), client_1.Frequency.monthly);
    var expectedDates = [
        // first weekday
        {
            startTime: (0, moment_1.default)('2022-10-25T09:00:00.000+0200'),
            endTime: (0, moment_1.default)('2022-10-25T16:00:00.000+0200'),
        },
        // time change to winterTime 30.10
        {
            startTime: (0, moment_1.default)('2022-11-22T09:00:00.000+0100'),
            endTime: (0, moment_1.default)('2022-11-22T16:00:00.000+0100'),
        },
        {
            startTime: (0, moment_1.default)('2022-12-20T09:00:00.000+0100'),
            endTime: (0, moment_1.default)('2022-12-20T16:00:00.000+0100'),
        },
        {
            startTime: (0, moment_1.default)('2023-01-17T09:00:00.000+0100'),
            endTime: (0, moment_1.default)('2023-01-17T16:00:00.000+0100'),
        },
        {
            startTime: (0, moment_1.default)('2023-02-14T09:00:00.000+0100'),
            endTime: (0, moment_1.default)('2023-02-14T16:00:00.000+0100'),
        },
        // second weekday
        {
            startTime: (0, moment_1.default)('2022-10-28T16:00:00.000+0200'),
            endTime: (0, moment_1.default)('2022-10-28T23:00:00.000+0200'),
        },
        // time change to winterTime 30.10
        {
            startTime: (0, moment_1.default)('2022-11-25T16:00:00.000+0100'),
            endTime: (0, moment_1.default)('2022-11-25T23:00:00.000+0100'),
        },
        {
            startTime: (0, moment_1.default)('2022-12-23T16:00:00.000+0100'),
            endTime: (0, moment_1.default)('2022-12-23T23:00:00.000+0100'),
        },
        {
            startTime: (0, moment_1.default)('2023-01-20T16:00:00.000+0100'),
            endTime: (0, moment_1.default)('2023-01-20T23:00:00.000+0100'),
        },
        {
            startTime: (0, moment_1.default)('2023-02-17T16:00:00.000+0100'),
            endTime: (0, moment_1.default)('2023-02-17T23:00:00.000+0100'),
        },
    ];
    expect(JSON.stringify(expectedDates)).toStrictEqual(JSON.stringify(actualDates));
});
test('success compareDateWithDayOfWeek', function () {
    expect(bookingService_1.TestService.compareDateWithDayOfWeek((0, moment_1.default)('2022-11-25T16:00:00.000+0100'), 5)).toBe(true);
});
test('fail compareDateWithDayOfWeek', function () {
    expect(bookingService_1.TestService.compareDateWithDayOfWeek((0, moment_1.default)('2022-11-25T16:00:00.000+0100'), 1)).toBe(false);
});
