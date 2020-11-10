"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var predicates = tslib_1.__importStar(require("@shopify/predicates"));
var validator_1 = require("./validator");
function lengthMoreThan(length, error) {
    return validator_1.validator(predicates.lengthMoreThan(length))(error);
}
exports.lengthMoreThan = lengthMoreThan;
function lengthLessThan(length, error) {
    return validator_1.validator(predicates.lengthLessThan(length))(error);
}
exports.lengthLessThan = lengthLessThan;
function notEmpty(error) {
    return validator_1.validator(predicates.notEmpty, { skipOnEmpty: false })(error);
}
exports.notEmpty = notEmpty;
function notEmptyString(error) {
    return validator_1.validator(predicates.notEmptyString, { skipOnEmpty: false })(error);
}
exports.notEmptyString = notEmptyString;
function positiveIntegerString(error) {
    return validator_1.validator(predicates.isPositiveIntegerString)(error);
}
exports.positiveIntegerString = positiveIntegerString;
function positiveNumericString(error) {
    return validator_1.validator(predicates.isPositiveNumericString)(error);
}
exports.positiveNumericString = positiveNumericString;
function numericString(error) {
    return validator_1.validator(predicates.isNumericString)(error);
}
exports.numericString = numericString;
