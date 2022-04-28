"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notEmpty = exports.checkInvalidInputLength = exports.checkUserExists = void 0;
var prisma_1 = __importDefault(require("../singletons/prisma"));
function findUser(userId) {
    return prisma_1.default.user.findUnique({
        where: {
            id: userId,
        },
    });
}
var checkUserExists = function (userId) {
    if (!findUser(userId)) {
        return {
            ClientErrorUserNotExists: {
                message: "owner for ownerId ".concat(userId, " does not exist"),
            },
        };
    }
};
exports.checkUserExists = checkUserExists;
var checkInvalidInputLength = function (inputName, arg, maxLength, minLength) {
    if (arg.length > maxLength || arg.length < (minLength !== null && minLength !== void 0 ? minLength : 0)) {
        var minMaxLabel = arg.length > maxLength ? "max" : "min";
        var minMaxNumberLabel = arg.length > maxLength ? maxLength : minLength;
        return {
            ClientErrorInvalidInputLength: {
                message: "".concat(inputName, " ").concat(arg, " is invalid, must have a ").concat(minMaxLabel, " length of ").concat(minMaxNumberLabel),
            },
        };
    }
};
exports.checkInvalidInputLength = checkInvalidInputLength;
function notEmpty(value) {
    return value !== null && value !== undefined;
}
exports.notEmpty = notEmpty;
