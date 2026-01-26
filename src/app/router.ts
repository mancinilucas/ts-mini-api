import { parseUrl } from "./http/parseUrl";
import { routes } from "./routes";
import { IncomingMessage, ServerResponse } from "http";
import { withErrorHandling } from "./http/withErrorHandling";

interface Route {
  method: string;
  path: string;
  handler: (req: IncomingMessage, res: ServerResponse) => unknown;
}

export function router(req: IncomingMessage, res: ServerResponse) {
  const { method } = req;
  const { pathname } = parseUrl(req.url, req.headers.host);

  const route = routes.find(
    (r: Route) => r.method === method && r.path === pathname,
  );

  if (!route) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end(JSON.stringify({ error: "Not Found" }));
    return;
  }

  withErrorHandling(route.handler, req, res);
}
