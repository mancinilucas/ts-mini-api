import type { RequestContext } from "../http/RequestContext";
import { validate } from "../validation/validate";
import { isRequired, isString, minLength } from "../validation/validators";
import { createUser } from "../services/user.service";

interface CreateUserBody {
  name: string;
}

export function createUserHandler(context: RequestContext<CreateUserBody>) {
  const { body } = context;

  validate(body, [isRequired]);

  if (!body) {
    context.json({ error: "Body is required" }, 400);
    return;
  }

  validate(body.name, [isRequired, isString, minLength(3)]);

  const user = createUser(body.name);

  context.json(user, 201);
}
