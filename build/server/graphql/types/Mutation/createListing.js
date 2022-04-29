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
exports.CreateListing = exports.CreatePropertyReturn = exports.Mutation = void 0;
var nexus_1 = require("nexus");
var Error_1 = require("../Error");
var uuid_1 = require("uuid");
var index_1 = require("../../../validation/index");
var PropertySlot_1 = require("../PropertySlot");
exports.Mutation = (0, nexus_1.extendType)({
    type: 'Mutation',
    definition: function (t) {
        t.field('createUser', {
            type: 'Boolean',
            resolve: function () {
                return true;
            },
        });
    },
});
exports.CreatePropertyReturn = (0, nexus_1.objectType)({
    name: 'createPropertyReturn',
    definition: function (t) {
        t.nullable.field('Property', { type: 'Property' });
        t.nullable.field('ClientErrorUserNotExists', {
            type: Error_1.ClientErrorUserNotExists,
        });
        t.nullable.field('ClientErrorInvalidHandle', {
            type: Error_1.ClientErrorInvalidHandle,
        });
        t.nullable.field('ClientErrorInvalidInputLength', {
            type: Error_1.ClientErrorInvalidInputLength,
        });
        t.nullable.field('ClientErrorInvalidPropertyInput', {
            type: Error_1.ClientErrorInvalidPropertyInput,
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
            type: 'createPropertyReturn',
            args: {
                size: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
                title: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                ownerId: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                street: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                streetNumber: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
                zip: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
                city: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                description: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                pickup: (0, nexus_1.nullable)((0, nexus_1.booleanArg)()),
                hourlyPrice: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
                serviceFee: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
                facilities: (0, nexus_1.nonNull)((0, nexus_1.list)((0, nexus_1.nonNull)((0, nexus_1.stringArg)()))),
                rules: (0, nexus_1.nonNull)((0, nexus_1.list)((0, nexus_1.nonNull)((0, nexus_1.stringArg)()))),
                deposit: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
                images: (0, nexus_1.nonNull)((0, nexus_1.list)((0, nexus_1.nonNull)((0, nexus_1.stringArg)()))),
                partialSpace: (0, nexus_1.nonNull)((0, nexus_1.booleanArg)()),
                availabilities: (0, nexus_1.nonNull)(PropertySlot_1.PropertySlotInput),
            },
            //check user exists, street length not empty, not longer than 200, zip code lengt, city, enumsn nullable in db? rules
            resolve: function (_root, args, ctx) {
                var _a;
                return __awaiter(this, void 0, void 0, function () {
                    var isInvalidUser, isInvalidZipLength, isInvalidCityLength, isInvalidStreetLength, isInvalidDescriptionLength, prop, error_1, errorMessage;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                isInvalidUser = (0, index_1.checkUserExists)(args.ownerId);
                                if (isInvalidUser)
                                    return [2 /*return*/, isInvalidUser];
                                isInvalidZipLength = (0, index_1.checkInvalidInputLength)("Zip code", args.zip.toString(), 5);
                                if (isInvalidZipLength)
                                    return [2 /*return*/, isInvalidZipLength];
                                isInvalidCityLength = (0, index_1.checkInvalidInputLength)("City name", args.city, 200);
                                if (isInvalidCityLength)
                                    return [2 /*return*/, isInvalidCityLength];
                                isInvalidStreetLength = (0, index_1.checkInvalidInputLength)("Street name", args.street, 200);
                                if (isInvalidStreetLength)
                                    return [2 /*return*/, isInvalidStreetLength];
                                isInvalidDescriptionLength = (0, index_1.checkInvalidInputLength)("Description", args.description, 1000);
                                if (isInvalidDescriptionLength)
                                    return [2 /*return*/, isInvalidDescriptionLength];
                                _b.label = 1;
                            case 1:
                                _b.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, ctx.prisma.property.create({ data: { size: args.size,
                                            ownerId: args.ownerId,
                                            handle: createHandle(args.title),
                                            title: args.title,
                                            street: args.street,
                                            streetNumber: args.streetNumber,
                                            zip: args.zip,
                                            city: args.city,
                                            description: args.description,
                                            rules: args.rules,
                                            serviceFee: args.serviceFee,
                                            hourlyPrice: args.hourlyPrice,
                                            facilities: args.facilities,
                                            deposit: args.deposit,
                                            images: args.images,
                                            partialSpace: args.partialSpace,
                                            pickup: (_a = args.pickup) !== null && _a !== void 0 ? _a : false,
                                            availabilities: { create: { endDate: args.availabilities.endDate,
                                                    startDate: args.availabilities.startDate,
                                                    frequency: args.availabilities.frequency,
                                                    minMonths: args.availabilities.minMonths,
                                                    availableDays: { createMany: {
                                                            data: args.availabilities.availableDays.filter(index_1.notEmpty)
                                                        } }
                                                } }, } })];
                            case 2:
                                prop = _b.sent();
                                return [2 /*return*/, { Property: prop }];
                            case 3:
                                error_1 = _b.sent();
                                console.log({ error: error_1 });
                                errorMessage = 'Unknown error';
                                if (error_1 instanceof Error) {
                                    errorMessage = error_1.message;
                                }
                                return [2 /*return*/, {
                                        UnknownError: {
                                            message: errorMessage,
                                        },
                                    }];
                            case 4: return [2 /*return*/];
                        }
                    });
                });
            },
        });
    },
});
function createHandle(title) {
    var id = (0, uuid_1.v4)().substring(0, 6);
    // TODO remove multiple spaces
    var titleFormatted = title.toLowerCase().trim().split(' ').join('_');
    return titleFormatted + "_" + id;
}
