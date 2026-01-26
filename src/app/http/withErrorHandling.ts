import { IncomingMessage, ServerResponse } from "http";
import { HttpError } from "./HttpError";
import { sendResponse } from "./sendResponse";

type Handler = (req: IncomingMessage, res: ServerResponse) => unknown;

export async function withErrorHandling(
  handler: Handler,
  req: IncomingMessage,
  res: ServerResponse,
) {
  try {
    await handler(req, res);
  } catch (error) {
    if (error instanceof HttpError) {
      sendResponse(res, error.statusCode, {
        error: error.message,
      });
      return;
    }

    console.error(error);

    sendResponse(res, 500, {
      error: "Internal Server Error",
    });
  }
}
