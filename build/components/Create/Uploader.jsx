"use strict";
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
var react_1 = __importDefault(require("react"));
var Create_module_scss_1 = __importDefault(require("./Create.module.scss"));
var react_dropzone_1 = require("react-dropzone");
var Wizard_1 = require("./wizard/Wizard");
var uuid_1 = require("uuid");
var Uploader = function (props) {
    var _a = (0, react_dropzone_1.useDropzone)({
        accept: 'image/*',
        maxFiles: 5,
        onDrop: function (acceptedFiles) {
            if (props.images.length + acceptedFiles.length < 6) {
                var idNumber_1 = props.idCount;
                acceptedFiles.map(function (file) {
                    Object.assign(file, {
                        file: URL.createObjectURL(file),
                        id: idNumber_1,
                        s3Id: (0, uuid_1.v4)(),
                    });
                    idNumber_1++;
                });
                var imageArray = __spreadArray(__spreadArray([], props.images, true), acceptedFiles, true);
                props.setImages(imageArray);
                props.setIdCount(idNumber_1);
            }
        },
    }), getRootProps = _a.getRootProps, getInputProps = _a.getInputProps;
    var register = (0, Wizard_1.useWizardContext)().register;
    var user = {
        id: 'ID20',
    };
    return (<div className={Create_module_scss_1.default['drag-drop__uploader']} {...getRootProps()}>
      <input type="file" id="file" accept="image/png, image/jpeg" multiple={true} {...register('images')} {...getInputProps()}/>
      <p className="body-text">Drag to Upload</p>
      <p className="body-text grey-text">{props.idCount - 1 + '/5 photos uploaded'}</p>
      <p className="body-text bold underlined">Upload from device</p>
    </div>);
};
exports.default = Uploader;
