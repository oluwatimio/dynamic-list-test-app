"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSubmit = useSubmit;
exports.submitSuccess = submitSuccess;
exports.submitFail = submitFail;

var _react = require("react");

var _reactHooks = require("@shopify/react-hooks");

var _utilities = require("../utilities.js");

function useSubmit(onSubmit = noopSubmission, fieldBag, makeCleanAfterSubmit = false) {
  const mounted = (0, _reactHooks.useMountedRef)();
  const [submitting, setSubmitting] = (0, _react.useState)(false);
  const [submitErrors, setSubmitErrors] = (0, _react.useState)([]);
  const fieldBagRef = (0, _react.useRef)(fieldBag);
  fieldBagRef.current = fieldBag;
  const setErrors = (0, _react.useCallback)(errors => {
    setSubmitErrors(errors);
    (0, _utilities.propagateErrors)(fieldBagRef.current, errors);
  }, []);
  const submit = (0, _react.useCallback)(async event => {
    const fields = fieldBagRef.current;

    if (event && event.preventDefault && !event.defaultPrevented) {
      event.preventDefault();
    }

    const clientErrors = (0, _utilities.validateAll)(fields);

    if (clientErrors.length > 0) {
      setErrors(clientErrors);
      return;
    }

    setSubmitting(true);
    const result = await onSubmit((0, _utilities.getValues)(fields));

    if (mounted.current === false) {
      return;
    }

    setSubmitting(false);

    if (result.status === 'fail') {
      setErrors(result.errors);
    } else {
      setSubmitErrors([]);

      if (makeCleanAfterSubmit) {
        (0, _utilities.makeCleanFields)(fields);
      }
    }
  }, [mounted, onSubmit, setErrors, makeCleanAfterSubmit]);
  return {
    submit,
    submitting,
    errors: submitErrors,
    setErrors
  };
}
/**
 * A convenience function for `onSubmit` callbacks returning values to `useSubmit` or `useForm`.
 * @return Returns a `SubmitResult` representing your successful form submission.
 */


function submitSuccess() {
  return {
    status: 'success'
  };
}
/**
 * A convenience function for `onSubmit` callbacks returning values to `useSubmit` or `useForm`
 * @param errors - An array of errors with the user's input. These can either include both a `field` and a `message`, in which case they will be passed down to a matching field, or just a `message`.
 * @return Returns a `SubmitResult` representing your failed form submission.
 */


function submitFail(errors = []) {
  return {
    status: 'fail',
    errors
  };
}

function noopSubmission(_) {
  return Promise.resolve(submitSuccess());
}