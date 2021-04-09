"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useForm = useForm;

var _react = require("react");

var _utilities = require("../utilities.js");

var _dirty = require("./dirty.js");

var _reset = require("./reset.js");

var _submit = require("./submit.js");

/**
 * A custom hook for managing the state of an entire form. `useForm` wraps up many of the other hooks in this package in one API, and when combined with `useField` and `useList`, allows you to easily build complex forms with smart defaults for common cases.
 *
 * ### Examples
 *
 *```typescript
 * import React from 'react';
 * import {useField, useForm} from '@shopify/react-form';
 *
 *  function MyComponent() {
 *   const { fields, submit, submitting, dirty, reset, submitErrors } = useForm({
 *     fields: {
 *       title: useField('some default title'),
 *     },
 *     onSubmit: (fieldValues) => {
 *       return {status: "fail", errors: [{message: 'bad form data'}]}
 *     }
 *   });
 *
 *   return (
 *     <form onSubmit={submit}>
 *       {submitting && <p className="loading">loading...</p>}
 *       {submitErrors.length>0 && <p className="error">submitErrors.join(', ')</p>}
 *       <div>
 *         <label for="title">Title</label>
 *         <input
 *           id="title"
 *           name="title"
 *           value={title.value}
 *           onChange={title.onChange}
 *           onBlur={title.onBlur}
 *         />
 *         {title.error && <p className="error">{title.error}</p>}
 *       </div>
 *       <button disabled={!dirty} onClick={reset}>Reset</button>
 *       <button type="submit" disabled={!dirty}>Submit</button>
 *     </form>
 *  );
 *```
 *
 * @param fields - A dictionary of `Field` objects, dictionaries of `Field` objects, and lists of dictionaries of `Field` objects. Generally, you'll want these to be generated by the other hooks in this package, either `useField` or `useList`. This will be returned back out as the `fields` property of the return value.
 *
 * @param onSubmit - An async function to handle submission of the form. If this function returns an object of `{status: 'fail', error: FormError[]}` then the submission is considered a failure. Otherwise, it should return an object with `{status: 'success'}` and the submission will be considered a success. `useForm` will also call all client-side validation methods for the fields passed to it. The `onSubmit` handler will not be called if client validations fails.
 * @returns An object representing the current state of the form, with imperative methods to reset, submit, validate, and clean. Generally, the returned properties correspond 1:1 with the specific hook/utility for their functionality.
 *
 * @remarks
 * **Building your own:** Internally, `useForm` is a convenience wrapper over `useDirty`, `useReset`, and `useSubmit`. If you only need some of its functionality, consider building a custom hook combining a subset of them.
 * **Subforms:** You can have multiple `useForm`s wrapping different subsets of a group of fields. Using this you can submit subsections of the form independently and have all the error and dirty tracking logic "just work" together.
 */
function useForm(_ref) {
  var fields = _ref.fields,
      onSubmit = _ref.onSubmit,
      _ref$makeCleanAfterSu = _ref.makeCleanAfterSubmit,
      makeCleanAfterSubmit = _ref$makeCleanAfterSu === void 0 ? false : _ref$makeCleanAfterSu;
  var dirty = (0, _dirty.useDirty)(fields);
  var basicReset = (0, _reset.useReset)(fields);

  var _useSubmit = (0, _submit.useSubmit)(onSubmit, fields, makeCleanAfterSubmit),
      submit = _useSubmit.submit,
      submitting = _useSubmit.submitting,
      errors = _useSubmit.errors,
      setErrors = _useSubmit.setErrors;

  var reset = (0, _react.useCallback)(function () {
    setErrors([]);
    basicReset();
  }, [basicReset, setErrors]);
  var fieldsRef = (0, _react.useRef)(fields);
  fieldsRef.current = fields;
  var validate = (0, _react.useCallback)(function () {
    return (0, _utilities.validateAll)(fieldsRef.current);
  }, [fieldsRef]);
  var makeClean = (0, _react.useCallback)(function () {
    return (0, _utilities.makeCleanFields)(fieldsRef.current);
  }, [fieldsRef]);
  return {
    fields: fields,
    dirty: dirty,
    submitting: submitting,
    submit: submit,
    reset: reset,
    validate: validate,
    makeClean: makeClean,
    submitErrors: errors
  };
}