"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDirty = useDirty;

var _utilities = require("../utilities.js");

function useDirty(fieldBag) {
  return (0, _utilities.reduceFields)(fieldBag, (dirty, field) => dirty || field.dirty, false);
}