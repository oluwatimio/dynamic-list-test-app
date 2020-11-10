"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = require("react");
var react_hooks_1 = require("@shopify/react-hooks");
var utilities_1 = require("../utilities");
function useSubmit(onSubmit, fieldBag, makeCleanAfterSubmit) {
    var _this = this;
    if (onSubmit === void 0) { onSubmit = noopSubmission; }
    if (makeCleanAfterSubmit === void 0) { makeCleanAfterSubmit = false; }
    var mounted = react_hooks_1.useMountedRef();
    var _a = tslib_1.__read(react_1.useState(false), 2), submitting = _a[0], setSubmitting = _a[1];
    var _b = tslib_1.__read(react_1.useState([]), 2), submitErrors = _b[0], setSubmitErrors = _b[1];
    var fieldBagRef = react_1.useRef(fieldBag);
    fieldBagRef.current = fieldBag;
    var setErrors = react_1.useCallback(function (errors) {
        setSubmitErrors(errors);
        utilities_1.propagateErrors(fieldBagRef.current, errors);
    }, []);
    var submit = react_1.useCallback(function (event) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var fields, clientErrors, result;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fields = fieldBagRef.current;
                    if (event && event.preventDefault && !event.defaultPrevented) {
                        event.preventDefault();
                    }
                    clientErrors = utilities_1.validateAll(fields);
                    if (clientErrors.length > 0) {
                        setErrors(clientErrors);
                        return [2 /*return*/];
                    }
                    setSubmitting(true);
                    return [4 /*yield*/, onSubmit(utilities_1.getValues(fields))];
                case 1:
                    result = _a.sent();
                    if (mounted.current === false) {
                        return [2 /*return*/];
                    }
                    setSubmitting(false);
                    if (result.status === 'fail') {
                        setErrors(result.errors);
                    }
                    else {
                        setSubmitErrors([]);
                    }
                    if (makeCleanAfterSubmit) {
                        utilities_1.makeCleanFields(fields);
                    }
                    return [2 /*return*/];
            }
        });
    }); }, [mounted, onSubmit, setErrors, makeCleanAfterSubmit]);
    return { submit: submit, submitting: submitting, errors: submitErrors, setErrors: setErrors };
}
exports.useSubmit = useSubmit;
/**
 * A convenience function for `onSubmit` callbacks returning values to `useSubmit` or `useForm`.
 * @return Returns a `SubmitResult` representing your successful form submission.
 */
function submitSuccess() {
    return { status: 'success' };
}
exports.submitSuccess = submitSuccess;
/**
 * A convenience function for `onSubmit` callbacks returning values to `useSubmit` or `useForm`
 * @param errors - An array of errors with the user's input. These can either include both a `field` and a `message`, in which case they will be passed down to a matching field, or just a `message`.
 * @return Returns a `SubmitResult` representing your failed form submission.
 */
function submitFail(errors) {
    if (errors === void 0) { errors = []; }
    return { status: 'fail', errors: errors };
}
exports.submitFail = submitFail;
function noopSubmission(_) {
    return Promise.resolve(submitSuccess());
}
