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
  return (0, _react.useMemo)(() => {
    return state.list.map((item, index) => {
      return (0, _utilities.mapObject)(item, (field, key) => {
        const target = {
          index,
          key
        };

        function validate(value = field.value) {
          const validates = validationConfigs[key];

          if (validates == null) {
            return;
          }

          const siblings = state.list.filter(listItem => listItem !== item);
          return (0, _index.runValidation)(error => dispatch((0, _index2.updateErrorAction)({
            target,
            error: error || ''
          })), {
            value,
            siblings,
            listItem: item
          }, validates);
        }

        return {
          onChange(value) {
            const normalizedValue = (0, _utilities.isChangeEvent)(value) ? value.target.value : value;
            dispatch((0, _index2.updateAction)({
              target,
              value: normalizedValue
            }));

            if (field.error) {
              validate(normalizedValue);
            }
          },

          reset() {
            dispatch((0, _index2.resetAction)({
              target
            }));
          },

          newDefaultValue(value) {
            dispatch((0, _index2.newDefaultAction)({
              target,
              value
            }));
          },

          runValidation: validate,

          onBlur() {
            const {
              touched,
              error
            } = field;

            if (touched === false && error == null) {
              return;
            }

            validate();
          },

          setError(error) {
            dispatch((0, _index2.updateErrorAction)({
              target,
              error
            }));
          }

        };
      });
    });
  }, [dispatch, state.list, validationConfigs]);
}