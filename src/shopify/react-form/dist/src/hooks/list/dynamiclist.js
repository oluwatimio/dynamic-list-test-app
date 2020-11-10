"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = require("react");
var fast_deep_equal_1 = tslib_1.__importDefault(require("fast-deep-equal"));
var utilities_1 = require("../../utilities");
var reducer_1 = require("./reducer");
var hooks_1 = require("./hooks/");
function useDynamicList(listOrConfig, fieldFactory, validationDependencies) {
    if (validationDependencies === void 0) { validationDependencies = []; }
    var calculatedList = Array.isArray(listOrConfig)
        ? listOrConfig
        : listOrConfig.list;
    var validates = Array.isArray(listOrConfig)
        ? {}
        : listOrConfig.validates || {};
    // const [calculatedList] = useState<Item[]>(initialList);
    var _a = tslib_1.__read(reducer_1.useListReducer(calculatedList), 2), state = _a[0], dispatch = _a[1];
    react_1.useEffect(function () {
        if (!fast_deep_equal_1.default(calculatedList, state.initial)) {
            dispatch(reducer_1.reinitializeAction(calculatedList));
        }
    }, [calculatedList, state.initial, dispatch]);
    var validationConfigs = react_1.useMemo(function () {
        return utilities_1.mapObject(validates, utilities_1.normalizeValidation);
    }, tslib_1.__spread([validates], validationDependencies));
    function addField() {
        dispatch(reducer_1.addFieldsAction([fieldFactory()]));
    }
    function removeField(index) {
        dispatch(reducer_1.removeFieldsAction(index));
    }
    var handlers = hooks_1.useHandlers(state, dispatch, validationConfigs);
    var fields = react_1.useMemo(function () {
        return state.list.map(function (item, index) {
            return utilities_1.mapObject(item, function (field, key) {
                return tslib_1.__assign(tslib_1.__assign({}, field), handlers[index][key]);
            });
        });
    }, [state.list, handlers]);
    return { fields: fields, addField: addField, removeField: removeField };
}
exports.useDynamicList = useDynamicList;
