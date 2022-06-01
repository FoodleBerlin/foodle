"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.AWSWrapperAbstract = void 0;
var aws_sdk_1 = __importDefault(require("aws-sdk"));
aws_sdk_1.default.config.update({
    accessKeyId: process.env.APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.APP_AWS_SECRET_KEY,
    region: process.env.APP_AWS_REGION,
    signatureVersion: 'v4',
});
var AWSWrapperAbstract = /** @class */ (function () {
    function AWSWrapperAbstract(awsAccessKey, secretAccessKey, region) {
        this.awsAccessKey = awsAccessKey;
        this.secretAccessKey = secretAccessKey;
    }
    return AWSWrapperAbstract;
}());
exports.AWSWrapperAbstract = AWSWrapperAbstract;
// APP_AWS_REGION = 'eu-central-1'
// AWS_S3_BUCKET_NAME = 'foodle-bucket'
var AWSWrapper = /** @class */ (function (_super) {
    __extends(AWSWrapper, _super);
    function AWSWrapper() {
        var _this = _super.call(this, process.env.APP_AWS_ACCESS_KEY, process.env.APP_AWS_SECRET_KEY, process.env.APP_AWS_REGION) || this;
        _this.getSignedUrl = function (params) { return __awaiter(_this, void 0, void 0, function () {
            var res, signedUrl, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.awsS3.getSignedUrl('getObject', {
                                Bucket: process.env.AWS_S3_BUCKET_NAME,
                                Key: params.s3Id,
                            })];
                    case 1:
                        signedUrl = _a.sent();
                        res = {
                            response: {
                                failure: null,
                                success: {
                                    body: signedUrl,
                                }
                            }
                        };
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        res = {
                            response: {
                                failure: {
                                    // ...createApiError(e),
                                    message: e_1,
                                    type: "failure",
                                },
                                success: null,
                            },
                        };
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, res];
                }
            });
        }); };
        _this.uploadResource = function (params) { return __awaiter(_this, void 0, void 0, function () {
            var res, post, formData_1, file, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.awsS3.createPresignedPost({
                                Bucket: process.env.AWS_S3_BUCKET_NAME,
                                Fields: {
                                    key: params.s3Id,
                                },
                                Expires: 60,
                                Conditions: [
                                    ['content-length-range', 0, 5048576], // up to 1 MB
                                ],
                            })];
                    case 1:
                        post = _a.sent();
                        formData_1 = new FormData();
                        file = params.file;
                        Object.entries(__assign(__assign({}, post.fields), { file: file })).forEach(function (_a) {
                            var key = _a[0], value = _a[1];
                            formData_1.append(key, value);
                        });
                        return [4 /*yield*/, fetch(post.url, {
                                method: 'POST',
                                body: formData_1,
                            })];
                    case 2:
                        _a.sent();
                        res = {
                            response: {
                                failure: null,
                                success: {
                                    body: "Successfully Uploaded",
                                }
                            }
                        };
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        res = {
                            response: {
                                failure: {
                                    // ...createApiError(e),
                                    message: e_2,
                                    type: "failure",
                                },
                                success: null,
                            },
                        };
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, res];
                }
            });
        }); };
        _this.deleteResource = function (params) { return __awaiter(_this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                try {
                    this.awsS3.deleteObject({
                        Bucket: 'foodle-bucket',
                        Key: params.s3Id,
                    });
                    res = {
                        response: {
                            failure: null,
                            success: {
                                body: "Successfully Deleted",
                            }
                        }
                    };
                }
                catch (e) {
                    res = {
                        response: {
                            failure: {
                                // ...createApiError(e),
                                message: e,
                                type: "failure",
                            },
                            success: null,
                        },
                    };
                }
                return [2 /*return*/, res];
            });
        }); };
        var awsS3 = new aws_sdk_1.default.S3({
            accessKeyId: process.env.APP_AWS_ACCESS_KEY,
            secretAccessKey: process.env.APP_AWS_SECRET_KEY,
            region: process.env.APP_AWS_REGION,
        });
        _this.awsS3 = awsS3;
        return _this;
    }
    return AWSWrapper;
}(AWSWrapperAbstract));
// deleteResource= async (params: {s3Id: string }) => {
//     let res: EndpointRes<string>;
//     try {
//       s3.deleteObject({
//         Bucket: 'foodle-bucket',
//         Key: params.s3Id,
//       }, (err, data) => {
//       if (data) {
//         return res = {
//           response: {
//             failure:null,
//             success: {
//               body: "Successfully Uploaded",
//             }
//           }
//         }
//       }
//       else {
//         return res = {
//           response: {
//             failure: {
//               // ...createApiError(e),
//               message: err.message,
//               type: err.code,
//             },
//             success: null,
//           },
//         };
//       }
//     })
//    } catch (e){
//       return res = {
//         response: {
//           failure: {
//             // ...createApiError(e),
//             message: e as string,
//             type: "failure" as "unknown",
//           },
//           success: null,
//         },
//       };
//     }
//   };
