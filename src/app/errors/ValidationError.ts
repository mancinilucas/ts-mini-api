export class ValidationError extends Error {
  public readonly statusCode = 400;
  public readonly details: string[];

  constructor(details: string[]) {
    super("Validation Error");
    this.details = details;
  }
}
