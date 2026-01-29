import type { RequestContext } from "../http/RequestContext";
import { getUserById } from "../services/user.service";
import { NotFoundError } from "../errors/NotFoundError";

export function getUserByIdHandler(context: RequestContext) {
  const { params } = context;

  const id = params?.id;

  if (!id) {
    context.json({ error: "User ID is required" }, 400);
    return;
  }

  const user = getUserById(id);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  context.json(user);
}
