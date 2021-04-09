import { useCallback, useRef } from 'react';
import { reduceFields } from "../utilities.mjs";
export default function useVisitFields(fieldBag, visitor) {
  var fieldBagRef = useRef(fieldBag);
  fieldBagRef.current = fieldBag;
  return useCallback(function () {
    reduceFields(fieldBagRef.current, function (_, field) {
      return visitor(field);
    });
  }, [visitor]);
}