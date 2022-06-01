"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWindowDimensions = void 0;
var react_1 = require("react");
var hasWindow = typeof window !== 'undefined';
function getWindowDimensions() {
    var width = hasWindow ? window.innerWidth : null;
    var height = hasWindow ? window.innerHeight : null;
    return {
        width: width,
        height: height,
    };
}
function useWindowDimensions() {
    var _a = (0, react_1.useState)(getWindowDimensions()), windowDimensions = _a[0], setWindowDimensions = _a[1];
    (0, react_1.useEffect)(function () {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
        window.addEventListener('resize', handleResize);
        return function () { return window.removeEventListener('resize', handleResize); };
    }, []);
    return windowDimensions;
}
exports.useWindowDimensions = useWindowDimensions;
