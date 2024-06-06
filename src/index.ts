import express, { Express, Request, Response } from "express";
import routes from "./routes";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use("/api/v1", routes);

app.listen(port, () => {
  console.log(`[server]: Server running on port {port}`);
});
