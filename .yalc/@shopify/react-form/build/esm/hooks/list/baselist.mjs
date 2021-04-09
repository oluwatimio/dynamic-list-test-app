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

import { useMemo, useEffect } from 'react';
import isEqual from 'fast-deep-equal';
import { mapObject, normalizeValidation } from "../../utilities.mjs";
import { useHandlers, useListReducer, reinitializeAction } from "./hooks/index.mjs";
/*

 * A custom hook for handling the state and validations of fields for a list of objects which can be built upon. (e.g useList and useDynamicList).

 * @param listOrConfig - A configuration object specifying both the value and validation config.
 * @param validationDependencies - An array of dependencies to use to decide when to regenerate validators.
 * @returns A list of dictionaries of `Field` objects representing the state of your input and a dispatcher which can be used for other hooks to build around base list (e.g useList and useDynamicList).
 *
 * @remarks
 * **Reinitialization:** If the `list` property of the field configuration changes between calls to `useBaseList`,
 * the field will be reset to use it as it's new default value.
 *
 * **Imperative methods:** The returned `Field` objects contains a number of methods used to imperatively alter their state.
 * These should only be used as escape hatches where the existing hooks and components do not make your life easy,
 * or to build new abstractions in the same vein as `useForm`, `useSubmit` and friends.
 *
*/

export function useBaseList(listOrConfig) {
  var validationDependencies = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var list = Array.isArray(listOrConfig) ? listOrConfig : listOrConfig.list;
  var validates = Array.isArray(listOrConfig) ? {} : listOrConfig.validates || {};

  var _useListReducer = useListReducer(list),
      _useListReducer2 = _slicedToArray(_useListReducer, 2),
      state = _useListReducer2[0],
      dispatch = _useListReducer2[1];

  useEffect(function () {
    if (!isEqual(list, state.initial)) {
      dispatch(reinitializeAction(list));
    }
  }, [list, state.initial, dispatch]);
  var validationConfigs = useMemo(function () {
    return mapObject(validates, normalizeValidation);
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [validates].concat(_toConsumableArray(validationDependencies)));
  var handlers = useHandlers(state, dispatch, validationConfigs);
  var fields = useMemo(function () {
    return state.list.map(function (item, index) {
      return mapObject(item, function (field, key) {
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