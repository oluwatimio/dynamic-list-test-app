"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = require("react");
var fast_deep_equal_1 = tslib_1.__importDefault(require("fast-deep-equal"));
var utilities_1 = require("../../utilities");
var utils_1 = require("./utils");
var hooks_1 = require("./hooks");
function useBaseList(listOrConfig, validationDependencies) {
    if (validationDependencies === void 0) { validationDependencies = []; }
    var list = Array.isArray(listOrConfig) ? listOrConfig : listOrConfig.list;
    var validates = Array.isArray(listOrConfig)
        ? {}
        : listOrConfig.validates || {};
    var _a = tslib_1.__read(utils_1.useListReducer(list), 2), state = _a[0], dispatch = _a[1];
    react_1.useEffect(function () {
        if (!fast_deep_equal_1.default(list, state.initial)) {
            dispatch(utils_1.reinitializeAction(list));
        }
    }, [list, state.initial, dispatch]);
    var validationConfigs = react_1.useMemo(function () {
        return utilities_1.mapObject(validates, utilities_1.normalizeValidation);
    }, tslib_1.__spread([validates], validationDependencies));
    var handlers = hooks_1.useHandlers(state, dispatch, validationConfigs);
    var fields = react_1.useMemo(function () {
        return state.list.map(function (item, index) {
            return utilities_1.mapObject(item, function (field, key) {
                return tslib_1.__assign(tslib_1.__assign({}, field), handlers[index][key]);
            });
        });
    }, [state.list, handlers]);
    return { fields: fields, dispatch: dispatch };
}
exports.useBaseList = useBaseList;
