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
describe('Update User', function () {
    var mutation = "mutation UpdateUser($id: String, $fullName: String, $zip: Int, $description: String, $dob: String, $passportS3Id: String, $solvencyS3Id: String, $licenseS3Id: String) {\n  updateUser(id: $id, fullName: $fullName, zip: $zip, description: $description, dob: $dob, passportS3Id: $passportS3Id, solvencyS3Id: $solvencyS3Id, licenseS3Id: $licenseS3Id) {\n    User {\n      fullName\n      email\n      handle\n      zip\n      id\n      dob\n      description\n      passportS3Id\n      solvencyS3Id\n      licenseS3Id\n    }\n    ClientErrorUserNotExists {\n      message\n    }\n    ClientErrorInvalidHandle {\n      message\n    }\n    ClientErrorInvalidInputLength {\n      message\n    }\n  }\n}\n";
    describe('with valid data', function () {
        it('returns user if succeeded', function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); }); });
    });
    /* describe('with valid data', () => {
      it('returns user if succeeded', async () => {
        const res = await server.executeOperation({
          query: mutation,
          variables: {
            id: '1',
            fullName: 'jello',
            zip: 90000,
            description: 'description',
            dob: '1900-01-01T00:00:00Z',
            passportS3Id: 'passport?.s3Id',
            solvencyS3Id: 'solvency?.s3Id',
            licenseS3Id: 'license?.s3Id',
          }, //TODO get this from globals
        });
        expect(res).toMatchSnapshot();
      });
    });
    describe('with invalid data-', () => {
      it('id does not return user', async () => {
        const res = await server.executeOperation({
          query: mutation,
          variables: {
            id: '-1',
            fullName: 'jello',
            zip: 9000,
            description: 'description',
            dob: '1900-01-01T00:00:00Z',
            passportS3Id: 'passport?.s3Id',
            solvencyS3Id: 'solvency?.s3Id',
            licenseS3Id: 'license?.s3Id',
          }, //TODO get this from globals
        });
        expect(res).toMatchSnapshot();
      });
    }); */
});
