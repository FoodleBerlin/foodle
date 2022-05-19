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
var moment_1 = __importDefault(require("moment"));
var clean_1 = require("../utils/clean");
var seed_1 = require("../utils/seed");
var validatorService_1 = require("./../server/singletons/validatorService");
beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, clean_1.clean)()];
            case 1:
                _a.sent();
                return [4 /*yield*/, (0, seed_1.seed)()];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
describe('test checkForEmtpyList', function () {
    it('fail checkForEmptyList', function () {
        var testList = ['test'];
        var actual = validatorService_1.ValidatorService.checkForEmptyList(testList);
        expect(actual).toBe(false);
    });
    it('success checkForEmtpyList', function () {
        var testList = [];
        var actual = validatorService_1.ValidatorService.checkForEmptyList(testList);
        expect(actual).toBe(true);
    });
});
describe('test validateStartEndDate', function () {
    it('fail startDate after endDate', function () {
        var startDate = (0, moment_1.default)('2022-08-27T18:00:00.000+0200');
        var endDate = (0, moment_1.default)('2022-08-26T18:00:00.000+0200');
        var actual = validatorService_1.ValidatorService.validateStartEndDate(startDate, endDate);
        expect(actual).toBe(false);
    });
    it('success startDate = endDate', function () {
        var startDate = (0, moment_1.default)('2022-08-27T18:00:00.000+0200');
        var endDate = (0, moment_1.default)('2022-08-27T18:00:00.000+0200');
        var actual = validatorService_1.ValidatorService.validateStartEndDate(startDate, endDate);
        expect(actual).toBe(true);
    });
    it('success startDate after endDate', function () {
        var startDate = (0, moment_1.default)('2022-08-27T18:00:00.000+0200');
        var endDate = (0, moment_1.default)('2022-08-28T18:00:00.000+0200');
        var actual = validatorService_1.ValidatorService.validateStartEndDate(startDate, endDate);
        expect(actual).toBe(true);
    });
});
describe('test propertyExists', function () {
    it('fail with non existing handle', function () { return __awaiter(void 0, void 0, void 0, function () {
        var prop;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, validatorService_1.ValidatorService.propertyExists('non-existing-handle')];
                case 1:
                    prop = _a.sent();
                    expect(prop).toBeNull;
                    return [2 /*return*/];
            }
        });
    }); });
    it('success with handle prop1', function () { return __awaiter(void 0, void 0, void 0, function () {
        var prop;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, validatorService_1.ValidatorService.propertyExists('prop1')];
                case 1:
                    prop = _a.sent();
                    expect(prop).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('test userExists', function () {
    it('fail with non existing id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, validatorService_1.ValidatorService.userExists('non-existing-id')];
                case 1:
                    user = _a.sent();
                    expect(user).toBeNull;
                    return [2 /*return*/];
            }
        });
    }); });
    it('success with id 1', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, validatorService_1.ValidatorService.userExists('1')];
                case 1:
                    user = _a.sent();
                    expect(user).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('test isOverMaxLength', function () {
    it('fail, 31 characters', function () {
        expect(validatorService_1.ValidatorService.isOverMaxLength('fooooooooooooooooooooooooooodle', 30));
    });
    it('success, 30 characters', function () {
        expect(validatorService_1.ValidatorService.isOverMaxLength('foooooooooooooooooooooooooodle', 30));
    });
});
describe('test validateDaySlot', function () {
    it('fails, time of startTime after time of endTime', function () {
        var day = {
            startTime: '2022-08-27T19:00:00.000+0200',
            endTime: '2022-08-27T18:00:00.000+0200',
        };
        expect(validatorService_1.ValidatorService.validateDaySlot(day)).toBe(false);
    });
    it('fails, date of startTime after date of endTime', function () {
        var day = {
            startTime: '2022-08-27T10:00:00.000+0200',
            endTime: '2022-08-28T18:00:00.000+0200',
        };
        expect(validatorService_1.ValidatorService.validateDaySlot(day)).toBe(false);
    });
    it('fails startTime = endTime', function () {
        var day = {
            startTime: '2022-08-27T10:00:00.000+0200',
            endTime: '2022-08-27T10:00:00.000+0200',
        };
        expect(validatorService_1.ValidatorService.validateDaySlot(day)).toBe(false);
    });
    it('success', function () {
        var day = {
            startTime: '2022-08-27T10:00:00.000+0200',
            endTime: '2022-08-27T18:00:00.000+0200',
        };
        expect(validatorService_1.ValidatorService.validateDaySlot(day)).toBe(true);
    });
});
