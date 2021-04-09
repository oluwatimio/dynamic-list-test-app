function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import { useReducer } from 'react';
import { reduceField, updateErrorAction as updateFieldError, initialFieldState } from "../../field/index.mjs";
import { mapObject } from "../../../utilities.mjs";
export function reinitializeAction(list) {
  return {
    type: 'reinitialize',
    payload: {
      list: list
    }
  };
}
export function addFieldItemAction(list) {
  return {
    type: 'addFieldItem',
    payload: {
      list: list
    }
  };
}
export function moveFieldItemAction(fromIndex, toIndex) {
  return {
    type: 'moveFieldItem',
    payload: {
      fromIndex: fromIndex,
      toIndex: toIndex
    }
  };
}
export function removeFieldItemAction(indexToRemove) {
  return {
    type: 'removeFieldItem',
    payload: {
      indexToRemove: indexToRemove
    }
  };
}
export function updateAction(payload) {
  return {
    type: 'update',
    payload: payload
  };
}
export function resetAction(payload) {
  return {
    type: 'reset',
    payload: payload
  };
}
export function resetListAction() {
  return {
    type: 'resetList'
  };
}
export function newDefaultAction(payload) {
  return {
    type: 'newDefaultValue',
    payload: payload
  };
}
export function updateErrorAction(payload) {
  return {
    type: 'updateError',
    payload: payload
  };
}
export function useListReducer(initial) {
  return useReducer(reduceList, {
    list: initial.map(initialListItemState),
    initial: initial
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
        var _action$payload = action.payload,
            fromIndex = _action$payload.fromIndex,
            toIndex = _action$payload.toIndex;

        if (fromIndex >= state.list.length || fromIndex < 0 || toIndex >= state.list.length || toIndex < 0) {
          throw new Error("Failed to move item from ".concat(fromIndex, " to ").concat(toIndex));
        }

        var newList = _toConsumableArray(state.list);

        var _newList$splice = newList.splice(action.payload.fromIndex, 1),
            _newList$splice2 = _slicedToArray(_newList$splice, 1),
            item = _newList$splice2[0];

        newList.splice(action.payload.toIndex, 0, item);
        return _objectSpread(_objectSpread({}, state), {}, {
          list: newList
        });
      }

    case 'addFieldItem':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          list: [].concat(_toConsumableArray(state.list), _toConsumableArray(action.payload.list.map(initialListItemState)))
        });
      }

    case 'removeFieldItem':
      {
        var _newList = _toConsumableArray(state.list);

        _newList.splice(action.payload.indexToRemove, 1);

        return _objectSpread(_objectSpread({}, state), {}, {
          list: _newList
        });
      }

    case 'updateError':
      {
        var _action$payload2 = action.payload,
            target = _action$payload2.target,
            error = _action$payload2.error;
        var index = target.index,
            key = target.key;
        var currentItem = state.list[index];
        currentItem[key] = reduceField(currentItem[key], updateFieldError(error));
        return _objectSpread(_objectSpread({}, state), {}, {
          list: _toConsumableArray(state.list)
        });
      }

    case 'reset':
      {
        var _target = action.payload.target;
        var _index = _target.index,
            _key = _target.key;
        var _currentItem = state.list[_index];
        _currentItem[_key] = reduceField(_currentItem[_key], {
          type: 'reset'
        });
        return _objectSpread(_objectSpread({}, state), {}, {
          list: _toConsumableArray(state.list)
        });
      }

    case 'resetList':
      {
        return _objectSpread(_objectSpread({}, state), {}, {
          list: state.initial.map(initialListItemState)
        });
      }

    case 'update':
    case 'newDefaultValue':
      {
        var _action$payload3 = action.payload,
            _target2 = _action$payload3.target,
            value = _action$payload3.value;
        var _index2 = _target2.index,
            _key2 = _target2.key;
        var _currentItem2 = state.list[_index2];
        _currentItem2[_key2] = reduceField(_currentItem2[_key2], {
          type: action.type,
          payload: value
        });
        return _objectSpread(_objectSpread({}, state), {}, {
          list: _toConsumableArray(state.list)
        });
      }
  }
}

function initialListItemState(item) {
  return mapObject(item, initialFieldState);
}