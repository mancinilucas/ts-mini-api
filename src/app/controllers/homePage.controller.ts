import { IncomingMessage, ServerResponse } from "http";

export function homePageHandler(req: IncomingMessage, res: ServerResponse) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Welcome to the Home Page!\n");
}
