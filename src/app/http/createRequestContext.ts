import { IncomingMessage } from "http";
import { parseUrl } from "./parseUrl";
import { parseBody } from "./parseBody";
import type { RequestContext } from "./RequestContext";

export async function createRequestContext(
  req: IncomingMessage,
): Promise<RequestContext> {
  const { pathname, query } = parseUrl(req.url, req.headers.host);

  const body =
    req.method === "POST" || req.method === "PUT"
      ? await parseBody(req)
      : undefined;

  return {
    method: req.method ?? "UNKNOWN",
    pathname,
    query,
    body,
  };
}
