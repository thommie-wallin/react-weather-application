import { GEODB_API_URL } from "../utils/constants";
import { makeAPICall } from "./api";

const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": `${import.meta.env.VITE_GEODB_API_KEY}`,
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
  // signal: signal,
};

export const getSearchLocation = async (inputValue, signal) => {
  try {
    // const response = await fetch(`${GEODB_API_URL}?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions);
    // const response = await fetch(
    //   `${GEODB_API_URL}?types=CITY&minPopulation=100000&namePrefix=${inputValue}&sort=-population`,
    //   geoApiOptions,
    // );
    // const response = await fetch(
    //   `${GEODB_API_URL}?namePrefix=${inputValue}&sort=-population`,
    //   geoApiOptions,
    // );

    const response = await fetch(
      `${GEODB_API_URL}?namePrefix=${inputValue}&sort=-population`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": `${import.meta.env.VITE_GEODB_API_KEY}`,
          "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
        },
        signal,
      },
    );

    const result = await response.json();
    return result;
  } catch (error) {
    //? Hantera om api inte fungerar, ex if (error.name === "AbortError") {
    //?   results.push("API failure");
    //? }
    // console.error(error);
    return error;
  }

  // const response = makeAPICall(`http://localhost:9000/data`);
  // // console.log(response);
  // return response;
};
