import useVisitFields from "./visitFields.mjs";
export function useReset(fieldBag) {
  return useVisitFields(fieldBag, resetField);
}

function resetField(field) {
  field.reset();
}