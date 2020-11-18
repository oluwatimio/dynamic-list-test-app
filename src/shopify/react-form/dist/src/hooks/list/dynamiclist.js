"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hooks_1 = require("./hooks");
var baselist_1 = require("./baselist");
/*
  A custom hook for dynamically adding and removing field items. This utilizes the base functionality of useBaseList.

* @param listOrConfig - A configuration object specifying both the value and validation config.
* @param fieldFactory - A factory function that produces field items according to the list items originally passed in for listOrConfig.
* @param validationDependencies - An array of dependencies to use to decide when to regenerate validators.
* @returns A list of dictionaries of `Field` objects representing the state of your input, an addItem function for adding list items (this calls your factory), and a removeItem function for removing list items by index.
*/
function useDynamicList(listOrConfig, fieldFactory, validationDependencies) {
    if (validationDependencies === void 0) { validationDependencies = []; }
    var _a = baselist_1.useBaseList(listOrConfig, validationDependencies), fields = _a.fields, dispatch = _a.dispatch;
    function addItem(factoryArgument) {
        var itemToAdd = fieldFactory(factoryArgument);
        if (Array.isArray(itemToAdd)) {
            dispatch(hooks_1.addFieldItemAction(itemToAdd));
        }
        else {
            dispatch(hooks_1.addFieldItemAction([itemToAdd]));
        }
    }
    function removeItem(index) {
        dispatch(hooks_1.removeFieldItemAction(index));
    }
    return { fields: fields, addItem: addItem, removeItem: removeItem };
}
exports.useDynamicList = useDynamicList;
