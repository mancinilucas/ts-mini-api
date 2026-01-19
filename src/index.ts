import { router } from "./app/router";
import { createServer } from "./app/server";

const server = createServer(router);

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});

process.on("uncaughtException", (error, origin) => {
  console.log(`\nUncaught Exception: \n${error}\nOrigin: ${origin}`);
});

process.on("unhandledRejection", (error) => {
  console.log(`\nUnhandled Rejection: \n${error}`);
});

process.on("SIGINT", () => {
  console.log("\nGracefully shutting down from SIGINT");
  process.exit(0);
});
