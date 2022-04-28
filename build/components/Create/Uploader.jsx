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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadResource = exports.getResourceUrl = exports.deleteResource = exports.s3 = void 0;
var react_1 = __importDefault(require("react"));
var Create_module_scss_1 = __importDefault(require("./Create.module.scss"));
var react_dropzone_1 = require("react-dropzone");
var Wizard_1 = require("./wizard/Wizard");
var uuid_1 = require("uuid");
var aws_sdk_1 = __importDefault(require("aws-sdk"));
exports.s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.APP_AWS_SECRET_KEY,
    region: process.env.APP_AWS_REGION,
});
var deleteResource = function (filename) { return __awaiter(void 0, void 0, void 0, function () {
    var res, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("/api/deleteImage?file=".concat(filename))];
            case 1:
                res = _a.sent();
                return [4 /*yield*/, res.json()];
            case 2:
                data = _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.deleteResource = deleteResource;
var getResourceUrl = function (file) { return __awaiter(void 0, void 0, void 0, function () {
    var signedUrlRes, signedUrlData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("/api/getImage?file=".concat(file ? file.name : ''))];
            case 1:
                signedUrlRes = _a.sent();
                return [4 /*yield*/, signedUrlRes.json()];
            case 2:
                signedUrlData = _a.sent();
                return [2 /*return*/, signedUrlData.imageUrl];
        }
    });
}); };
exports.getResourceUrl = getResourceUrl;
var uploadResource = function (file, filename) { return __awaiter(void 0, void 0, void 0, function () {
    var res, data, formData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("/api/uploadImage?file=".concat(filename))];
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
var Uploader = function (props) {
    var _a = (0, react_dropzone_1.useDropzone)({
        accept: 'image/*',
        maxFiles: 5,
        onDrop: function (acceptedFiles) { return __awaiter(void 0, void 0, void 0, function () {
            var uuidFileArray_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(props.images.length + acceptedFiles.length < 6)) return [3 /*break*/, 2];
                        uuidFileArray_1 = [];
                        acceptedFiles.forEach(function (file) {
                            Object.defineProperty(file, 'name', {
                                writable: true,
                                value: (0, uuid_1.v4)(),
                            });
                            uuidFileArray_1.push(file);
                        });
                        return [4 /*yield*/, updateImageArray(uuidFileArray_1)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); },
    }), getRootProps = _a.getRootProps, getInputProps = _a.getInputProps;
    var updateImageArray = function (files) { return __awaiter(void 0, void 0, void 0, function () {
        var imageArray, idNumber, count;
        return __generator(this, function (_a) {
            imageArray = [];
            idNumber = props.idCount;
            count = 0;
            files.forEach(function (file) { return __awaiter(void 0, void 0, void 0, function () {
                var newImage;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, (0, exports.uploadResource)(file, encodeURIComponent(file.name))];
                        case 1:
                            _b.sent();
                            _a = {
                                fileName: file.name
                            };
                            return [4 /*yield*/, (0, exports.getResourceUrl)(file)];
                        case 2:
                            newImage = (_a.url = _b.sent(),
                                _a.id = idNumber,
                                _a);
                            imageArray.push(newImage);
                            count++;
                            idNumber++;
                            if (count === files.length) {
                                props.setImages(__spreadArray(__spreadArray([], props.images, true), imageArray, true));
                                props.setIdCount(idNumber);
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    }); };
    var register = (0, Wizard_1.useWizardContext)().register;
    return (<div className={Create_module_scss_1.default['drag-drop__uploader']} {...getRootProps()}>
      <input type="file" id="file" accept="image/png, image/jpeg" multiple={true} {...register('images')} {...getInputProps()}/>
      <p className="body-text">Drag to Upload</p>
      <p className="body-text grey-text">{props.idCount - 1 + '/5 photos uploaded'}</p>
      <p className="body-text bold underlined">Upload from device</p>
    </div>);
};
exports.default = Uploader;
