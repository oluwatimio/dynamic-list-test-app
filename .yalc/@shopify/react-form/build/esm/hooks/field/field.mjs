function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

import { useCallback, useEffect, useMemo } from 'react';
import isEqual from 'fast-deep-equal';
import { normalizeValidation, isChangeEvent } from "../../utilities.mjs";
import { updateAction, updateErrorAction, newDefaultAction, resetAction, useFieldReducer } from "./reducer.mjs";

/**
 * A custom hook for handling the state and validations of an input field.
 *
 * In it's simplest form `useField` can be called with a single parameter for the default value of the field.
 *
 * ```typescript
 * const field = useField('default value');
 * ```
 *
 * You can also pass a more complex configuration object specifying a validation function.
 *
 *
 * ```typescript
 *const field = useField({
 *  value: someRemoteData.title,
 *  validates: (title) => {
 *    if (title.length > 3) {
 *      return 'Title must be longer than three characters';
 *    }
 *  }
 *});
 * ```
 *
 * You may also pass multiple validators.
 *
 *```typescript
 * const field = useField({
 *   value: someRemoteData.title,
 *   validates: [
 *      (title) => {
 *         if (title.length > 3) {
 *           return 'Title must be longer than three characters';
 *         }
 *      },
 *      (title) => {
 *         if (!title.includes('radical')) {
 *           return 'only radical items allowed!';
 *         }
 *       }
 *    ],
 * });
 * ```
 *
 * Generally, you will want to use the object returned from useField to handle state for exactly one form input.
 *
 * ```typescript
 * const field = useField('default value');
 * return (
 *   <div>
 *     <label htmlFor="test-field">
 *       Test field{' '}
 *       <input
 *         id="test-field"
 *         name="test-field"
 *         value={field.value}
 *         onChange={field.onChange}
 *         onBlur={field.onBlur}
 *       />
 *     </label>
 *     {field.error && <p>{field.error}</p>}
 *   </div>
 * );
 * ```
 *
 * If using `@shopify/polaris` or other custom components that support `onChange`, `onBlur`, `value`, and `error` props then
 * you can accomplish the above more tersely by using the ES6 `spread` (...) operator.
 *
 * ```typescript
 * const title = useField('default title');
 * return (<TextField label="Title" {...title} />);
 * ```
 *
 * @param config - The default value of the input, or a configuration object specifying both the value and validation config.
 * @param validationDependencies - An array of values for determining when to regenerate the field's validation callbacks. Any value that is referenced by a validator other than those passed into it should be included.
 * @returns A `Field` object representing the state of your input. It also includes functions to manipulate that state. Generally, you will want to pass these callbacks down to the component or components representing your input.
 *
 * @remarks
 * **Reinitialization:** If the `value` property of the field configuration changes between calls to `useField`,
 * the field will be reset to use it as it's new default value.
 *
 * **Imperative methods:** The returned `Field` object contains a number of methods used to imperatively alter its state.
 * These should only be used as escape hatches where the existing hooks and components do not make your life easy,
 * or to build new abstractions in the same vein as `useForm`, `useSubmit` and friends.
 */
export function useField(input) {
  var dependencies = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var _normalizeFieldConfig = normalizeFieldConfig(input),
      value = _normalizeFieldConfig.value,
      validates = _normalizeFieldConfig.validates,
      dirtyStateComparator = _normalizeFieldConfig.dirtyStateComparator;

  var validators = normalizeValidation(validates);

  var _useFieldReducer = useFieldReducer(value, dirtyStateComparator),
      _useFieldReducer2 = _slicedToArray(_useFieldReducer, 2),
      state = _useFieldReducer2[0],
      dispatch = _useFieldReducer2[1];

  var resetActionObject = useMemo(function () {
    return resetAction();
  }, []);
  var reset = useCallback(function () {
    return dispatch(resetActionObject);
  }, [dispatch, resetActionObject]);
  var newDefaultValue = useCallback(function (value) {
    return dispatch(newDefaultAction(value));
  }, [dispatch]);
  var runValidation = useCallback(function () {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : state.value;
    var errors = validators.map(function (check) {
      return check(value, {});
    }).filter(function (value) {
      return value != null;
    });

    if (errors && errors.length > 0) {
      var _errors = _slicedToArray(errors, 1),
          firstError = _errors[0];

      dispatch(updateErrorAction(errors));
      return firstError;
    }

    dispatch(updateErrorAction(undefined));
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [state.value].concat(_toConsumableArray(dependencies)));
  var onChange = useCallback(function (value) {
    var normalizedValue = isChangeEvent(value) ? value.target.value : value;
    dispatch(updateAction(normalizedValue));

    if (state.error) {
      runValidation(normalizedValue);
    }
  }, [runValidation, state.error, dispatch]);
  var setError = useCallback(function (value) {
    return dispatch(updateErrorAction(value));
  }, [dispatch]);
  var onBlur = useCallback(function () {
    if (state.touched === false && state.error == null) {
      return;
    }

    runValidation();
  }, [runValidation, state.touched, state.error]); // We want to reset the field whenever a new `value` is passed in

  useEffect(function () {
    if (!isEqual(value, state.defaultValue)) {
      newDefaultValue(value);
    } // We actually do not want this to rerun when our `defaultValue` is updated. It can
    // only happen independently of this callback when `newDefaultValue` is called by a user,
    // and we don't want to undue their hard work by resetting to `value`.
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [value, newDefaultValue]);
  var field = useMemo(function () {
    return _objectSpread(_objectSpread({}, state), {}, {
      onBlur: onBlur,
      onChange: onChange,
      newDefaultValue: newDefaultValue,
      runValidation: runValidation,
      setError: setError,
      reset: reset
    });
  }, [state, onBlur, onChange, newDefaultValue, runValidation, setError, reset]);
  return field;
}

/**
 * Converts a standard `Field<Value>` into a `ChoiceField` that is compatible
 * with `<Checkbox />` and `<RadioButton />` components in `@shopify/polaris`.
 *
 * For fields that are used by both a choice components and other components, it
 * can be beneficial to retain the original `Field<Value>` shape and convert
 * the field on the fly for the choice component.
 *
 * For multi-value base fields (not simple boolean fields), you can provide a
 * checkedValue predicate to project the base field's value into the boolean
 * checked state so that it can function with multiple <RadioButton /> choice
 * components.
 *
 * ```typescript
 * const enabled = useField(false);
 * return (<Checkbox label="Enabled" {...asChoiceField(enabled)} />);
 *
 * const field = useField<'A' | 'B'>('A');
 * const radioA = (<RadioButton label="A" {...asChoiceField(field, 'A')} />)
 * const radioB = (<RadioButton label="B" {...asChoiceField(field, 'B')} />)
 * ```
 */
export function asChoiceField(_ref) {
  var value = _ref.value,
      fieldData = _objectWithoutProperties(_ref, ["value"]);

  var checkedValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return _objectSpread(_objectSpread({}, fieldData), {}, {
    checked: value === checkedValue,
    onChange: function onChange(checked) {
      if (typeof checkedValue === 'boolean') {
        fieldData.onChange(checked);
      } else if (checked) {
        fieldData.onChange(checkedValue);
      }
    }
  });
}
/**
 * A simplification to `useField` that returns a `ChoiceField` by automatically
 * converting a boolean field using `asChoiceField` for direct use in choice
 * components.
 *
 * ```typescript
 * const enabled = useChoiceField(false);
 * return (<Checkbox label="Enabled" {...enabled} />);
 * ```
 */

export function useChoiceField(input) {
  var dependencies = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return asChoiceField(useField(input, dependencies));
}

function normalizeFieldConfig(input) {
  if (isFieldConfig(input)) {
    return input;
  }

  return {
    value: input,
    validates: function validates() {
      return undefined;
    }
  };
}

function isFieldConfig(input) {
  return input != null && _typeof(input) === 'object' && Reflect.has(input, 'value') && Reflect.has(input, 'validates');
}