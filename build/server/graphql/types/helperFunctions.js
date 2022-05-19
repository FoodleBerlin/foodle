"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePrice = exports.createHandle = void 0;
var moment_1 = __importDefault(require("moment"));
var uuid_1 = require("uuid");
/**
 * This function takes one concrete date as a first argument and a generic weekday (Mon, Tue, etc.) as second argument.
 * It checks if the concrete date matches with the weekday and returns true if they are the same otherwise false.
 */
function createHandle(title) {
    var id = (0, uuid_1.v4)().substring(0, 6);
    var titleFormatted = title.toLowerCase().trim().split(' ').join('_').replace(/\s/g, '');
    return "".concat(titleFormatted, "_").concat(id);
}
exports.createHandle = createHandle;
function calculatePrice(daySlotDates, price) {
    var hours = 0;
    daySlotDates.forEach(function (day) {
        var duration = moment_1.default.duration(day.endTime.diff(day.startTime));
        hours += duration.asHours();
    });
    return hours * price;
}
exports.calculatePrice = calculatePrice;
