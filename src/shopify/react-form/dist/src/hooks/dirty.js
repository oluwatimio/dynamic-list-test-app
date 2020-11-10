"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilities_1 = require("../utilities");
function useDirty(fieldBag) {
    return utilities_1.reduceFields(fieldBag, function (dirty, field) { return dirty || field.dirty; }, false);
}
exports.useDirty = useDirty;
