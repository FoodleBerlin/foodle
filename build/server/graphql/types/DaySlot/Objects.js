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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DaySlot = void 0;
var nexus_1 = require("nexus");
var Booking_1 = require("../Booking");
var Property_1 = require("../Property");
exports.DaySlot = (0, nexus_1.objectType)({
    name: 'DaySlot',
    definition: function (t) {
        t.field('startTime', {
            type: 'DateTime',
        });
        t.field('endTime', {
            type: 'DateTime',
        });
        t.nullable.field('bookedStartTime', {
            type: 'DateTime',
            resolve: function (parent, args, ctx) {
                if (parent.bookedEndTime == null) {
                    return null;
                }
                else {
                    return parent.bookedEndTime;
                }
            },
        });
        t.nullable.field('bookedStartTime', {
            type: 'DateTime',
            resolve: function (parent, args, ctx) {
                if (parent.bookedEndTime == null) {
                    return null;
                }
                else {
                    return parent.bookedEndTime;
                }
            },
        });
        t.nullable.field('property', {
            type: Property_1.Property,
            resolve: function (parent, args, ctx) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, ctx.prisma.property.findUnique({
                                    where: {
                                        id: parent.propertyId,
                                    },
                                })];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                });
            },
        });
        t.nullable.field('booking', {
            type: Booking_1.Booking,
            resolve: function (parent, args, ctx) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(parent.bookingId !== null)) return [3 /*break*/, 2];
                                return [4 /*yield*/, ctx.prisma.booking.findUnique({
                                        where: {
                                            id: parent.bookingId,
                                        },
                                    })];
                            case 1: return [2 /*return*/, _a.sent()];
                            case 2: return [2 /*return*/, null];
                        }
                    });
                });
            },
        });
    },
});
