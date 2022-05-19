"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrequencyEnum = exports.BookingStatusEnum = exports.WeekDayEnum = void 0;
var client_1 = require("@prisma/client");
var nexus_1 = require("nexus");
exports.WeekDayEnum = (0, nexus_1.enumType)({
    name: 'WeekDays',
    description: 'map nexus WeekDay to prisma enum',
    members: {
        MON: 1,
        TUE: 2,
        WED: 3,
        THU: 4,
        FRI: 5,
        SAT: 6,
        SUN: 7,
    },
});
exports.BookingStatusEnum = (0, nexus_1.enumType)({
    name: 'BookingStatus',
    description: 'map nexus BookingStatus to prisma enum',
    members: {
        ACCEPTED: client_1.BookingStatus.accepted,
        PENDING: client_1.BookingStatus.pending,
        REJECTED: client_1.BookingStatus.rejected,
    },
});
exports.FrequencyEnum = (0, nexus_1.enumType)({
    name: 'FrequencyEnum',
    description: 'map nexus frequency to prisma enum',
    members: {
        NONE: client_1.Frequency.none,
        WEEKLY: client_1.Frequency.weekly,
        MONTHLY: client_1.Frequency.monthly,
    },
});
