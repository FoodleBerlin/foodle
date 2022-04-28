"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Account_module_scss_1 = __importDefault(require("../../pages/account/Account.module.scss"));
var uuid_1 = require("uuid");
var react_1 = require("react");
var convertFiletoUploaderImg = function (file) {
    if (file === null)
        return null;
    else {
        return { name: file.name, size: file.size, file: file, s3Id: (0, uuid_1.v4)() };
    }
};
var ProfileButton = function (props) {
    var _a, _b;
    var ref = (0, react_1.useRef)(null);
    var getSignedUrl = function (imageS3Id) {
        //TODO Create backend Endpoint for creating signed URLs from S3ID
        console.log('Downloaded Link from S3');
        return imageS3Id;
    };
    return !props.alreadyUploaded ? (<aside className={Account_module_scss_1.default['account__document-btns'] + ' mt-two'}>
      <label htmlFor="upload" className={'primary-btn bold'}>
        Upload
      </label>
      <input id="upload" type="file" 
    // value={props.image?.file}s
    onChange={function (e) {
            var _a;
            var file = (e === null || e === void 0 ? void 0 : e.currentTarget.files) ? (_a = e === null || e === void 0 ? void 0 : e.currentTarget) === null || _a === void 0 ? void 0 : _a.files[0] : null;
            var image = convertFiletoUploaderImg(file);
            if (image !== null)
                props.imageSetter(image);
        }}/>
    </aside>) : (<aside className={Account_module_scss_1.default['account__document-btns'] + ' mt-one'}>
      <a href={getSignedUrl(((_a = props === null || props === void 0 ? void 0 : props.image) === null || _a === void 0 ? void 0 : _a.s3Id) ? (_b = props.image) === null || _b === void 0 ? void 0 : _b.s3Id : '')} download>
        <button onClick={function (e) {
            e.preventDefault();
        }} className={'tertiary-btn bold'}>
          View
        </button>
      </a>
      <button onClick={function () {
            props.imageSetter(null);
        }} className={'delete-btn bold'}>
        Delete
      </button>
    </aside>);
};
exports.default = ProfileButton;
