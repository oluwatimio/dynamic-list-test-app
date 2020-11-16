"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var baselist_1 = require("./baselist");
function useDynamicList(listOrConfig, fieldFactory, validationDependencies) {
    if (validationDependencies === void 0) { validationDependencies = []; }
    var _a = baselist_1.useBaseList(listOrConfig, validationDependencies), fields = _a.fields, dispatch = _a.dispatch;
    function addItem() {
        dispatch(utils_1.addFieldsAction([fieldFactory()]));
    }
    function removeItem(index) {
        dispatch(utils_1.removeFieldsAction(index));
    }
    return { fields: fields, addItem: addItem, removeItem: removeItem };
}
exports.useDynamicList = useDynamicList;
