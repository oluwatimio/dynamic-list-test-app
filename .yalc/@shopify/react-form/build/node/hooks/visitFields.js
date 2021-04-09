"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useVisitFields;

var _react = require("react");

var _utilities = require("../utilities.js");

function useVisitFields(fieldBag, visitor) {
  const fieldBagRef = (0, _react.useRef)(fieldBag);
  fieldBagRef.current = fieldBag;
  return (0, _react.useCallback)(() => {
    (0, _utilities.reduceFields)(fieldBagRef.current, (_, field) => visitor(field));
  }, [visitor]);
}