"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryClient = void 0;
require("../styles/app.scss");
var react_1 = __importDefault(require("react"));
var react_query_1 = require("react-query");
exports.queryClient = new react_query_1.QueryClient();
function MyApp(_a) {
    var Component = _a.Component, pageProps = _a.pageProps;
    return (<react_query_1.QueryClientProvider client={exports.queryClient}>
      <Component {...pageProps}/>
    </react_query_1.QueryClientProvider>);
}
exports.default = MyApp;
