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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = exports.router = exports.apollo = exports.isProduction = exports.app = void 0;
var apollo_server_express_1 = require("apollo-server-express");
var schema_1 = __importDefault(require("./schema"));
var context_1 = require("./context");
var express_1 = __importDefault(require("express"));
var express_session_1 = __importDefault(require("express-session"));
var passport_1 = __importDefault(require("./passport"));
var forgeJWT_1 = __importDefault(require("../utils/forgeJWT"));
var datasources_1 = __importDefault(require("./singletons/datasources"));
var helmet_1 = __importDefault(require("helmet"));
exports.app = (0, express_1.default)();
exports.app.use(passport_1.default.initialize());
exports.isProduction = process.env.NEXT_PUBLIC_SERVER_URL !== "http://localhost:5000/";
if (exports.isProduction) {
    // Sets CSP header, enforces HTTPS, sets X-Frame-Options Header
    exports.app.use(helmet_1.default);
}
exports.app.use((0, express_session_1.default)({
    // Default name makes it easier for attackers to fingerprint server
    name: 'SecureSession',
    secret: (_a = process.env.SERVER_SECRET) !== null && _a !== void 0 ? _a : '',
    resave: false,
    saveUninitialized: false,
}));
exports.apollo = new apollo_server_express_1.ApolloServer({
    // An executable GraphQL schema.
    schema: schema_1.default,
    // @ts-ignore
    // Need to check whet
    csrfPrevention: true,
    // An object (or a function that creates an object) that's passed to every resolver that executes for a particular operation.
    // Turned off for production to prevent accidentally sharing business secrets
    introspection: exports.isProduction ? false : true,
    // This enables resolvers to share helpful context, such as a database connection.
    context: context_1.createContext,
    dataSources: function () { return (0, datasources_1.default)(); },
});
var corsOptions = {
    origin: [process.env.CLIENT_URL]
};
exports.router = express_1.default.Router();
var port = process.env.PORT || 5000;
function main() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.apollo.start()];
                case 1:
                    _a.sent();
                    exports.app.use(exports.router);
                    exports.apollo.applyMiddleware({ app: exports.app, cors: corsOptions });
                    exports.app.listen({
                        port: port,
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.main = main;
if (!process.env.TEST) {
    main();
}
exports.router.get('/api/auth', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
exports.router.get('/api/callback', function (req, res, next) {
    passport_1.default.authenticate('google', function (err, user) { return __awaiter(void 0, void 0, void 0, function () {
        var token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, forgeJWT_1.default)(user)];
                case 1:
                    token = _a.sent();
                    res.cookie('jwt', token, {
                        // Is session cookie, expires on client shutdown
                        httpOnly: true,
                        secure: exports.isProduction ? true : false,
                        sameSite: exports.isProduction ? 'strict' : 'lax', // Strict=browser will not send the cookie to our website if the request comes from a different domain, 
                        //Lax= Browser only blocks cookies with unsafe HTTP methods like POST
                    });
                    return [2 /*return*/, res.redirect(process.env.CLIENT_URL)];
            }
        });
    }); })(req, res, next);
});
