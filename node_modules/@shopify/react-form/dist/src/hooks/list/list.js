"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = require("react");
var fast_deep_equal_1 = tslib_1.__importDefault(require("fast-deep-equal"));
var utilities_1 = require("../../utilities");
var reducer_1 = require("./reducer");
var hooks_1 = require("./hooks");
/**
 * A custom hook for handling the state and validations of fields for a list of objects.
 *
 * In it's simplest form `useList` can be called with a single parameter with the list to derive default values and structure from.
 *
 * ```typescript
 * const list = useList([{title: '', description: ''}, {title: '', description: ''}]);
 * ```
 *
 * You can also pass a more complex configuration object specifying a validation dictionary.
 *
 * ```tsx
 *const list = useList({
 *  list: [{title: '', description: ''}, {title: '', description: ''}],
 *  validates: {
 *    title:(title) => {
 *      if (title.length > 3) {
 *        return 'Title must be longer than three characters';
 *      }
 *    },
 *   description: (description) => {
 *     if (description === '') {
 *       return 'Description is required!';
 *     }
 *   }
 *  }
 *});
 * ```
 *
 * Generally, you will want to use the list returned from useList by looping over it in your JSX.
 * ```tsx
 *function MyComponent() {
 *  const variants = useList([{title: '', description: ''}, {title: '', description: ''}]);
 *
 *  return (
 *    <ul>
 *     {variants.map((fields, index) => (
 *       <li key={index}>
 *         <label htmlFor={`title-${index}`}>
 *           title{' '}
 *           <input
 *             id={`title-${index}`}
 *             name={`title-${index}`}
 *             value={fields.title.value}
 *             onChange={fields.title.onChange}
 *             onBlur={fields.title.onBlur}
 *           />
 *         </label>
 *         {field.title.error && <p>{field.title.error}</p>}
 *         <label htmlFor={`description-${index}`}>
 *           description{' '}
 *           <input
 *             id={`description-${index}`}
 *             name={`description-${index}`}
 *             value={fields.description.value}
 *             onChange={fields.description.onChange}
 *             onBlur={fields.description.onBlur}
 *           />
 *         </label>
 *         {field.description.error && <p>{field.description.error}</p>}
 *       </li>
 *      ))}
 *    </ul>
 *  );
 *}
 *```
 *
 * If using `@shopify/polaris` or other custom components that support `onChange`, `onBlur`, `value`, and `error` props then
 * you can accomplish the above more tersely by using the ES6 `spread` (...) operator.
 *
 * ```tsx
 * function MyComponent() {
 *  const variants = useList([{title: '', description: ''}, {title: '', description: ''}]);
 *
 *  return (
 *    <ul>
 *     {variants.map((fields, index) => (
 *       <li key={index}>
 *         <TextField label="title" name={`title${index}`} {...fields.title} />
 *         <TextField
 *            label="description"
 *            id={`description${index}`}
 *            {...fields.description}
 *         />
 *       </li>
 *      ))}
 *    </ul>
 *   );
 * }
 * ```
 *
 * @param config - A configuration object specifying both the value and validation config.
 * @param validationDependencies - An array of dependencies to use to decide when to regenerate validators.
 * @returns A list of dictionaries of `Field` objects representing the state of your input. It also includes functions to manipulate that state. Generally, you will want to pass these callbacks down to the component or components representing your input.
 *
 * @remarks
 * **Reinitialization:** If the `list` property of the field configuration changes between calls to `useList`,
 * the field will be reset to use it as it's new default value.
 *
 * **Imperative methods:** The returned `Field` objects contains a number of methods used to imperatively alter their state.
 * These should only be used as escape hatches where the existing hooks and components do not make your life easy,
 * or to build new abstractions in the same vein as `useForm`, `useSubmit` and friends.
 */
function useList(listOrConfig, validationDependencies) {
    if (validationDependencies === void 0) { validationDependencies = []; }
    var list = Array.isArray(listOrConfig) ? listOrConfig : listOrConfig.list;
    var validates = Array.isArray(listOrConfig)
        ? {}
        : listOrConfig.validates || {};
    var _a = tslib_1.__read(reducer_1.useListReducer(list), 2), state = _a[0], dispatch = _a[1];
    react_1.useEffect(function () {
        if (!fast_deep_equal_1.default(list, state.initial)) {
            dispatch(reducer_1.reinitializeAction(list));
        }
    }, [list, state.initial, dispatch]);
    var validationConfigs = react_1.useMemo(function () {
        return utilities_1.mapObject(validates, utilities_1.normalizeValidation);
    }, tslib_1.__spread([validates], validationDependencies));
    var handlers = hooks_1.useHandlers(state, dispatch, validationConfigs);
    return react_1.useMemo(function () {
        return state.list.map(function (item, index) {
            return utilities_1.mapObject(item, function (field, key) {
                return tslib_1.__assign(tslib_1.__assign({}, field), handlers[index][key]);
            });
        });
    }, [state.list, handlers]);
}
exports.useList = useList;
