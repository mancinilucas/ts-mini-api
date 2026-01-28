import type { RequestContext } from "./RequestContext";

export type Handler<TResponse = unknown> = (
  context: RequestContext,
) => Promise<TResponse> | TResponse;
