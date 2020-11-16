"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var faker_1 = tslib_1.__importDefault(require("faker"));
var react_1 = tslib_1.__importDefault(require("react"));
function TextField(_a) {
    var name = _a.name, label = _a.label, onChange = _a.onChange, onBlur = _a.onBlur, value = _a.value, error = _a.error;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("label", { htmlFor: name },
            label,
            react_1.default.createElement("input", { id: name, name: name, value: value, onChange: onChange, onBlur: onBlur })),
        error && react_1.default.createElement("p", null, error)));
}
exports.TextField = TextField;
function randomVariants(number) {
    return Array.from({ length: number }).map(function () { return ({
        price: faker_1.default.commerce.price(),
        optionName: 'material',
        optionValue: faker_1.default.commerce.productMaterial(),
    }); });
}
exports.randomVariants = randomVariants;
function changeEvent(value) {
    return { target: { value: value } };
}
exports.changeEvent = changeEvent;
function alwaysFail(value) {
    return "I AM ERROR FOR {" + value + "}";
}
exports.alwaysFail = alwaysFail;
function clickEvent() {
    // we don't actually use these at all so it is ok to just return an empty object
    return {};
}
exports.clickEvent = clickEvent;
