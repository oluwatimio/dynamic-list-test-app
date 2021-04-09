import * as predicates from '@shopify/predicates';
import { validator } from "./validator.mjs";
export function lengthMoreThan(length, error) {
  return validator(predicates.lengthMoreThan(length))(error);
}
export function lengthLessThan(length, error) {
  return validator(predicates.lengthLessThan(length))(error);
}
export function notEmpty(error) {
  return validator(predicates.notEmpty, {
    skipOnEmpty: false
  })(error);
}
export function notEmptyString(error) {
  return validator(predicates.notEmptyString, {
    skipOnEmpty: false
  })(error);
}
export function positiveIntegerString(error) {
  return validator(predicates.isPositiveIntegerString)(error);
}
export function positiveNumericString(error) {
  return validator(predicates.isPositiveNumericString)(error);
}
export function numericString(error) {
  return validator(predicates.isNumericString)(error);
}