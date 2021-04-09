"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validator = validator;

var _predicates = require("@shopify/predicates");

/**
 * A factory for creating reusable validation functions.
 *
 * ```tsx
 *  const isAColor = validator((input) => ['red', 'blue', 'green', 'yellow'].includes(input));
 *
 *  // the returned function takes an error string or a function to generate errors
 *  const colorField = useField({
 *    value: 'green',
 *    validates: isAColor((input) => `${input} is not a color`);
 *  })
 * ```
 *
 * By default validators will return true automatically if the value is empty (`null`, `undefined` or `''`). You can circumvent this by using the `skipOnEmpty` option.
 *
 * ```tsx
 *  const isAColor = validator(
 *    (input) => ['red', 'blue', 'green', 'yellow'].includes(input),
 *    {skipOnEmpty: false},
 *  );
 * ```
 *
 * @param matcher - a function that takes in an input and returns `true` if the value is valid, or `false` if it is not.
 * @param options - an optional configuration object.
 */
function validator(matcher) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$skipOnEmpty = _ref.skipOnEmpty,
      skipOnEmpty = _ref$skipOnEmpty === void 0 ? true : _ref$skipOnEmpty;

  return function (errorContent) {
    return function (input) {
      if (skipOnEmpty && (0, _predicates.isEmpty)(input)) {
        return;
      }

      var matches = matcher(input);

      if (matches) {
        return;
      }

      if (typeof errorContent === 'function') {
        return errorContent(input);
      }

      return errorContent;
    };
  };
}