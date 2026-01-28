import type { RequestContext } from "./RequestContext";
import { ValidationError } from "../errors/ValidationError";

export async function withErrorHandling(
  handler: (context: RequestContext) => Promise<unknown> | unknown,
  context: RequestContext,
) {
  try {
    await handler(context);
  } catch (error) {
    if (error instanceof ValidationError) {
      context.json(
        {
          error: "Validation Error",
          details: error.details,
        },
        error.statusCode,
      );
      return;
    }
    context.json(
      {
        error: "Internal Server Error",
      },
      500,
    );
  }
}
