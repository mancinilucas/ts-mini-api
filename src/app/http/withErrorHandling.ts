import type { RequestContext } from "./RequestContext";

export async function withErrorHandling(
  handler: (context: RequestContext) => Promise<unknown> | unknown,
  context: RequestContext,
) {
  try {
    const result = await handler(context);

    if (context.res.writableEnded) return;

    context.res.statusCode = 200;
    context.res.setHeader("Content-Type", "application/json");
    context.res.end(JSON.stringify(result ?? null));
  } catch (error) {
    console.error(error);

    if (context.res.writableEnded) return;

    context.res.statusCode = 500;
    context.res.setHeader("Content-Type", "application/json");
    context.res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
}
