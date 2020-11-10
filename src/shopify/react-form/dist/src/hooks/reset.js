"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var visitFields_1 = tslib_1.__importDefault(require("./visitFields"));
function useReset(fieldBag) {
    return visitFields_1.default(fieldBag, resetField);
}
exports.useReset = useReset;
function resetField(field) {
    field.reset();
}
