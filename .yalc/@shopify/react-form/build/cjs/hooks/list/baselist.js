"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useBaseList = useBaseList;

var _react = require("react");

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _utilities = require("../../utilities.js");

var _index = require("./hooks/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function useBaseList(listOrConfig) {
  var validationDependencies = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var list = Array.isArray(listOrConfig) ? listOrConfig : listOrConfig.list;
  var validates = Array.isArray(listOrConfig) ? {} : listOrConfig.validates || {};

  var _useListReducer = (0, _index.useListReducer)(list),
      _useListReducer2 = _slicedToArray(_useListReducer, 2),
      state = _useListReducer2[0],
      dispatch = _useListReducer2[1];

  (0, _react.useEffect)(function () {
    if (!(0, _fastDeepEqual["default"])(list, state.initial)) {
      dispatch((0, _index.reinitializeAction)(list));
    }
  }, [list, state.initial, dispatch]);
  var validationConfigs = (0, _react.useMemo)(function () {
    return (0, _utilities.mapObject)(validates, _utilities.normalizeValidation);
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [validates].concat(_toConsumableArray(validationDependencies)));
  var handlers = (0, _index.useHandlers)(state, dispatch, validationConfigs);
  var fields = (0, _react.useMemo)(function () {
    return state.list.map(function (item, index) {
      return (0, _utilities.mapObject)(item, function (field, key) {
        return _objectSpread(_objectSpread({}, field), handlers[index][key]);
      });
    });
  }, [state.list, handlers]);

  var equals = function equals(a, b) {
    return a.length === b.length && a.every(function (v, i) {
      return v === b[i];
    });
  }; // dirty: equals(state.initial, state.list


  return {
    fields: fields,
    dispatch: dispatch
  };
}