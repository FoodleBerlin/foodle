"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var index_1 = require("../server/index");
var clean_1 = require("../utils/clean");
var seed_1 = require("../utils/seed");
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
var descriptionToLong = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nsdfsfsfsdfsdf';
var query = "\nmutation CreateListing($size: Int!, $title: String!, $ownerHandle: String!, $street: String!, $streetNumber: Int!, $zip: Int!, $city: String!, $description: String!, $hourlyPrice: Int!, $serviceFee: Int!, $rules: [String!]!, $deposit: Int!, $images: [String!]!, $partialSpace: Boolean!, $startDate: DateTime!, $endDate: DateTime!, $frequency: FrequencyEnum!, $availableDays: [AvailableDay!]!) {\n  createListing(size: $size, title: $title, ownerHandle: $ownerHandle, street: $street, streetNumber: $streetNumber, zip: $zip, city: $city, description: $description, hourlyPrice: $hourlyPrice, serviceFee: $serviceFee, rules: $rules, deposit: $deposit, images: $images, partialSpace: $partialSpace, startDate: $startDate, endDate: $endDate, frequency: $frequency, availableDays: $availableDays) {\n     Property {\n      title\n      size\n      owner {\n        id\n        fullName\n        email\n      }\n      bookings {\n        id\n      }\n      street\n      streetNumber\n      zip\n      city\n      description\n      pickup\n      deposit\n      images\n      partialSpace\n      isVerified\n      hourlyPrice\n      serviceFee\n      rules\n    }\n    ClientErrorUserNotExists {\n      message\n    }\n    ClientErrorInvalidInput {\n      message\n    }\n    NoAvailableSlots {\n      message\n    }\n    UnknownError {\n      message\n    }\n  }\n}\n    ";
/*
 AvailableDays are not tested, as they are retrieved from the db in a different order each time therefore
 snaps are never equal. DaySlot logic is tested separately in unit tests
 
 Todo: test if daySlots get saved to db correctly => user different owners
*/
var stdVars = {
    ownerHandle: 'user4',
    size: 0,
    ownerId: '1',
    street: 'FoodleStreet',
    streetNumber: 0,
    zip: 0,
    city: 'Germany',
    title: 'titlee',
    description: '',
    rules: [],
    startDate: '2022-03-14T16:02:51.063Z',
    endDate: '2022-05-14T16:02:51.063Z',
    frequency: 'WEEKLY',
    hourlyPrice: 0,
    deposit: 0,
    images: [''],
    serviceFee: 0,
    partialSpace: false,
    availableDays: [
        {
            startTime: '2022-01-07T09:00:00.000Z',
            endTime: '2022-01-07T12:00:00.000Z',
        },
    ],
};
describe(' Property', function () {
    it('can create a listing, frequency weekly', function () { return __awaiter(void 0, void 0, void 0, function () {
        var vars, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    vars = __assign({}, stdVars);
                    vars.city = 'Germany2';
                    return [4 /*yield*/, index_1.apollo.executeOperation({
                            query: query,
                            variables: __assign({}, vars),
                        })];
                case 1:
                    res = _a.sent();
                    expect(res).toMatchSnapshot();
                    return [2 /*return*/];
            }
        });
    }); });
    it('can create a listing, frequency monthly', function () { return __awaiter(void 0, void 0, void 0, function () {
        var vars, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    vars = __assign({}, stdVars);
                    vars.frequency = 'MONTHLY';
                    return [4 /*yield*/, index_1.apollo.executeOperation({
                            query: query,
                            variables: __assign({}, vars),
                        })];
                case 1:
                    res = _a.sent();
                    expect(res).toMatchSnapshot();
                    return [2 /*return*/];
            }
        });
    }); });
    it('can create a listing, frequency none', function () { return __awaiter(void 0, void 0, void 0, function () {
        var vars, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    vars = __assign({}, stdVars);
                    vars.frequency = 'NONE';
                    return [4 /*yield*/, index_1.apollo.executeOperation({
                            query: query,
                            variables: __assign({}, vars),
                        })];
                case 1:
                    res = _a.sent();
                    expect(res).toMatchSnapshot();
                    return [2 /*return*/];
            }
        });
    }); });
    describe(' Property', function () {
        it('can create a listing, frequency weekly and multiple days per week', function () { return __awaiter(void 0, void 0, void 0, function () {
            var vars, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vars = __assign({}, stdVars);
                        vars.availableDays = [
                            {
                                startTime: '2022-01-01T10:00:00.000Z',
                                endTime: '2022-01-01T13:00:00.000Z',
                            },
                            {
                                startTime: '2022-01-01T08:00:00.000Z',
                                endTime: '2022-01-01T14:00:00.000Z',
                            },
                        ];
                        return [4 /*yield*/, index_1.apollo.executeOperation({
                                query: query,
                                variables: __assign({}, vars),
                            })];
                    case 1:
                        res = _a.sent();
                        expect(res).toMatchSnapshot();
                        return [2 /*return*/];
                }
            });
        }); });
        it('it fails when a listing city string arg out of max range', function () { return __awaiter(void 0, void 0, void 0, function () {
            var vars, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vars = __assign({}, stdVars);
                        vars.city =
                            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean mm';
                        return [4 /*yield*/, index_1.apollo.executeOperation({
                                query: query,
                                variables: __assign({}, vars),
                            })];
                    case 1:
                        res = _a.sent();
                        expect(res).toMatchSnapshot();
                        return [2 /*return*/];
                }
            });
        }); });
        it('it fails when a listing zip code arg out of max range', function () { return __awaiter(void 0, void 0, void 0, function () {
            var vars, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vars = __assign({}, stdVars);
                        vars.zip = 123456;
                        return [4 /*yield*/, index_1.apollo.executeOperation({
                                query: query,
                                variables: __assign({}, vars),
                            })];
                    case 1:
                        res = _a.sent();
                        expect(res).toMatchSnapshot();
                        return [2 /*return*/];
                }
            });
        }); });
        it('it fails when a listing street arg out of max range', function () { return __awaiter(void 0, void 0, void 0, function () {
            var vars, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vars = __assign({}, stdVars);
                        vars.street =
                            'Lorem ipsum dolor sit amet, consectetsuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean mm';
                        return [4 /*yield*/, index_1.apollo.executeOperation({
                                query: query,
                                variables: __assign({}, vars),
                            })];
                    case 1:
                        res = _a.sent();
                        expect(res).toMatchSnapshot();
                        return [2 /*return*/];
                }
            });
        }); });
        it('it fails when a listing descriptiosn arg out of max range', function () { return __awaiter(void 0, void 0, void 0, function () {
            var vars, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vars = __assign({}, stdVars);
                        vars.description = descriptionToLong;
                        return [4 /*yield*/, index_1.apollo.executeOperation({
                                query: query,
                                variables: __assign({}, vars),
                            })];
                    case 1:
                        res = _a.sent();
                        expect(res).toMatchSnapshot();
                        return [2 /*return*/];
                }
            });
        }); });
        it('it fails when startDate is after endDate', function () { return __awaiter(void 0, void 0, void 0, function () {
            var vars, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vars = __assign({}, stdVars);
                        vars.startDate = '2022-05-15T16:02:51.063Z';
                        return [4 /*yield*/, index_1.apollo.executeOperation({
                                query: query,
                                variables: __assign({}, vars),
                            })];
                    case 1:
                        res = _a.sent();
                        expect(res).toMatchSnapshot();
                        return [2 /*return*/];
                }
            });
        }); });
        it('it fails when availableDays is empty', function () { return __awaiter(void 0, void 0, void 0, function () {
            var vars, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vars = __assign({}, stdVars);
                        vars.availableDays = [];
                        return [4 /*yield*/, index_1.apollo.executeOperation({
                                query: query,
                                variables: __assign({}, vars),
                            })];
                    case 1:
                        res = _a.sent();
                        expect(res).toMatchSnapshot();
                        return [2 /*return*/];
                }
            });
        }); });
        it('it fails when wrong DateTime format', function () { return __awaiter(void 0, void 0, void 0, function () {
            var vars, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vars = __assign({}, stdVars);
                        vars.startDate = '2022-05-15T16:051.0';
                        return [4 /*yield*/, index_1.apollo.executeOperation({
                                query: query,
                                variables: __assign({}, vars),
                            })];
                    case 1:
                        res = _a.sent();
                        expect(res).toMatchSnapshot();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
