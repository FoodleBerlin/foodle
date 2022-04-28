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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServerSideProps = void 0;
var react_1 = __importDefault(require("react"));
var context_1 = require("../../server/context");
var codegen_1 = require("../../codegen");
var Account_module_scss_1 = __importDefault(require("./Account.module.scss"));
var Navbar_1 = __importDefault(require("../../components/Layout/Navbar"));
var Sidebar_1 = __importDefault(require("../../components/Layout/Sidebar"));
function getServerSideProps(_a) {
    var req = _a.req;
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            if (!req.cookies['jwt']) {
                return [2 /*return*/, {
                        props: {},
                        redirect: {
                            permanent: false,
                            destination: '/',
                        },
                    }];
            }
            return [2 /*return*/, {
                    props: {
                        session: (0, context_1.extractUserFromToken)(null, req.cookies['jwt']),
                        jwt: req.cookies['jwt'],
                    },
                }];
        });
    });
}
exports.getServerSideProps = getServerSideProps;
var Account = function (props) {
    var _a, _b;
    console.log({ props: props });
    var _c = (0, codegen_1.useFindUserQuery)({
        endpoint: 'http://localhost:5000/graphql',
        fetchParams: {
            headers: {
                'Content-Type': 'application/json',
                jwt: props.jwt,
            },
        },
    }, 
    // TODO type props
    { handle: props.session.email }, {}), status = _c.status, data = _c.data, error = _c.error, isFetching = _c.isFetching;
    console.log({ data: data });
    console.log({ error: error });
    // TODO show default
    return (<div className={Account_module_scss_1.default['account']}>
      <Navbar_1.default user={props.session}></Navbar_1.default>
      <Sidebar_1.default></Sidebar_1.default>
      <div className={Account_module_scss_1.default['container']}>
        <h2>Payment Methods</h2>
        {(_a = data === null || data === void 0 ? void 0 : data.findUser.User) === null || _a === void 0 ? void 0 : _a.paymentMethods.map(function (method, index) {
            return (<div key={index} className={Account_module_scss_1.default['row']}>
              <span>
                {method.type}....{method.cardNumber}
              </span>
              <span>
                Expiry: {method.expiryMonth}/{method.expiryYear}
              </span>
              <span>
                <button>make default</button>
              </span>
              <span>x</span>
            </div>);
        })}
        <button>Add payment</button>
      </div>

      <h2>Past Payments</h2>
      <div className={Account_module_scss_1.default['container']}>
        {(_b = data === null || data === void 0 ? void 0 : data.findUser.User) === null || _b === void 0 ? void 0 : _b.charges.map(function (charge, index) {
            return (<div key={index} className={Account_module_scss_1.default['row']}>
              <span>{new Date(charge.date * 1000).toUTCString()}</span>
              <span>
                {charge.currency}
                {charge.amount * 0.01}
              </span>
              <span>card: {charge.card}</span>
              <span>{charge.status}</span>
              <span>
                {charge.description}: {charge.invoiceId}
              </span>
            </div>);
        })}
      </div>
    </div>);
};
exports.default = Account;
