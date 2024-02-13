import httpServer from "./app";

const port = process.env.PORT;

httpServer.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`.blue.underline);
});
