import { useMemo } from 'react';
import { mapObject, isChangeEvent } from "../../../utilities.mjs";
import { runValidation } from "../utils/index.mjs";
import { updateAction, updateErrorAction, newDefaultAction, resetAction } from "./index.mjs";
export function useHandlers(state, dispatch, validationConfigs) {
  return useMemo(function () {
    return state.list.map(function (item, index) {
      return mapObject(item, function (field, key) {
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
          return runValidation(function (error) {
            return dispatch(updateErrorAction({
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
            var normalizedValue = isChangeEvent(value) ? value.target.value : value;
            dispatch(updateAction({
              target: target,
              value: normalizedValue
            }));

            if (field.error) {
              validate(normalizedValue);
            }
          },
          reset: function reset() {
            dispatch(resetAction({
              target: target
            }));
          },
          newDefaultValue: function newDefaultValue(value) {
            dispatch(newDefaultAction({
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
            dispatch(updateErrorAction({
              target: target,
              error: error
            }));
          }
        };
      });
    });
  }, [dispatch, state.list, validationConfigs]);
}