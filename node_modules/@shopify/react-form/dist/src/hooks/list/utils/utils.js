"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
function runValidation(updateError, state, validators) {
    var value = state.value, listItem = state.listItem, siblings = state.siblings;
    var error = validators
        .map(function (check) {
        return check(value, {
            listItem: listItem,
            siblings: siblings,
        });
    })
        .filter(function (value) { return value != null; });
    if (error && error.length > 0) {
        var _a = tslib_1.__read(error, 1), firstError = _a[0];
        updateError(firstError);
        return firstError;
    }
    updateError(undefined);
}
exports.runValidation = runValidation;
