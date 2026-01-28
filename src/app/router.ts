import { parseUrl } from "./http/parseUrl";
import { routes } from "./routes";
import { IncomingMessage, ServerResponse } from "http";
import { withErrorHandling } from "./http/withErrorHandling";
import type { RequestContext } from "./http/RequestContext";
import { parseBody } from "./http/parseBody";
import { matchRoute } from "./http/matchRoute";

interface Route {
  method: string;
  path: string;
  handler: (context: RequestContext) => unknown | Promise<unknown>;
}

const METHODS_WITH_BODY = new Set(["POST", "PUT", "PATCH"]);

export async function router(req: IncomingMessage, res: ServerResponse) {
  const method = req.method ?? "GET";
  const { pathname, query } = parseUrl(req.url, req.headers.host);

  const routesList = routes as unknown as Route[];

  let matchedRoute: Route | undefined;
  let match: ReturnType<typeof matchRoute> = { matched: false, params: {} as Record<string, string> };

  for (const r of routesList) {
    if (r.method !== method) continue;

    const m = matchRoute(r.path, pathname);
    if (m.matched) {
      matchedRoute = r;
      match = m;
      break;
    }
  }

  if (!matchedRoute) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Not Found" }));
    return;
  }

  let body: unknown = undefined;

  if (METHODS_WITH_BODY.has(method)) {
    body = await parseBody(req);
  }

  const context: RequestContext = {
    req,
    res,
    method,
    pathname,
    query,
    body,
    params: match.params,
    headers: req.headers,
  };

  await withErrorHandling(matchedRoute.handler, context);
}
