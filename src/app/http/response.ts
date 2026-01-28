import { ServerResponse } from "http";

interface JsonResponseOptions {
  status?: number;
  headers?: Record<string, string>;
}

export function sendJson(
  res: ServerResponse,
  data: unknown,
  options: JsonResponseOptions = {},
) {
  const status = options.status ?? 200;

  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");

  if (options.headers) {
    for (const [key, value] of Object.entries(options.headers)) {
      res.setHeader(key, value);
    }
  }

  res.end(JSON.stringify(data));
}

export function sendNoContent(res: ServerResponse) {
  res.statusCode = 204;
  res.end();
}
