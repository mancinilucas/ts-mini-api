import { routes } from "./routes";
import { IncomingMessage, ServerResponse } from "http";

interface Route {
  method: string;
  path: string;
}

export function router(req: IncomingMessage, res: ServerResponse) {
  const { method, url } = req;

  const route = routes.find(
    (r: Route) => r.method === method && r.path === url,
  );

  if (!route) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Not Found\n");
    return;
  }

  route.handler(req, res);
}
