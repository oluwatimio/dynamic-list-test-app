"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reinitializeAction = reinitializeAction;
exports.addFieldItemAction = addFieldItemAction;
exports.moveFieldItemAction = moveFieldItemAction;
exports.removeFieldItemAction = removeFieldItemAction;
exports.updateAction = updateAction;
exports.resetAction = resetAction;
exports.resetListAction = resetListAction;
exports.newDefaultAction = newDefaultAction;
exports.updateErrorAction = updateErrorAction;
exports.useListReducer = useListReducer;

var _react = require("react");

var _index = require("../../field/index.js");

var _utilities = require("../../../utilities.js");

function reinitializeAction(list) {
  return {
    type: 'reinitialize',
    payload: {
      list
    }
  };
}

function addFieldItemAction(list) {
  return {
    type: 'addFieldItem',
    payload: {
      list
    }
  };
}

function moveFieldItemAction(fromIndex, toIndex) {
  return {
    type: 'moveFieldItem',
    payload: {
      fromIndex,
      toIndex
    }
  };
}

function removeFieldItemAction(indexToRemove) {
  return {
    type: 'removeFieldItem',
    payload: {
      indexToRemove
    }
  };
}

function updateAction(payload) {
  return {
    type: 'update',
    payload
  };
}

function resetAction(payload) {
  return {
    type: 'reset',
    payload
  };
}

function resetListAction() {
  return {
    type: 'resetList'
  };
}

function newDefaultAction(payload) {
  return {
    type: 'newDefaultValue',
    payload
  };
}

function updateErrorAction(payload) {
  return {
    type: 'updateError',
    payload
  };
}

function useListReducer(initial) {
  return (0, _react.useReducer)(reduceList, {
    list: initial.map(initialListItemState),
    initial
  });
}

function reduceList(state, action) {
  switch (action.type) {
    case 'reinitialize':
      {
        return {
          initial: action.payload.list,
          list: action.payload.list.map(initialListItemState)
        };
      }

    case 'moveFieldItem':
      {
        const {
          fromIndex,
          toIndex
        } = action.payload;

        if (fromIndex >= state.list.length || fromIndex < 0 || toIndex >= state.list.length || toIndex < 0) {
          throw new Error(`Failed to move item from ${fromIndex} to ${toIndex}`);
        }

        const newList = [...state.list];
        const [item] = newList.splice(action.payload.fromIndex, 1);
        newList.splice(action.payload.toIndex, 0, item);
        return { ...state,
          list: newList
        };
      }

    case 'addFieldItem':
      {
        return { ...state,
          list: [...state.list, ...action.payload.list.map(initialListItemState)]
        };
      }

    case 'removeFieldItem':
      {
        const newList = [...state.list];
        newList.splice(action.payload.indexToRemove, 1);
        return { ...state,
          list: newList
        };
      }

    case 'updateError':
      {
        const {
          payload: {
            target,
            error
          }
        } = action;
        const {
          index,
          key
        } = target;
        const currentItem = state.list[index];
        currentItem[key] = (0, _index.reduceField)(currentItem[key], (0, _index.updateErrorAction)(error));
        return { ...state,
          list: [...state.list]
        };
      }

    case 'reset':
      {
        const {
          payload: {
            target
          }
        } = action;
        const {
          index,
          key
        } = target;
        const currentItem = state.list[index];
        currentItem[key] = (0, _index.reduceField)(currentItem[key], {
          type: 'reset'
        });
        return { ...state,
          list: [...state.list]
        };
      }

    case 'resetList':
      {
        return { ...state,
          list: state.initial.map(initialListItemState)
        };
      }

    case 'update':
    case 'newDefaultValue':
      {
        const {
          payload: {
            target,
            value
          }
        } = action;
        const {
          index,
          key
        } = target;
        const currentItem = state.list[index];
        currentItem[key] = (0, _index.reduceField)(currentItem[key], {
          type: action.type,
          payload: value
        });
        return { ...state,
          list: [...state.list]
        };
      }
  }
}

function initialListItemState(item) {
  return (0, _utilities.mapObject)(item, _index.initialFieldState);
}