"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateAction = updateAction;
exports.resetAction = resetAction;
exports.newDefaultAction = newDefaultAction;
exports.updateErrorAction = updateErrorAction;
exports.reduceField = reduceField;
exports.makeFieldReducer = makeFieldReducer;
exports.useFieldReducer = useFieldReducer;
exports.initialFieldState = initialFieldState;

var _react = require("react");

var _utilities = require("../../utilities.js");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function updateAction(value) {
  return {
    type: 'update',
    payload: value
  };
}

function resetAction() {
  return {
    type: 'reset'
  };
}

function newDefaultAction(value) {
  return {
    type: 'newDefaultValue',
    payload: value
  };
}

function updateErrorAction(error) {
  return {
    type: 'updateError',
    payload: error
  };
}

var shallowFieldReducer = makeFieldReducer({
  dirtyStateComparator: _utilities.defaultDirtyComparator
});

function reduceField(prevState, action) {
  return shallowFieldReducer(prevState, action);
}

function makeFieldReducer(_ref) {
  var _ref$dirtyStateCompar = _ref.dirtyStateComparator,
      dirtyStateComparator = _ref$dirtyStateCompar === void 0 ? _utilities.defaultDirtyComparator : _ref$dirtyStateCompar;
  return function (state, action) {
    switch (action.type) {
      case 'update':
        {
          var newValue = action.payload;
          var defaultValue = state.defaultValue;
          var dirty = dirtyStateComparator(defaultValue, newValue);
          return _objectSpread(_objectSpread({}, state), {}, {
            dirty: dirty,
            value: newValue,
            touched: true
          });
        }

      case 'updateError':
        {
          var payload = Array.isArray(action.payload) ? action.payload : [action.payload];

          var _payload = _slicedToArray(payload, 1),
              firstError = _payload[0];

          var allErrors = firstError ? payload : [];

          if ((0, _utilities.shallowArrayComparison)(allErrors, state.allErrors)) {
            return _objectSpread(_objectSpread({}, state), {}, {
              error: firstError
            });
          } else {
            return _objectSpread(_objectSpread({}, state), {}, {
              error: firstError,
              allErrors: allErrors
            });
          }
        }

      case 'reset':
        {
          var _defaultValue = state.defaultValue;
          return _objectSpread(_objectSpread({}, state), {}, {
            error: undefined,
            value: _defaultValue,
            dirty: false,
            touched: false,
            allErrors: []
          });
        }

      case 'newDefaultValue':
        {
          var newDefaultValue = action.payload;
          return _objectSpread(_objectSpread({}, state), {}, {
            error: undefined,
            value: newDefaultValue,
            defaultValue: newDefaultValue,
            touched: false,
            dirty: false
          });
        }
    }
  };
}

function useFieldReducer(value, dirtyStateComparator) {
  return (0, _react.useReducer)(makeFieldReducer({
    dirtyStateComparator: dirtyStateComparator
  }), initialFieldState(value));
}

function initialFieldState(value) {
  return {
    value: value,
    defaultValue: value,
    error: undefined,
    touched: false,
    dirty: false,
    allErrors: []
  };
}