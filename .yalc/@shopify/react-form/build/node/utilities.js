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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isField(input) {
  return Object.prototype.hasOwnProperty.call(input, 'value') && Object.prototype.hasOwnProperty.call(input, 'onChange') && Object.prototype.hasOwnProperty.call(input, 'onBlur') && Object.prototype.hasOwnProperty.call(input, 'defaultValue');
}

function mapObject(input, mapper) {
  return Object.keys(input).reduce((accumulator, key) => {
    const value = input[key];
    accumulator[key] = mapper(value, key);
    return accumulator;
  }, {});
} // Eg: set({a: 1}, ['b', 'c'], 2) // => {a: 1, b: {c: 2}}


function setObject(obj, path, value) {
  const [key, ...restPath] = path;

  if (key == null || obj === null || typeof obj !== 'object') {
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
  return typeof value === 'object' && value !== null && Reflect.has(value, 'target') && Reflect.has(value.target, 'value');
}

function propagateErrors(fieldBag, errors) {
  errors.forEach(error => {
    if (error.field == null) {
      return;
    }

    const got = (0, _getValue.default)(fieldBag, error.field);

    if (got && isField(got)) {
      if (got.error !== error.message) {
        got.setError(error.message);
      }
    }
  });
} // Reduce function similar to Array.reduce() for a tree-like FieldBag


function reduceFields(fieldBag, reduceFn, initialValue, reduceEmptyFn = value => value) {
  return function reduceField(accumulator, item, path) {
    if (isField(item)) {
      return reduceFn(accumulator, item, path, fieldBag);
    }

    if (Array.isArray(item) && item.length) {
      return item.reduce((_accumulator, value, index) => reduceField(_accumulator, value, path.concat(index)), accumulator);
    }

    if (typeof item === 'object' && item !== null) {
      const entries = Object.entries(item);

      if (entries.length) {
        return entries.reduce((_accumulator, [key, value]) => reduceField(_accumulator, value, path.concat(key)), accumulator);
      }
    } // item is empty array, empty object, or primitive


    return reduceEmptyFn(accumulator, item, path, fieldBag);
  }(initialValue, fieldBag, []);
}

function fieldsToArray(fieldBag) {
  return reduceFields(fieldBag, (fields, field) => fields.concat(field), []);
}

function validateAll(fieldBag) {
  return reduceFields(fieldBag, (errors, field) => {
    const message = field.runValidation();
    return message ? errors.concat({
      message
    }) : errors;
  }, []);
}

function getValues(fieldBag) {
  return reduceFields(fieldBag, (formValue, field, path) => setObject(formValue, path, field.value), {}, (formValue, value, path) => setObject(formValue, path, value));
}

function noop() {}

function shallowArrayComparison(arrA, arrB) {
  if (arrA === arrB) {
    return true;
  }

  if (!arrA || !arrB) {
    return false;
  }

  const len = arrA.length;

  if (arrB.length !== len) {
    return false;
  }

  for (let i = 0; i < len; i++) {
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
  reduceFields(fieldBag, (_, field) => field.newDefaultValue(field.value));
}