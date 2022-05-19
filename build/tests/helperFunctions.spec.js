"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = __importDefault(require("moment"));
var helperFunctions_1 = require("../server/graphql/types/helperFunctions");
test('test createHandle', function () {
    var handle = (0, helperFunctions_1.createHandle)('My Amazing Kitchen');
    expect(handle).toContain('my_amazing_kitchen_');
    expect(handle.length).toBe(25);
});
test('calculatePrice', function () {
    var days = [
        {
            startTime: (0, moment_1.default)('2022-08-27T10:00:00.000+0200'),
            endTime: (0, moment_1.default)('2022-08-27T18:00:00.000+0200'),
        },
        {
            startTime: (0, moment_1.default)('2022-08-28T09:00:00.000+0200'),
            endTime: (0, moment_1.default)('2022-08-28T12:00:00.000+0200'),
        },
        {
            startTime: (0, moment_1.default)('2022-08-29T11:00:00.000+0200'),
            endTime: (0, moment_1.default)('2022-08-29T20:00:00.000+0200'),
        },
    ];
    var expectedPrice = 2419.6;
    var actualPrice = (0, helperFunctions_1.calculatePrice)(days, 120.98);
    expect(actualPrice).toBe(expectedPrice);
});
