"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = require("react");
var utilities_1 = require("../../utilities");
function updateAction(value) {
    return {
        type: 'update',
        payload: value,
    };
}
exports.updateAction = updateAction;
function resetAction() {
    return {
        type: 'reset',
    };
}
exports.resetAction = resetAction;
function newDefaultAction(value) {
    return {
        type: 'newDefaultValue',
        payload: value,
    };
}
exports.newDefaultAction = newDefaultAction;
function updateErrorAction(error) {
    return {
        type: 'updateError',
        payload: error,
    };
}
exports.updateErrorAction = updateErrorAction;
var shallowFieldReducer = makeFieldReducer({
    dirtyStateComparator: utilities_1.defaultDirtyComparator,
});
function reduceField(prevState, action) {
    return shallowFieldReducer(prevState, action);
}
exports.reduceField = reduceField;
function makeFieldReducer(_a) {
    var _b = _a.dirtyStateComparator, dirtyStateComparator = _b === void 0 ? utilities_1.defaultDirtyComparator : _b;
    return function (state, action) {
        switch (action.type) {
            case 'update': {
                var newValue = action.payload;
                var defaultValue = state.defaultValue;
                var dirty = dirtyStateComparator(defaultValue, newValue);
                return tslib_1.__assign(tslib_1.__assign({}, state), { dirty: dirty, value: newValue, touched: true });
            }
            case 'updateError': {
                var payload = Array.isArray(action.payload)
                    ? action.payload
                    : [action.payload];
                var _a = tslib_1.__read(payload, 1), firstError = _a[0];
                var allErrors = firstError ? payload : [];
                if (utilities_1.shallowArrayComparison(allErrors, state.allErrors)) {
                    return tslib_1.__assign(tslib_1.__assign({}, state), { error: firstError });
                }
                else {
                    return tslib_1.__assign(tslib_1.__assign({}, state), { error: firstError, allErrors: allErrors });
                }
            }
            case 'reset': {
                var defaultValue = state.defaultValue;
                return tslib_1.__assign(tslib_1.__assign({}, state), { error: undefined, value: defaultValue, dirty: false, touched: false, allErrors: [] });
            }
            case 'newDefaultValue': {
                var newDefaultValue = action.payload;
                return tslib_1.__assign(tslib_1.__assign({}, state), { error: undefined, value: newDefaultValue, defaultValue: newDefaultValue, touched: false, dirty: false });
            }
        }
    };
}
exports.makeFieldReducer = makeFieldReducer;
function useFieldReducer(value, dirtyStateComparator) {
    return react_1.useReducer(makeFieldReducer({ dirtyStateComparator: dirtyStateComparator }), initialFieldState(value));
}
exports.useFieldReducer = useFieldReducer;
function initialFieldState(value) {
    return {
        value: value,
        defaultValue: value,
        error: undefined,
        touched: false,
        dirty: false,
        allErrors: [],
    };
}
exports.initialFieldState = initialFieldState;
