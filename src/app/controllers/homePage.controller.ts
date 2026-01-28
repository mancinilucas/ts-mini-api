import type { RequestContext } from "../http/RequestContext";

export function homePageHandler(context: RequestContext) {
  const { res } = context;

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Welcome to the Home Page!\n");
}
