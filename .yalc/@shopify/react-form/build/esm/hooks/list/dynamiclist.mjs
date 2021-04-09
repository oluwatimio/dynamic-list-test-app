import { addFieldItemAction, removeFieldItemAction, moveFieldItemAction, resetListAction } from "./hooks/index.mjs";
import { useBaseList } from "./baselist.mjs";

/*
  A custom hook for dynamically adding and removing field items. This utilizes the base functionality of useBaseList.

* @param listOrConfig - A configuration object specifying both the value and validation config.
* @param fieldFactory - A factory function that produces field items according to the list items originally passed in for listOrConfig.
* @param validationDependencies - An array of dependencies to use to decide when to regenerate validators.
* @returns A list of dictionaries of `Field` objects representing the state of your input, an addItem function for adding list items (this calls your factory), and a removeItem function for removing list items by index.
*/
export function useDynamicList(listOrConfig, fieldFactory) {
  var validationDependencies = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  var _useBaseList = useBaseList(listOrConfig, validationDependencies),
      fields = _useBaseList.fields,
      dispatch = _useBaseList.dispatch;

  function addItem(factoryArgument) {
    var itemToAdd = fieldFactory(factoryArgument);

    if (Array.isArray(itemToAdd)) {
      dispatch(addFieldItemAction(itemToAdd));
    } else {
      dispatch(addFieldItemAction([itemToAdd]));
    }
  }

  function moveItem(fromIndex, toIndex) {
    dispatch(moveFieldItemAction(fromIndex, toIndex));
  }

  function removeItem(index) {
    dispatch(removeFieldItemAction(index));
  }

  function resetList() {
    dispatch(resetListAction());
  }

  return {
    fields: fields,
    addItem: addItem,
    removeItem: removeItem,
    moveItem: moveItem,
    resetList: resetList
  };
}