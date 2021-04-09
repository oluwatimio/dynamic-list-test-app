"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDynamicList = useDynamicList;

var _index = require("./hooks/index.js");

var _baselist = require("./baselist.js");

/*
  A custom hook for dynamically adding and removing field items. This utilizes the base functionality of useBaseList.

* @param listOrConfig - A configuration object specifying both the value and validation config.
* @param fieldFactory - A factory function that produces field items according to the list items originally passed in for listOrConfig.
* @param validationDependencies - An array of dependencies to use to decide when to regenerate validators.
* @returns A list of dictionaries of `Field` objects representing the state of your input, an addItem function for adding list items (this calls your factory), and a removeItem function for removing list items by index.
*/
function useDynamicList(listOrConfig, fieldFactory) {
  var validationDependencies = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  var _useBaseList = (0, _baselist.useBaseList)(listOrConfig, validationDependencies),
      fields = _useBaseList.fields,
      dispatch = _useBaseList.dispatch;

  function addItem(factoryArgument) {
    var itemToAdd = fieldFactory(factoryArgument);

    if (Array.isArray(itemToAdd)) {
      dispatch((0, _index.addFieldItemAction)(itemToAdd));
    } else {
      dispatch((0, _index.addFieldItemAction)([itemToAdd]));
    }
  }

  function moveItem(fromIndex, toIndex) {
    dispatch((0, _index.moveFieldItemAction)(fromIndex, toIndex));
  }

  function removeItem(index) {
    dispatch((0, _index.removeFieldItemAction)(index));
  }

  function resetList() {
    dispatch((0, _index.resetListAction)());
  }

  return {
    fields: fields,
    addItem: addItem,
    removeItem: removeItem,
    moveItem: moveItem,
    resetList: resetList
  };
}