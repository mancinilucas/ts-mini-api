import { homePageHandler } from "../controllers/homePage.controller";
import { healthCheckHandler } from "../controllers/healthCheck.controller";
import { getUserByIdHandler } from "../controllers/user.controller";
import { get } from "node:http";

export const routes = [
  {
    method: "GET",
    path: "/",
    handler: homePageHandler,
  },
  {
    method: "GET",
    path: "/health",
    handler: healthCheckHandler,
  },
  {
    method: "GET",
    path: "/users/:id",
    handler: getUserByIdHandler,
  },
];
