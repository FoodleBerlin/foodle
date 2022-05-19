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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
var prisma_1 = __importDefault(require("../server/singletons/prisma"));
var clean_1 = require("./clean");
function seed() {
    return __awaiter(this, void 0, void 0, function () {
        var users, _a, _b, prop1, prop2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, (0, clean_1.clean)()];
                case 1:
                    _c.sent();
                    _b = (_a = Promise).all;
                    return [4 /*yield*/, prisma_1.default.$transaction([
                            prisma_1.default.user.createMany({
                                data: [
                                    {
                                        id: '1',
                                        email: 'user1@gmail.com',
                                        handle: 'user1',
                                        fullName: 'User 1',
                                        role: 'tenant',
                                        zip: 13000,
                                        description: 'desc',
                                        passportS3Id: 'passS3',
                                        solvencyS3Id: 'solvS3',
                                        licenseS3Id: 'liceS3',
                                    },
                                    {
                                        id: '2',
                                        email: 'use2@gmail.com',
                                        handle: 'user2',
                                        fullName: 'User 2',
                                        role: 'tenant',
                                        zip: 14000,
                                        description: 'desc',
                                        passportS3Id: 'passS3',
                                        solvencyS3Id: 'solvS3',
                                        licenseS3Id: 'liceS3',
                                    },
                                    {
                                        id: '3',
                                        email: 'user3@gmail.com',
                                        handle: 'user3',
                                        fullName: 'User 3',
                                        role: 'tenant',
                                        zip: 14000,
                                        description: 'desc',
                                        passportS3Id: 'passS3',
                                        solvencyS3Id: 'solvS3',
                                        licenseS3Id: 'liceS3',
                                    },
                                    {
                                        id: '4',
                                        email: 'user4@gmail.com',
                                        handle: 'user4',
                                        fullName: 'User 4',
                                        role: 'landlord',
                                        zip: 15000,
                                        description: 'desc',
                                        passportS3Id: 'passS3',
                                        solvencyS3Id: 'solvS3',
                                        licenseS3Id: 'liceS3',
                                    },
                                    {
                                        id: '5',
                                        email: 'user5@gmail.com',
                                        handle: 'user5',
                                        fullName: 'User 5',
                                        role: 'tenantLandlord',
                                        zip: 16000,
                                        description: 'desc',
                                        passportS3Id: 'passS3',
                                        solvencyS3Id: 'solvS3',
                                        licenseS3Id: 'liceS3',
                                    },
                                ],
                            }),
                        ])];
                case 2: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                case 3:
                    users = (_c.sent())[0];
                    return [4 /*yield*/, prisma_1.default.$transaction([
                            prisma_1.default.property.createMany({
                                data: [
                                    {
                                        zip: 1355,
                                        size: 123,
                                        street: 'sample-street',
                                        streetNumber: 23,
                                        city: 'Berlin',
                                        description: 'user1-listing',
                                        serviceFee: 5,
                                        rules: ['rule-1', 'rule-2'],
                                        title: 'prop title',
                                        hourlyPrice: 12,
                                        deposit: 2,
                                        images: ['test-image-url'],
                                        partialSpace: false,
                                        ownerId: '1',
                                        handle: 'prop1',
                                    },
                                    {
                                        zip: 1355,
                                        size: 123,
                                        street: 'sample-street',
                                        streetNumber: 23,
                                        city: 'Berlin',
                                        description: 'user1-listing',
                                        serviceFee: 5,
                                        rules: ['rule-1', 'rule-2'],
                                        title: 'prop title',
                                        hourlyPrice: 12,
                                        deposit: 2,
                                        images: ['test-image-url'],
                                        partialSpace: false,
                                        ownerId: '2',
                                        handle: 'prop2',
                                    },
                                    {
                                        zip: 1355,
                                        size: 123,
                                        street: 'sample-street',
                                        streetNumber: 23,
                                        city: 'Berlin',
                                        description: 'user1-listing',
                                        serviceFee: 5,
                                        rules: ['rule-1', 'rule-2'],
                                        title: 'prop title',
                                        hourlyPrice: 12,
                                        deposit: 2,
                                        images: ['test-image-url'],
                                        partialSpace: false,
                                        ownerId: '2',
                                        handle: 'prop3',
                                    },
                                ],
                            }),
                        ])];
                case 4:
                    _c.sent();
                    return [4 /*yield*/, prisma_1.default.property.findUnique({
                            where: {
                                handle: 'prop1',
                            },
                        })];
                case 5:
                    prop1 = _c.sent();
                    if (prop1 == null) {
                        throw Error('Error while seeding db, property with handle prop1 does not exist.');
                    }
                    return [4 /*yield*/, prisma_1.default.property.findUnique({
                            where: {
                                handle: 'prop2',
                            },
                        })];
                case 6:
                    prop2 = _c.sent();
                    if (prop2 == null) {
                        throw Error('Error while seeding db, property with handle prop2 does not exist.');
                    }
                    // seeding for booking request
                    return [4 /*yield*/, prisma_1.default.$transaction([
                            prisma_1.default.daySlot.createMany({
                                data: [
                                    /*
                                  test weekly, one weekday
                                  {
                                    daySlots: {
                                      startTime: '2022-06-27T08:00:00.003Z',
                                      endTime: '2022-06-27T16:00:00.003Z',
                                    },
                                    frequency: 'NONE',
                                    startDate: '2022-06-27T08:00:00.003Z',
                                    endDate: '2022-07-25T08:00:00.003Z',
                                    propertyHandle: 'prop1',
                                  } */
                                    {
                                        startTime: '2022-06-27T08:00:00.003Z',
                                        endTime: '2022-06-27T16:00:00.003Z',
                                        propertyId: prop1.id,
                                    },
                                    {
                                        startTime: '2022-07-04T08:00:00.003Z',
                                        endTime: '2022-07-04T16:00:00.003Z',
                                        propertyId: prop1.id,
                                    },
                                    {
                                        startTime: '2022-07-11T08:00:00.003Z',
                                        endTime: '2022-07-11T16:00:00.003Z',
                                        propertyId: prop1.id,
                                    },
                                    {
                                        startTime: '2022-07-18T08:00:00.003Z',
                                        endTime: '2022-07-18T16:00:00.003Z',
                                        propertyId: prop1.id,
                                    },
                                    {
                                        startTime: '2022-07-25T08:00:00.003Z',
                                        endTime: '2022-07-25T16:00:00.003Z',
                                        propertyId: prop1.id,
                                    },
                                    /*
                                      test monthly + multiple weekdays + varying day time
                                      
                                      const bookingVars = {
                                        daySlots: [
                                          {
                                            startTime: '2022-05-23T10:00:00.003Z',
                                            endTime: '2022-05-23T16:00:00.003Z',
                                          },
                                          {
                                            startTime: '2022-05-25T08:00:00.003Z',
                                            endTime: '2022-05-25T16:00:00.003Z',
                                          },
                                        ],
                                        frequency: 'MONTHLY',
                                        startDate: '2022-05-25T08:00:00.003Z',
                                        endDate: '2022-07-22T08:00:00.003Z',
                                        propertyHandle: 'prop2',
                                      };
                                    */
                                    {
                                        startTime: '2022-05-25T08:00:00.003Z',
                                        endTime: '2022-05-25T16:00:00.003Z',
                                        propertyId: prop2.id,
                                    },
                                    {
                                        startTime: '2022-05-23T08:00:00.003Z',
                                        endTime: '2022-05-23T16:00:00.003Z',
                                        propertyId: prop2.id,
                                    },
                                    {
                                        startTime: '2022-06-20T08:30:00.003Z',
                                        endTime: '2022-06-20T16:00:00.003Z',
                                        propertyId: prop2.id,
                                    },
                                    {
                                        startTime: '2022-06-22T08:00:00.003Z',
                                        endTime: '2022-06-22T16:00:00.003Z',
                                        propertyId: prop2.id,
                                    },
                                    {
                                        startTime: '2022-07-18T09:00:00.003Z',
                                        endTime: '2022-07-18T16:00:00.003Z',
                                        propertyId: prop2.id,
                                    },
                                    {
                                        startTime: '2022-07-20T08:00:00.003Z',
                                        endTime: '2022-07-20T16:00:00.003Z',
                                        propertyId: prop2.id,
                                    },
                                    /*
                                      test frequency none
                                      {
                                      "daySlots": {
                                        "startTime": "2022-06-27T09:00:00.003Z",
                                        "endTime": "2022-06-27T13:00:00.003Z",
                                        "weekday": "FRI"
                                      },
                                       {
                                        "startTime": "2022-06-27T08:00:00.003Z",
                                        "endTime": "2022-06-27T16:00:00.003Z",
                                        "weekday": "WED"
                                      },
                                      "frequency": "NONE",
                                      "startDate": "2022-05-25T08:00:00.003Z",
                                      "endDate": "2022-07-22T08:00:00.003Z",
                                      "propertyHandle": "prop2"
                                    } */
                                    {
                                        startTime: '2022-08-19T08:00:00.003Z',
                                        endTime: '2022-08-19T16:00:00.003Z',
                                        propertyId: prop2.id,
                                    },
                                ],
                            }),
                        ])];
                case 7:
                    // seeding for booking request
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.seed = seed;
