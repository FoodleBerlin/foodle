"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = require("winston");
var logLevels = {
    error: 0,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
};
var logger = (0, winston_1.createLogger)({
    levels: logLevels,
    transports: [new winston_1.transports.Console()],
});
