import express, { Express, NextFunction, Request, Response } from "express";
import routes from "./routes";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const setCorsHeaders = (_: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET");
  next();
};

app.use(setCorsHeaders);
app.use("/api/v1", routes);

app.listen(port, () => {
  console.log(`[server]: Server running on port ${port}`);
});
