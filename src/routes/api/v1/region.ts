import express from "express";
import { Country } from "../../../types";

const region = express.Router();
const data: Country[] = require("../../../data.json");

function findCountriesWithRegion(region: string) {
  const regionLower = region.toLowerCase();

  return data.filter((country) => regionLower === country.region.toLowerCase());
}

region.get("/:region", (req, res) => {
  const countryRegion = req.params.region;

  try {
    const countries = findCountriesWithRegion(countryRegion);

    if (!countries || !countries.length) {
      const errorMsg = `No countries found with region ${countryRegion}`;
      const status = 400;
      res.status(status).send({
        status,
        message: errorMsg,
      });
      return;
    }

    res.status(200).send(countries);
  } catch (err) {
    const errorMsg = "Failed to find countries";
    const status = 500;
    console.error(`${errorMsg}:`, err);
    res.status(status).send({
      status,
      message: errorMsg,
    });
  }
});

export default region;
