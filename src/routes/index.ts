import express from "express";
import all from "./api/v1/all";
import alpha from "./api/v1/alpha";
import name from "./api/v1/name";
import region from "./api/v1/region";

const routes = express.Router();

routes.get("/", (_, res) => {
  res.status(200).send("REST Countries API");
});

routes.use("/all", all);
routes.use("/alpha", alpha);
routes.use("/name", name);
routes.use("/region", region);
export default routes;
