import type { RequestContext } from "../http/RequestContext";

export function healthCheckHandler(context: RequestContext) {
  context.json({ status: "OK" });
}
