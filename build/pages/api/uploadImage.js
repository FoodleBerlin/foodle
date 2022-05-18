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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadResource = exports.s3 = void 0;
var aws_sdk_1 = __importDefault(require("aws-sdk"));
exports.s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.APP_AWS_SECRET_KEY,
    region: process.env.APP_AWS_REGION,
});
var uploadResource = function (file, filename) { return __awaiter(void 0, void 0, void 0, function () {
    var res, data, formData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("/api/uploadImage?file=" + filename)];
            case 1:
                res = _a.sent();
                return [4 /*yield*/, res.json()];
            case 2:
                data = _a.sent();
                formData = new FormData();
                Object.entries(__assign(__assign({}, data.fields), { file: file })).forEach(function (_a) {
                    var key = _a[0], value = _a[1];
                    formData.append(key, value);
                });
                return [4 /*yield*/, fetch(data.url, {
                        method: 'POST',
                        body: formData,
                    })];
            case 3:
                _a.sent();
                return [4 /*yield*/, data];
            case 4: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.uploadResource = uploadResource;
function handler(req, res, props) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            exports.s3.listObjectsV2({ Bucket: 'foodle-bucket' }, function (err, data) { return __awaiter(_this, void 0, void 0, function () {
                var post;
                return __generator(this, function (_a) {
                    if (data.Contents.length < 100) {
                        try {
                            console.log("gettin 'ere");
                            post = exports.s3.createPresignedPost({
                                Bucket: process.env.AWS_S3_BUCKET_NAME,
                                Fields: {
                                    key: req.query.file,
                                },
                                Expires: 60,
                                Conditions: [
                                    ['content-length-range', 0, 5048576], // up to 1 MB
                                ],
                            });
                            return [2 /*return*/, res.status(200).json(post)];
                        }
                        catch (error) {
                            console.log(error);
                        }
                    }
                    else {
                        return [2 /*return*/, res.status(400).json({ message: "Too many objects in bucket" })];
                    }
                    return [2 /*return*/];
                });
            }); });
            return [2 /*return*/];
        });
    });
}
exports.default = handler;