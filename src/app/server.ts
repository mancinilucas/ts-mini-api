import http from "http";

export function createServer(
  requestHandler:
    | http.RequestListener<
        typeof http.IncomingMessage,
        typeof http.ServerResponse
      >
    | undefined,
) {
  return http.createServer(requestHandler);
}
