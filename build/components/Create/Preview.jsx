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
var react_1 = require("react");
var image_1 = __importDefault(require("next/image"));
var bs_1 = require("react-icons/bs");
var react_2 = __importDefault(require("react"));
var Preview = function (props) {
    var _a = (0, react_1.useState)(-1), dragId = _a[0], setDragId = _a[1];
    var handleOver = function (event) {
        event.preventDefault();
    };
    var handleDrag = function (event) {
        var intId = parseInt(event.currentTarget.id);
        setDragId(intId);
    };
    var handleDrop = function (event) {
        event.preventDefault();
        var dragImage = props.images.find(function (image) { return image.id === dragId; });
        var dropImage = props.images.find(function (image) { return image.id == parseInt(event.currentTarget.id); });
        var arr;
        if (!dragImage || !dropImage) {
            return;
        }
        else {
            arr = moveItem(findIndex(dragImage), findIndex(dropImage));
        }
    };
    var findIndex = function (item) {
        return props.images.indexOf(item);
    };
    var moveItem = function (from, to) {
        props.setImages(function (prev) {
            var _a;
            var temp = __spreadArray([], prev, true);
            _a = [temp[to], temp[from]], temp[from] = _a[0], temp[to] = _a[1];
            return __spreadArray([], temp, true);
        });
    };
    var _b = (0, react_1.useState)(false), isHovering0 = _b[0], setIsHovered0 = _b[1];
    var _c = (0, react_1.useState)(false), isHovering1 = _c[0], setIsHovered1 = _c[1];
    var _d = (0, react_1.useState)(false), isHovering2 = _d[0], setIsHovered2 = _d[1];
    var _e = (0, react_1.useState)(false), isHovering3 = _e[0], setIsHovered3 = _e[1];
    var _f = (0, react_1.useState)(false), isHovering4 = _f[0], setIsHovered4 = _f[1];
    var updateIdHover = function (id, update) {
        switch (id - 1) {
            case 0:
                return setIsHovered0(update);
            case 1:
                return setIsHovered1(update);
            case 2:
                return setIsHovered2(update);
            case 3:
                return setIsHovered3(update);
            case 4:
                return setIsHovered4(update);
        }
    };
    var isIdHovered = function (id) {
        switch (id - 1) {
            case 0:
                return isHovering0;
            case 1:
                return isHovering1;
            case 2:
                return isHovering2;
            case 3:
                return isHovering3;
            case 4:
                return isHovering4;
        }
    };
    var onMouseEnter = function (event) {
        updateIdHover(Number(event.currentTarget.id), true);
    };
    var onMouseLeave = function (event) {
        updateIdHover(Number(event.currentTarget.id), false);
    };
    var previewImage = function (image, ref, index) {
        var id = image.id ? image.id : -1;
        return (<div ref={ref} className={'gallery__item gallery__item--' + index} id={id.toString()} draggable key={id} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onDragOver={function (e) { return handleOver(e); }} onDragStart={function (e) { return handleDrag(e); }} onDrop={function (e) { return handleDrop(e); }}>
        <image_1.default src={image.file} width={460} height={516} className="gallery__img" alt={'Image ' + index}/>
        <bs_1.BsXLg style={isIdHovered(id)
                ? {
                    fill: 'black',
                    position: 'absolute',
                    strokeWidth: '1.6',
                    stroke: 'black',
                    margin: '2rem 3rem 0rem -4rem',
                    height: '1.65rem',
                    width: '1.65rem',
                    cursor: 'pointer',
                }
                : { display: 'none' }} onClick={function () { return props.deleteImage(id ? id : -1); }}/>
      </div>);
    };
    return (<react_1.Fragment>
      <div className="gallery__container">
        <div className="gallery">
          {props.images.length > 0 &&
            props.images.map(function (image, index) {
                return previewImage(image, react_2.default.createRef(), index);
            })}
        </div>
      </div>
    </react_1.Fragment>);
};
exports.default = Preview;
