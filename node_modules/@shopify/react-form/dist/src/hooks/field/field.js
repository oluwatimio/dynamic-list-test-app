"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = require("react");
var fast_deep_equal_1 = tslib_1.__importDefault(require("fast-deep-equal"));
var utilities_1 = require("../../utilities");
var reducer_1 = require("./reducer");
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
function useField(input, dependencies) {
    if (dependencies === void 0) { dependencies = []; }
    var _a = normalizeFieldConfig(input), value = _a.value, validates = _a.validates, dirtyStateComparator = _a.dirtyStateComparator;
    var validators = utilities_1.normalizeValidation(validates);
    var _b = tslib_1.__read(reducer_1.useFieldReducer(value, dirtyStateComparator), 2), state = _b[0], dispatch = _b[1];
    var resetActionObject = react_1.useMemo(function () { return reducer_1.resetAction(); }, []);
    var reset = react_1.useCallback(function () { return dispatch(resetActionObject); }, [
        dispatch,
        resetActionObject,
    ]);
    var newDefaultValue = react_1.useCallback(function (value) { return dispatch(reducer_1.newDefaultAction(value)); }, [dispatch]);
    var runValidation = react_1.useCallback(function (value) {
        if (value === void 0) { value = state.value; }
        var errors = validators
            .map(function (check) { return check(value, {}); })
            .filter(function (value) { return value != null; });
        if (errors && errors.length > 0) {
            var _a = tslib_1.__read(errors, 1), firstError = _a[0];
            dispatch(reducer_1.updateErrorAction(errors));
            return firstError;
        }
        dispatch(reducer_1.updateErrorAction(undefined));
    }, tslib_1.__spread([state.value], dependencies));
    var onChange = react_1.useCallback(function (value) {
        var normalizedValue = utilities_1.isChangeEvent(value) ? value.target.value : value;
        dispatch(reducer_1.updateAction(normalizedValue));
        if (state.error) {
            runValidation(normalizedValue);
        }
    }, [runValidation, state.error, dispatch]);
    var setError = react_1.useCallback(function (value) { return dispatch(reducer_1.updateErrorAction(value)); }, [
        dispatch,
    ]);
    var onBlur = react_1.useCallback(function () {
        if (state.touched === false && state.error == null) {
            return;
        }
        runValidation();
    }, [runValidation, state.touched, state.error]);
    // We want to reset the field whenever a new `value` is passed in
    react_1.useEffect(function () {
        if (!fast_deep_equal_1.default(value, state.defaultValue)) {
            newDefaultValue(value);
        }
        // We actually do not want this to rerun when our `defaultValue` is updated. It can
        // only happen independently of this callback when `newDefaultValue` is called by a user,
        // and we don't want to undue their hard work by resetting to `value`.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, newDefaultValue]);
    var field = react_1.useMemo(function () {
        return tslib_1.__assign(tslib_1.__assign({}, state), { onBlur: onBlur,
            onChange: onChange,
            newDefaultValue: newDefaultValue,
            runValidation: runValidation,
            setError: setError,
            reset: reset });
    }, [
        state,
        onBlur,
        onChange,
        newDefaultValue,
        runValidation,
        setError,
        reset,
    ]);
    return field;
}
exports.useField = useField;
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
function asChoiceField(_a, checkedValue) {
    if (checkedValue === void 0) { checkedValue = true; }
    var value = _a.value, fieldData = tslib_1.__rest(_a, ["value"]);
    return tslib_1.__assign(tslib_1.__assign({}, fieldData), { checked: value === checkedValue, onChange: function (checked) {
            if (typeof checkedValue === 'boolean') {
                fieldData.onChange(checked);
            }
            else if (checked) {
                fieldData.onChange(checkedValue);
            }
        } });
}
exports.asChoiceField = asChoiceField;
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
function useChoiceField(input, dependencies) {
    if (dependencies === void 0) { dependencies = []; }
    return asChoiceField(useField(input, dependencies));
}
exports.useChoiceField = useChoiceField;
function normalizeFieldConfig(input) {
    if (isFieldConfig(input)) {
        return input;
    }
    return { value: input, validates: function () { return undefined; } };
}
function isFieldConfig(input) {
    return (input != null &&
        typeof input === 'object' &&
        Reflect.has(input, 'value') &&
        Reflect.has(input, 'validates'));
}
