import { ServerResponse } from "http";

export function sendResponse(
  res: ServerResponse,
  statusCode: number,
  body?: unknown,
) {
  res.statusCode = statusCode;

  if (body !== undefined) {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(body));
    return;
  }

  res.end();
}
