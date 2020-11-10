"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var utilities_1 = require("../utilities");
function useVisitFields(fieldBag, visitor) {
    var fieldBagRef = react_1.useRef(fieldBag);
    fieldBagRef.current = fieldBag;
    return react_1.useCallback(function () {
        utilities_1.reduceFields(fieldBagRef.current, function (_, field) { return visitor(field); });
    }, [visitor]);
}
exports.default = useVisitFields;
