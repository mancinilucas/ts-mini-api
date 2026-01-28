import type { IncomingMessage, ServerResponse } from "http";

export interface RequestContext<TBody = unknown> {
  req: IncomingMessage;
  res: ServerResponse;

  method: string;
  pathname: string;
  query: Record<string, string | string[]>;
  params?: Record<string, string>;
  headers: IncomingMessage["headers"];
  body?: TBody;

  json: (data: unknown, status?: number) => void;
  noContent: () => void;
}
