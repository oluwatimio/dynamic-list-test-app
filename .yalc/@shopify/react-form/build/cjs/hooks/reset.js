"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useReset = useReset;

var _visitFields = _interopRequireDefault(require("./visitFields.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function useReset(fieldBag) {
  return (0, _visitFields["default"])(fieldBag, resetField);
}

function resetField(field) {
  field.reset();
}