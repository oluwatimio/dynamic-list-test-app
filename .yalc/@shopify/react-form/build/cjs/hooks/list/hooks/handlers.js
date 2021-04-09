"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useHandlers = useHandlers;

var _react = require("react");

var _utilities = require("../../../utilities.js");

var _index = require("../utils/index.js");

var _index2 = require("./index.js");

function useHandlers(state, dispatch, validationConfigs) {
  return (0, _react.useMemo)(function () {
    return state.list.map(function (item, index) {
      return (0, _utilities.mapObject)(item, function (field, key) {
        var target = {
          index: index,
          key: key
        };

        function validate() {
          var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : field.value;
          var validates = validationConfigs[key];

          if (validates == null) {
            return;
          }

          var siblings = state.list.filter(function (listItem) {
            return listItem !== item;
          });
          return (0, _index.runValidation)(function (error) {
            return dispatch((0, _index2.updateErrorAction)({
              target: target,
              error: error || ''
            }));
          }, {
            value: value,
            siblings: siblings,
            listItem: item
          }, validates);
        }

        return {
          onChange: function onChange(value) {
            var normalizedValue = (0, _utilities.isChangeEvent)(value) ? value.target.value : value;
            dispatch((0, _index2.updateAction)({
              target: target,
              value: normalizedValue
            }));

            if (field.error) {
              validate(normalizedValue);
            }
          },
          reset: function reset() {
            dispatch((0, _index2.resetAction)({
              target: target
            }));
          },
          newDefaultValue: function newDefaultValue(value) {
            dispatch((0, _index2.newDefaultAction)({
              target: target,
              value: value
            }));
          },
          runValidation: validate,
          onBlur: function onBlur() {
            var touched = field.touched,
                error = field.error;

            if (touched === false && error == null) {
              return;
            }

            validate();
          },
          setError: function setError(error) {
            dispatch((0, _index2.updateErrorAction)({
              target: target,
              error: error
            }));
          }
        };
      });
    });
  }, [dispatch, state.list, validationConfigs]);
}