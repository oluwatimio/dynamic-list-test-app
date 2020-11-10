"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
function lengthMoreThan(length) {
    return function (input) { return input.length > length; };
}
exports.lengthMoreThan = lengthMoreThan;
function lengthLessThan(length) {
    return function (input) { return input.length < length; };
}
exports.lengthLessThan = lengthLessThan;
function isPositiveIntegerString(input) {
    return input !== '' && (input.match(/[^0-9]/g) || []).length === 0;
}
exports.isPositiveIntegerString = isPositiveIntegerString;
function isPositiveNumericString(input) {
    return input !== '' && (input.match(/[^0-9.,]/g) || []).length === 0;
}
exports.isPositiveNumericString = isPositiveNumericString;
function isNumericString(input) {
    return input !== '' && (input.match(/[^0-9.,-]/g) || []).length === 0;
}
exports.isNumericString = isNumericString;
function isEmpty(input) {
    return input === null || input === undefined || input.length === 0;
}
exports.isEmpty = isEmpty;
function isEmptyString(input) {
    return input === null || input === undefined || input.trim().length < 1;
}
exports.isEmptyString = isEmptyString;
function notEmpty(input) {
    return not(isEmpty)(input);
}
exports.notEmpty = notEmpty;
function notEmptyString(input) {
    return not(isEmptyString)(input);
}
exports.notEmptyString = notEmptyString;
function notNumericString(input) {
    return not(isNumericString)(input);
}
exports.notNumericString = notNumericString;
function not(fn) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return !fn.apply(void 0, tslib_1.__spread(args));
    };
}
