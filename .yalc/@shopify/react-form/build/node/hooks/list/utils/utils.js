"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runValidation = runValidation;

function runValidation(updateError, state, validators) {
  const {
    value,
    listItem,
    siblings
  } = state;
  const error = validators.map(check => check(value, {
    listItem,
    siblings
  })).filter(value => value != null);

  if (error && error.length > 0) {
    const [firstError] = error;
    updateError(firstError);
    return firstError;
  }

  updateError(undefined);
}