"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoAvailableSlots = exports.ClientErrorPropertyNotExists = exports.UnknownError = exports.ClientErrorInvalidHandle = exports.ClientErrorInvalidGenericDaySlotInput = exports.ClientErrorInvalidPropertySlotInput = exports.ClientErrorInvalidInput = exports.ClientErrorInvalidPropertyInput = exports.ClientErrorUserNotExists = void 0;
var nexus_1 = require("nexus");
exports.ClientErrorUserNotExists = (0, nexus_1.objectType)({
    name: 'ClientErrorUserNotExists',
    definition: function (t) {
        t.string('message');
    },
});
exports.ClientErrorInvalidPropertyInput = (0, nexus_1.objectType)({
    name: 'ClientErrorInvalidPropertyInput',
    definition: function (t) {
        t.string('message');
    },
});
exports.ClientErrorInvalidInput = (0, nexus_1.objectType)({
    name: "ClientErrorInvalidInput",
    definition: function (t) {
        t.string("message");
    },
});
exports.ClientErrorInvalidPropertySlotInput = (0, nexus_1.objectType)({
    name: "ClientErrorInvalidPropertySlotInput",
    definition: function (t) {
        t.string("message");
    },
});
exports.ClientErrorInvalidGenericDaySlotInput = (0, nexus_1.objectType)({
    name: "ClientErrorInvalidGenericDaySlotInput",
    definition: function (t) {
        t.string("message");
    },
});
exports.ClientErrorInvalidHandle = (0, nexus_1.objectType)({
    name: "ClientErrorInvalidHandle",
    definition: function (t) {
        t.string('message');
    },
});
exports.UnknownError = (0, nexus_1.objectType)({
    name: 'UnknownError',
    definition: function (t) {
        t.string('message');
    },
});
exports.ClientErrorPropertyNotExists = (0, nexus_1.objectType)({
    name: 'ClientErrorPropertyNotExists',
    definition: function (t) {
        t.string('message');
    },
});
exports.NoAvailableSlots = (0, nexus_1.objectType)({
    name: 'NoAvailableSlots',
    definition: function (t) {
        t.string('message');
    },
});
