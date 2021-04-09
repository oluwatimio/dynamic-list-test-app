"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useVisitFields;

var _react = require("react");

var _utilities = require("../utilities.js");

function useVisitFields(fieldBag, visitor) {
  var fieldBagRef = (0, _react.useRef)(fieldBag);
  fieldBagRef.current = fieldBag;
  return (0, _react.useCallback)(function () {
    (0, _utilities.reduceFields)(fieldBagRef.current, function (_, field) {
      return visitor(field);
    });
  }, [visitor]);
}