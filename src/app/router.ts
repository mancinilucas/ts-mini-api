import { parseUrl } from "./http/parseUrl";
import { routes } from "./routes";
import { IncomingMessage, ServerResponse } from "http";
import { withErrorHandling } from "./http/withErrorHandling";
import type { RequestContext } from "./http/RequestContext";
import { createRequestContext } from "./http/createRequestContext";
import { parseBody } from "./http/parseBody";

interface Route {
  method: string;
  path: string;
  handler: (context: RequestContext) => unknown;
}

export async function router(req: IncomingMessage, res: ServerResponse) {
  const { method } = req;
  const { pathname, query } = parseUrl(req.url, req.headers.host);

  const route = routes.find(
    (r: Route) => r.method === method && r.path === pathname,
  );

  if (!route) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Not Found" }));
    return;
  }

  const body = await parseBody(req);

  const context: RequestContext = {
    req,
    res,
    method: method ?? "GET",
    pathname,
    query,
    body,
    headers: req.headers,
  };

  await withErrorHandling(route.handler, context);
}
