import express from "express";
import { Country } from "../../../types";

const name = express.Router();
const data: Country[] = require("../../../../data.json");

function findCountryWithName(name: string) {
  const alphaLower = name.toLocaleLowerCase();

  return data.find(
    (country) =>
      alphaLower === country.name.toLowerCase() ||
      alphaLower === country.nativeName.toLocaleLowerCase()
  );
}

name.get("/:name", (req, res) => {
  const countryName = req.params.name;

  try {
    const country = findCountryWithName(countryName);

    if (!country) {
      const errorMsg = `No country found with name ${countryName}`;
      const status = 400;
      res.status(status).send({
        status,
        message: errorMsg,
      });
      return;
    }

    console.info(`Success - ${req.originalUrl}, host - ${req.headers.host}`);
    console.log(req.headers);
    res.status(200).send(country);
  } catch (err) {
    const errorMsg = "Failed to find country";
    const status = 500;
    console.error(`${errorMsg}:`, err);
    res.status(status).send({
      status,
      message: errorMsg,
    });
  }
});

export default name;
