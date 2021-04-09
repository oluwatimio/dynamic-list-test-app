"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isField = isField;
exports.mapObject = mapObject;
exports.normalizeValidation = normalizeValidation;
exports.isChangeEvent = isChangeEvent;
exports.propagateErrors = propagateErrors;
exports.reduceFields = reduceFields;
exports.fieldsToArray = fieldsToArray;
exports.validateAll = validateAll;
exports.getValues = getValues;
exports.noop = noop;
exports.shallowArrayComparison = shallowArrayComparison;
exports.defaultDirtyComparator = defaultDirtyComparator;
exports.makeCleanFields = makeCleanFields;

var _getValue = _interopRequireDefault(require("get-value"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function isField(input) {
  return Object.prototype.hasOwnProperty.call(input, 'value') && Object.prototype.hasOwnProperty.call(input, 'onChange') && Object.prototype.hasOwnProperty.call(input, 'onBlur') && Object.prototype.hasOwnProperty.call(input, 'defaultValue');
}

function mapObject(input, mapper) {
  return Object.keys(input).reduce(function (accumulator, key) {
    var value = input[key];
    accumulator[key] = mapper(value, key);
    return accumulator;
  }, {});
} // Eg: set({a: 1}, ['b', 'c'], 2) // => {a: 1, b: {c: 2}}


function setObject(obj, path, value) {
  var _path = _toArray(path),
      key = _path[0],
      restPath = _path.slice(1);

  if (key == null || obj === null || _typeof(obj) !== 'object') {
    return obj;
  }

  if (!restPath.length) {
    obj[key] = value;
    return obj;
  } // creates prop if it doesn't exist


  if (typeof obj[key] === 'undefined') {
    // look ahead to the next key. If it is a number, this prop is an array
    obj[key] = typeof restPath[0] === 'number' ? [] : {};
  }

  obj[key] = setObject(obj[key], restPath, value);
  return obj;
}

function normalizeValidation(input) {
  return Array.isArray(input) ? input : [input];
}

function isChangeEvent(value) {
  return _typeof(value) === 'object' && value !== null && Reflect.has(value, 'target') && Reflect.has(value.target, 'value');
}

function propagateErrors(fieldBag, errors) {
  errors.forEach(function (error) {
    if (error.field == null) {
      return;
    }

    var got = (0, _getValue["default"])(fieldBag, error.field);

    if (got && isField(got)) {
      if (got.error !== error.message) {
        got.setError(error.message);
      }
    }
  });
} // Reduce function similar to Array.reduce() for a tree-like FieldBag


function reduceFields(fieldBag, reduceFn, initialValue) {
  var reduceEmptyFn = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function (value) {
    return value;
  };
  return function reduceField(accumulator, item, path) {
    if (isField(item)) {
      return reduceFn(accumulator, item, path, fieldBag);
    }

    if (Array.isArray(item) && item.length) {
      return item.reduce(function (_accumulator, value, index) {
        return reduceField(_accumulator, value, path.concat(index));
      }, accumulator);
    }

    if (_typeof(item) === 'object' && item !== null) {
      var entries = Object.entries(item);

      if (entries.length) {
        return entries.reduce(function (_accumulator, _ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              key = _ref2[0],
              value = _ref2[1];

          return reduceField(_accumulator, value, path.concat(key));
        }, accumulator);
      }
    } // item is empty array, empty object, or primitive


    return reduceEmptyFn(accumulator, item, path, fieldBag);
  }(initialValue, fieldBag, []);
}

function fieldsToArray(fieldBag) {
  return reduceFields(fieldBag, function (fields, field) {
    return fields.concat(field);
  }, []);
}

function validateAll(fieldBag) {
  return reduceFields(fieldBag, function (errors, field) {
    var message = field.runValidation();
    return message ? errors.concat({
      message: message
    }) : errors;
  }, []);
}

function getValues(fieldBag) {
  return reduceFields(fieldBag, function (formValue, field, path) {
    return setObject(formValue, path, field.value);
  }, {}, function (formValue, value, path) {
    return setObject(formValue, path, value);
  });
}

function noop() {}

function shallowArrayComparison(arrA, arrB) {
  if (arrA === arrB) {
    return true;
  }

  if (!arrA || !arrB) {
    return false;
  }

  var len = arrA.length;

  if (arrB.length !== len) {
    return false;
  }

  for (var i = 0; i < len; i++) {
    if (arrA[i] !== arrB[i]) {
      return false;
    }
  }

  return true;
}

function defaultDirtyComparator(defaultValue, newValue) {
  return Array.isArray(defaultValue) ? !shallowArrayComparison(defaultValue, newValue) : defaultValue !== newValue;
}

function makeCleanFields(fieldBag) {
  reduceFields(fieldBag, function (_, field) {
    return field.newDefaultValue(field.value);
  });
}