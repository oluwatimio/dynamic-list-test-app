"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var utilities_1 = require("../../../utilities");
var reducer_1 = require("../reducer");
var utils_1 = require("../utils");
function useHandlers(state, dispatch, validationConfigs) {
    return react_1.useMemo(function () {
        return state.list.map(function (item, index) {
            return utilities_1.mapObject(item, function (field, key) {
                var target = { index: index, key: key };
                function validate(value) {
                    if (value === void 0) { value = field.value; }
                    var validates = validationConfigs[key];
                    if (validates == null) {
                        return;
                    }
                    var siblings = state.list.filter(function (listItem) { return listItem !== item; });
                    return utils_1.runValidation(function (error) {
                        return dispatch(reducer_1.updateErrorAction({ target: target, error: error || '' }));
                    }, { value: value, siblings: siblings, listItem: item }, validates);
                }
                return {
                    onChange: function (value) {
                        var normalizedValue = (utilities_1.isChangeEvent(value)
                            ? value.target.value
                            : value);
                        dispatch(reducer_1.updateAction({
                            target: target,
                            value: normalizedValue,
                        }));
                        if (field.error) {
                            validate(normalizedValue);
                        }
                    },
                    reset: function () {
                        dispatch(reducer_1.resetAction({ target: target }));
                    },
                    newDefaultValue: function (value) {
                        dispatch(reducer_1.newDefaultAction({ target: target, value: value }));
                    },
                    runValidation: validate,
                    onBlur: function () {
                        var touched = field.touched, error = field.error;
                        if (touched === false && error == null) {
                            return;
                        }
                        validate();
                    },
                    setError: function (error) {
                        dispatch(reducer_1.updateErrorAction({ target: target, error: error }));
                    },
                };
            });
        });
    }, [dispatch, state.list, validationConfigs]);
}
exports.useHandlers = useHandlers;
