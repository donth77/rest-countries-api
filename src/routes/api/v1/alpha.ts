import express from "express";
import { Country } from "../../../types";

const alpha = express.Router();
const data: Country[] = require("../../../../data.json");

function findCountryWithCode(alpha: string) {
  const alphaUpper = alpha.toUpperCase();
  return data.find(
    (country) =>
      alphaUpper === country.alpha2Code || alphaUpper === country.alpha3Code
  );
}

alpha.get("/:code", (req, res) => {
  const countryCode = req.params.code;

  if (countryCode.length < 2 || countryCode.length > 3) {
    const errorMsg =
      "Invalid country code. Must be 2 or 3 characters in length";
    const status = 400;
    res.status(status).send({
      status,
      message: errorMsg,
    });
    return;
  }

  try {
    const country = findCountryWithCode(countryCode);

    if (!country) {
      const errorMsg = `No country found with code ${countryCode}`;
      const status = 400;
      res.status(status).send({
        status,
        message: errorMsg,
      });
      return;
    }

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

export default alpha;
