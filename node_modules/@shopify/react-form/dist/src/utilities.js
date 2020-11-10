"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var get_value_1 = tslib_1.__importDefault(require("get-value"));
function isField(input) {
    return (Object.prototype.hasOwnProperty.call(input, 'value') &&
        Object.prototype.hasOwnProperty.call(input, 'onChange') &&
        Object.prototype.hasOwnProperty.call(input, 'onBlur') &&
        Object.prototype.hasOwnProperty.call(input, 'defaultValue'));
}
exports.isField = isField;
function mapObject(input, mapper) {
    return Object.keys(input).reduce(function (accumulator, key) {
        var value = input[key];
        accumulator[key] = mapper(value, key);
        return accumulator;
    }, {});
}
exports.mapObject = mapObject;
// Eg: set({a: 1}, ['b', 'c'], 2) // => {a: 1, b: {c: 2}}
function setObject(obj, path, value) {
    var _a = tslib_1.__read(path), key = _a[0], restPath = _a.slice(1);
    if (key == null || obj === null || typeof obj !== 'object') {
        return obj;
    }
    if (!restPath.length) {
        obj[key] = value;
        return obj;
    }
    // creates prop if it doesn't exist
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
exports.normalizeValidation = normalizeValidation;
function isChangeEvent(value) {
    return (typeof value === 'object' &&
        value !== null &&
        Reflect.has(value, 'target') &&
        Reflect.has(value.target, 'value'));
}
exports.isChangeEvent = isChangeEvent;
function propagateErrors(fieldBag, errors) {
    errors.forEach(function (error) {
        if (error.field == null) {
            return;
        }
        var got = get_value_1.default(fieldBag, error.field);
        if (got && isField(got)) {
            if (got.error !== error.message) {
                got.setError(error.message);
            }
        }
    });
}
exports.propagateErrors = propagateErrors;
// Reduce function similar to Array.reduce() for a tree-like FieldBag
function reduceFields(fieldBag, reduceFn, initialValue, reduceEmptyFn) {
    if (reduceEmptyFn === void 0) { reduceEmptyFn = function (value) { return value; }; }
    return (function reduceField(accumulator, item, path) {
        if (isField(item)) {
            return reduceFn(accumulator, item, path, fieldBag);
        }
        if (Array.isArray(item) && item.length) {
            return item.reduce(function (_accumulator, value, index) {
                return reduceField(_accumulator, value, path.concat(index));
            }, accumulator);
        }
        if (typeof item === 'object' && item !== null) {
            var entries = Object.entries(item);
            if (entries.length) {
                return entries.reduce(function (_accumulator, _a) {
                    var _b = tslib_1.__read(_a, 2), key = _b[0], value = _b[1];
                    return reduceField(_accumulator, value, path.concat(key));
                }, accumulator);
            }
        }
        // item is empty array, empty object, or primitive
        return reduceEmptyFn(accumulator, item, path, fieldBag);
    })(initialValue, fieldBag, []);
}
exports.reduceFields = reduceFields;
function fieldsToArray(fieldBag) {
    return reduceFields(fieldBag, function (fields, field) { return fields.concat(field); }, []);
}
exports.fieldsToArray = fieldsToArray;
function validateAll(fieldBag) {
    return reduceFields(fieldBag, function (errors, field) {
        var message = field.runValidation();
        return message ? errors.concat({ message: message }) : errors;
    }, []);
}
exports.validateAll = validateAll;
function getValues(fieldBag) {
    return reduceFields(fieldBag, function (formValue, field, path) { return setObject(formValue, path, field.value); }, {}, function (formValue, value, path) { return setObject(formValue, path, value); });
}
exports.getValues = getValues;
function noop() { }
exports.noop = noop;
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
exports.shallowArrayComparison = shallowArrayComparison;
function defaultDirtyComparator(defaultValue, newValue) {
    return Array.isArray(defaultValue)
        ? !shallowArrayComparison(defaultValue, newValue)
        : defaultValue !== newValue;
}
exports.defaultDirtyComparator = defaultDirtyComparator;
function makeCleanFields(fieldBag) {
    reduceFields(fieldBag, function (_, field) { return field.newDefaultValue(field.value); });
}
exports.makeCleanFields = makeCleanFields;
