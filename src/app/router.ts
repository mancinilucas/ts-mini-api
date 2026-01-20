import { parseUrl } from "./http/parseUrl";
import { routes } from "./routes";
import { IncomingMessage, ServerResponse } from "http";

interface Route {
  method: string;
  path: string;
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
    res.end("Not Found\n");
    return;
  }

  route.handler(req, res);
}
