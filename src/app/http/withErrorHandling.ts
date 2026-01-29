import type { RequestContext } from "./RequestContext";
import { ValidationError } from "../errors/ValidationError";
import { NotFoundError } from "../errors/NotFoundError";

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
          error: error.message,
          details: error.details,
        },
        error.statusCode,
      );
      return;
    }

    if (error instanceof NotFoundError) {
      context.json({ error: error.message }, error.statusCode);
      return;
    }

    context.json({ error: "Internal Server Error" }, 500);
  }
}
