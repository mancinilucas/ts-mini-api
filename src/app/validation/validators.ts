export function isRequired(value: unknown): string | null {
  if (value === undefined || value === null) {
    return "Value is required";
  }
  return null;
}

export function isString(value: unknown): string | null {
  if (typeof value !== "string") {
    return "Value must be a string";
  }
  return null;
}

export function minLength(min: number) {
  return (value: string): string | null => {
    if (value.length < min) {
      return `Minimum length is ${min}`;
    }
    return null;
  };
}
