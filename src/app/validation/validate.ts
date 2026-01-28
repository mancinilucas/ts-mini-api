import { ValidationError } from "../errors/ValidationError";

type Validator<T> = (value: T) => string | null;

export function validate<T>(value: T, validators: Validator<T>[]): void {
  const errors = validators
    .map((validator) => validator(value))
    .filter((error): error is string => error !== null);

  if (errors.length > 0) {
    throw new ValidationError(errors);
  }
}
