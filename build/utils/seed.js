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
function seed() {
    return __awaiter(this, void 0, void 0, function () {
        var users, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
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
                                        description: "desc",
                                        passportS3Id: "passS3",
                                        solvencyS3Id: "solvS3",
                                        licenseS3Id: "liceS3",
                                    },
                                    {
                                        id: '2',
                                        email: 'use2@gmail.com',
                                        handle: 'user2',
                                        fullName: 'User 2',
                                        role: 'tenant',
                                        zip: 14000,
                                        description: "desc",
                                        passportS3Id: "passS3",
                                        solvencyS3Id: "solvS3",
                                        licenseS3Id: "liceS3",
                                    },
                                    {
                                        id: '3',
                                        email: 'user3@gmail.com',
                                        handle: 'user3',
                                        fullName: 'User 3',
                                        role: 'tenant',
                                        zip: 14000,
                                        description: "desc",
                                        passportS3Id: "passS3",
                                        solvencyS3Id: "solvS3",
                                        licenseS3Id: "liceS3",
                                    },
                                    {
                                        id: '4',
                                        email: 'user4@gmail.com',
                                        handle: 'user4',
                                        fullName: 'User 4',
                                        role: 'landlord',
                                        zip: 15000,
                                        description: "desc",
                                        passportS3Id: "passS3",
                                        solvencyS3Id: "solvS3",
                                        licenseS3Id: "liceS3",
                                    },
                                    {
                                        id: '5',
                                        email: 'user5@gmail.com',
                                        handle: 'user5',
                                        fullName: 'User 5',
                                        role: 'tenantLandlord',
                                        zip: 16000,
                                        description: "desc",
                                        passportS3Id: "passS3",
                                        solvencyS3Id: "solvS3",
                                        licenseS3Id: "liceS3",
                                    },
                                ],
                            }),
                        ])];
                case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                case 2:
                    users = (_c.sent())[0];
                    return [4 /*yield*/, prisma_1.default.property.create({
                            data: {
                                id: '1',
                                size: 30,
                                ownerId: '1',
                                street: 'Turmstrasse',
                                streetNumber: 1233,
                                zip: 10210,
                                city: 'Berlin',
                                description: 'this is the first kitchen on foodle.',
                                facilities: ['Dishwasher', 'Oven', 'Elevator'],
                                rules: ['Hello its me', 'no smoking'],
                                hourlyPrice: 100,
                                serviceFee: 50,
                                deposit: 500,
                                images: ['new image'],
                                partialSpace: false,
                                pickup: false,
                                handle: '1',
                                title: 'Industrial Grade Kitchen in Mitte',
                                isVerified: true,
                                availabilities: {
                                    create: {
                                        startDate: new Date('2022-03-25').toISOString(),
                                        endDate: new Date('2022-04-08').toISOString(),
                                        minMonths: 1,
                                        frequency: 'weekly',
                                        availableDays: {
                                            createMany: {
                                                data: [
                                                    {
                                                        startTime: new Date('1999-01-01T07:00:00').toISOString(),
                                                        endTime: new Date('1999-01-01T19:00:00').toISOString(),
                                                        weekday: 'Monday',
                                                    },
                                                ],
                                            },
                                        },
                                    },
                                },
                            },
                        })];
                case 3:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.seed = seed;
exports.default = seed;
