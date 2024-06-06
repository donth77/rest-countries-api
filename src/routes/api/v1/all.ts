import express from "express";
import { Country } from "../../../types";

const all = express.Router();
const data: Country[] = require("../../../data.json");

all.get("/", (_, res) => {
  try {
    res.status(200).send(data);
  } catch (err) {
    const errorMsg = "Error parsing JSON";
    const status = 500;
    console.error(`${errorMsg}:`, err);
    res.status(status).send({
      status,
      message: errorMsg,
    });
  }
});

export default all;
