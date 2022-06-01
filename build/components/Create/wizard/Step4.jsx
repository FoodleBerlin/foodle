"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Wizard_1 = require("./Wizard");
var react_1 = __importStar(require("react"));
var Uploader_1 = __importDefault(require("../Uploader"));
var Preview_1 = __importDefault(require("../Preview"));
var Create_module_scss_1 = __importDefault(require("../../Create/Create.module.scss"));
var deleteImage_1 = require("../../../pages/api/deleteImage");
function Step4() {
    var wizardContext = (0, Wizard_1.useWizardContext)();
    var _a = (0, react_1.useState)(1), idCount = _a[0], setIdCount = _a[1];
    var _b = (0, react_1.useState)(wizardContext.getValues().images), images = _b[0], setImages = _b[1];
    (0, react_1.useEffect)(function () {
        wizardContext.setValue('images', images, Wizard_1.touchDirtyValidate);
    }, [images]);
    var deleteImage = function (id) {
        var idAmount = 1;
        if (images.length > 0) {
            // Image to Delete
            var image = images.find(function (image) { return image.id === id; });
            // Delete its Drag and Drop ID
            var filterImages = images.filter(function (image) { return image.id != id; });
            //Reset Ids
            (0, deleteImage_1.deleteResource)(image.fileName);
            filterImages.forEach(function (image) {
                image.id = idAmount;
                idAmount++;
            });
            setImages(filterImages);
        }
        setIdCount(idCount - 1);
    };
    return (<div className={Create_module_scss_1.default['main']}>
      <h1 className="header-secondary mb-two">Photo time</h1>
      <h2 className="body-text subtle-text mb-two">
        Upload at least 5 photos of the kitchen.Features should be visible. If your kitchen is not verified, these
        photos will be the major selling point.
      </h2>
      {
        //TODO:Use another utility class instead of flex row or modify flex row
        }
      <div className={Create_module_scss_1.default['drag-drop']}>
        <Uploader_1.default idCount={idCount} setImages={function (images) { return setImages(images); }} imageAmount={images ? images.length : 0} setIdCount={function (id) { return setIdCount(id); }} images={images ? images : []}/>
        {images && images.length > 0 ? (<Preview_1.default setImages={function (images) { return setImages(images); }} deleteImage={function (id) { return deleteImage(id); }} images={images}/>) : null}
      </div>
    </div>);
}
exports.default = Step4;
