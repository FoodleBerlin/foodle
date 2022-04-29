"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
var nexus_1 = require("nexus");
exports.Booking = (0, nexus_1.objectType)({
    name: 'Booking',
    definition: function (t) {
        t.string('id');
    },
});
