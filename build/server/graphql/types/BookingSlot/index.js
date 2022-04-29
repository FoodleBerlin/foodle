"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingSlot = void 0;
var nexus_1 = require("nexus");
exports.BookingSlot = (0, nexus_1.objectType)({
    name: 'BookingSlot',
    definition: function (t) {
        t.string('id');
    },
});
