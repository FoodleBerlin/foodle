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
exports.updateUser = void 0;
var nexus_1 = require("nexus");
var validation_1 = require("../../../../server/validation");
exports.updateUser = (0, nexus_1.extendType)({
    type: 'Mutation',
    definition: function (t) {
        var _this = this;
        t.field('updateUser', {
            type: 'findUserResult',
            description: 'Edit user profile data',
            args: { id: (0, nexus_1.stringArg)(), fullName: (0, nexus_1.stringArg)(),
                zip: (0, nexus_1.nullable)((0, nexus_1.intArg)()), description: (0, nexus_1.nullable)((0, nexus_1.stringArg)()), dob: (0, nexus_1.nullable)((0, nexus_1.stringArg)()),
                passportS3Id: (0, nexus_1.nullable)((0, nexus_1.stringArg)()), solvencyS3Id: (0, nexus_1.nullable)((0, nexus_1.stringArg)()),
                licenseS3Id: (0, nexus_1.nullable)((0, nexus_1.stringArg)()) },
            resolve: function (_, args, ctx) { return __awaiter(_this, void 0, void 0, function () {
                var userData, e_1, isInvalidZipLength, isInvalidDescriptionLength, isInvalidPassportS3Id, isInvalidLicenseS3Id, isInvalidSolvencyS3Id, user;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 3, , 4]);
                            if (!(args.id !== null)) return [3 /*break*/, 2];
                            return [4 /*yield*/, ctx.prisma.user.findUnique({
                                    where: { id: args.id },
                                })];
                        case 1:
                            userData = _b.sent();
                            _b.label = 2;
                        case 2: return [3 /*break*/, 4];
                        case 3:
                            e_1 = _b.sent();
                            return [2 /*return*/, {
                                    ClientErrorUserNotFound: {
                                        message: "Couldn't find the user",
                                    },
                                }];
                        case 4:
                            isInvalidZipLength = args.zip && (0, validation_1.checkInvalidInputLength)("Zip", (_a = args.zip) === null || _a === void 0 ? void 0 : _a.toString(), 5, 5);
                            if (isInvalidZipLength)
                                return [2 /*return*/, isInvalidZipLength];
                            isInvalidDescriptionLength = args.description && (0, validation_1.checkInvalidInputLength)("Description", args.description, 500);
                            if (isInvalidDescriptionLength)
                                return [2 /*return*/, isInvalidDescriptionLength];
                            isInvalidPassportS3Id = args.passportS3Id && (0, validation_1.checkInvalidInputLength)("PassportS3Id", args.passportS3Id, 100, 5);
                            if (isInvalidPassportS3Id)
                                return [2 /*return*/, isInvalidPassportS3Id];
                            isInvalidLicenseS3Id = args.licenseS3Id && (0, validation_1.checkInvalidInputLength)("LicenseS3Id", args.licenseS3Id, 100, 5);
                            if (isInvalidLicenseS3Id)
                                return [2 /*return*/, isInvalidLicenseS3Id];
                            isInvalidSolvencyS3Id = args.solvencyS3Id && (0, validation_1.checkInvalidInputLength)("PassportS3Id", args.solvencyS3Id, 100, 5);
                            if (isInvalidSolvencyS3Id)
                                return [2 /*return*/, isInvalidSolvencyS3Id];
                            if (!userData)
                                return [2 /*return*/, {
                                        ClientErrorUserNotFound: {
                                            message: "Couldn't find the user",
                                        },
                                    }];
                            return [4 /*yield*/, ctx.prisma.user.update({
                                    where: {
                                        id: userData.id,
                                    },
                                    data: {
                                        fullName: args.fullName ? args.fullName : userData.fullName,
                                        email: userData.email,
                                        zip: args.zip ? args.zip : userData.zip,
                                        dob: args.dob ? args.dob : userData.dob,
                                        description: args.description ? args.description : userData.description,
                                        passportS3Id: args.passportS3Id ? args.passportS3Id : userData.passportS3Id,
                                        licenseS3Id: args.licenseS3Id ? args.licenseS3Id : userData.licenseS3Id,
                                        solvencyS3Id: args.solvencyS3Id ? args.solvencyS3Id : userData.solvencyS3Id,
                                    },
                                })];
                        case 5:
                            user = _b.sent();
                            if (user) {
                                return [2 /*return*/, { User: user }];
                            }
                            else {
                                return [2 /*return*/, {
                                        ClientErrorUnknown: {
                                            message: 'Something went wrong while editing your profile details. Please contact our technical support',
                                        },
                                    }];
                            }
                            return [2 /*return*/];
                    }
                });
            }); },
        });
    },
});
