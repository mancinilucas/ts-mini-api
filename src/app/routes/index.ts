import { homePageHandler } from "../controllers/homePage.controller";
import { healthCheckHandler } from "../controllers/healthCheck.controller";

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
];
