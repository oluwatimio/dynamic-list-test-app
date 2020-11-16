"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = require("react");
var field_1 = require("../../field");
var utilities_1 = require("../../../utilities");
function reinitializeAction(list) {
    return {
        type: 'reinitialize',
        payload: { list: list },
    };
}
exports.reinitializeAction = reinitializeAction;
function addFieldsAction(list) {
    return {
        type: 'addFields',
        payload: { list: list },
    };
}
exports.addFieldsAction = addFieldsAction;
function removeFieldsAction(indexToRemove) {
    return {
        type: 'removeFields',
        payload: { indexToRemove: indexToRemove },
    };
}
exports.removeFieldsAction = removeFieldsAction;
function updateAction(payload) {
    return {
        type: 'update',
        payload: payload,
    };
}
exports.updateAction = updateAction;
function resetAction(payload) {
    return {
        type: 'reset',
        payload: payload,
    };
}
exports.resetAction = resetAction;
function newDefaultAction(payload) {
    return {
        type: 'newDefaultValue',
        payload: payload,
    };
}
exports.newDefaultAction = newDefaultAction;
function updateErrorAction(payload) {
    return {
        type: 'updateError',
        payload: payload,
    };
}
exports.updateErrorAction = updateErrorAction;
function useListReducer(initial) {
    return react_1.useReducer(reduceList, {
        list: initial.map(initialListItemState),
        initial: initial,
    });
}
exports.useListReducer = useListReducer;
function reduceList(state, action) {
    switch (action.type) {
        case 'reinitialize': {
            return {
                initial: action.payload.list,
                list: action.payload.list.map(initialListItemState),
            };
        }
        case 'addFields': {
            return tslib_1.__assign(tslib_1.__assign({}, state), { list: tslib_1.__spread(state.list, action.payload.list.map(initialListItemState)) });
        }
        case 'removeFields': {
            var newList = tslib_1.__spread(state.list);
            newList.splice(action.payload.indexToRemove, 1);
            return tslib_1.__assign(tslib_1.__assign({}, state), { list: newList });
        }
        case 'updateError': {
            var _a = action.payload, target = _a.target, error = _a.error;
            var index = target.index, key = target.key;
            var currentItem = state.list[index];
            currentItem[key] = field_1.reduceField(currentItem[key], field_1.updateErrorAction(error));
            return tslib_1.__assign(tslib_1.__assign({}, state), { list: tslib_1.__spread(state.list) });
        }
        case 'reset': {
            var target = action.payload.target;
            var index = target.index, key = target.key;
            var currentItem = state.list[index];
            currentItem[key] = field_1.reduceField(currentItem[key], { type: 'reset' });
            return tslib_1.__assign(tslib_1.__assign({}, state), { list: tslib_1.__spread(state.list) });
        }
        case 'update':
        case 'newDefaultValue': {
            var _b = action.payload, target = _b.target, value = _b.value;
            var index = target.index, key = target.key;
            var currentItem = state.list[index];
            currentItem[key] = field_1.reduceField(currentItem[key], {
                type: action.type,
                payload: value,
            });
            return tslib_1.__assign(tslib_1.__assign({}, state), { list: tslib_1.__spread(state.list) });
        }
    }
}
function initialListItemState(item) {
    return utilities_1.mapObject(item, field_1.initialFieldState);
}
