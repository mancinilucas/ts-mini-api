import type { RequestContext } from "../http/RequestContext";

export function healthCheckHandler(context: RequestContext) {
  const { res } = context;

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ status: "OK" }));
}
