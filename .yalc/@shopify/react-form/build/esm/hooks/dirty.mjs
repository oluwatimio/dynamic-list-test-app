import { reduceFields } from "../utilities.mjs";
export function useDirty(fieldBag) {
  return reduceFields(fieldBag, function (dirty, field) {
    return dirty || field.dirty;
  }, false);
}