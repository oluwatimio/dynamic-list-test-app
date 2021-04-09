"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSubmit = useSubmit;
exports.submitSuccess = submitSuccess;
exports.submitFail = submitFail;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _react = require("react");

var _reactHooks = require("@shopify/react-hooks");

var _utilities = require("../utilities.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function useSubmit() {
  var onSubmit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noopSubmission;
  var fieldBag = arguments.length > 1 ? arguments[1] : undefined;
  var makeCleanAfterSubmit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var mounted = (0, _reactHooks.useMountedRef)();

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      submitting = _useState2[0],
      setSubmitting = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      submitErrors = _useState4[0],
      setSubmitErrors = _useState4[1];

  var fieldBagRef = (0, _react.useRef)(fieldBag);
  fieldBagRef.current = fieldBag;
  var setErrors = (0, _react.useCallback)(function (errors) {
    setSubmitErrors(errors);
    (0, _utilities.propagateErrors)(fieldBagRef.current, errors);
  }, []);
  var submit = (0, _react.useCallback)( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee(event) {
      var fields, clientErrors, result;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              fields = fieldBagRef.current;

              if (event && event.preventDefault && !event.defaultPrevented) {
                event.preventDefault();
              }

              clientErrors = (0, _utilities.validateAll)(fields);

              if (!(clientErrors.length > 0)) {
                _context.next = 6;
                break;
              }

              setErrors(clientErrors);
              return _context.abrupt("return");

            case 6:
              setSubmitting(true);
              _context.next = 9;
              return onSubmit((0, _utilities.getValues)(fields));

            case 9:
              result = _context.sent;

              if (!(mounted.current === false)) {
                _context.next = 12;
                break;
              }

              return _context.abrupt("return");

            case 12:
              setSubmitting(false);

              if (result.status === 'fail') {
                setErrors(result.errors);
              } else {
                setSubmitErrors([]);

                if (makeCleanAfterSubmit) {
                  (0, _utilities.makeCleanFields)(fields);
                }
              }

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }(), [mounted, onSubmit, setErrors, makeCleanAfterSubmit]);
  return {
    submit: submit,
    submitting: submitting,
    errors: submitErrors,
    setErrors: setErrors
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


function submitFail() {
  var errors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return {
    status: 'fail',
    errors: errors
  };
}

function noopSubmission(_) {
  return Promise.resolve(submitSuccess());
}