"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useBaseList = useBaseList;

var _react = require("react");

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _utilities = require("../../utilities.js");

var _index = require("./hooks/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useBaseList(listOrConfig, validationDependencies = []) {
  const list = Array.isArray(listOrConfig) ? listOrConfig : listOrConfig.list;
  const validates = Array.isArray(listOrConfig) ? {} : listOrConfig.validates || {};
  const [state, dispatch] = (0, _index.useListReducer)(list);
  (0, _react.useEffect)(() => {
    if (!(0, _fastDeepEqual.default)(list, state.initial)) {
      dispatch((0, _index.reinitializeAction)(list));
    }
  }, [list, state.initial, dispatch]);
  const validationConfigs = (0, _react.useMemo)(() => (0, _utilities.mapObject)(validates, _utilities.normalizeValidation), // eslint-disable-next-line react-hooks/exhaustive-deps
  [validates, ...validationDependencies]);
  const handlers = (0, _index.useHandlers)(state, dispatch, validationConfigs);
  const fields = (0, _react.useMemo)(() => {
    return state.list.map((item, index) => {
      return (0, _utilities.mapObject)(item, (field, key) => {
        return { ...field,
          ...handlers[index][key]
        };
      });
    });
  }, [state.list, handlers]);

  const equals = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]); // dirty: equals(state.initial, state.list


  return {
    fields,
    dispatch
  };
}