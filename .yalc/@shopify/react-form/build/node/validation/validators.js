"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lengthMoreThan = lengthMoreThan;
exports.lengthLessThan = lengthLessThan;
exports.notEmpty = notEmpty;
exports.notEmptyString = notEmptyString;
exports.positiveIntegerString = positiveIntegerString;
exports.positiveNumericString = positiveNumericString;
exports.numericString = numericString;

var predicates = _interopRequireWildcard(require("@shopify/predicates"));

var _validator = require("./validator.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function lengthMoreThan(length, error) {
  return (0, _validator.validator)(predicates.lengthMoreThan(length))(error);
}

function lengthLessThan(length, error) {
  return (0, _validator.validator)(predicates.lengthLessThan(length))(error);
}

function notEmpty(error) {
  return (0, _validator.validator)(predicates.notEmpty, {
    skipOnEmpty: false
  })(error);
}

function notEmptyString(error) {
  return (0, _validator.validator)(predicates.notEmptyString, {
    skipOnEmpty: false
  })(error);
}

function positiveIntegerString(error) {
  return (0, _validator.validator)(predicates.isPositiveIntegerString)(error);
}

function positiveNumericString(error) {
  return (0, _validator.validator)(predicates.isPositiveNumericString)(error);
}

function numericString(error) {
  return (0, _validator.validator)(predicates.isNumericString)(error);
}