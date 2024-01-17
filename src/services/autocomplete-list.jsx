import { GEODB_API_URL } from "../utils/constants";
import { makeAPICall, makeMultipleAPICalls } from "../adapters/api";

const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": `${import.meta.env.VITE_GEODB_API_KEY}`,
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
  // signal: signal,
};

export const getAutocompleteItems = async (inputValue, signal) => {
  try {
    // const response = await fetch(`${GEODB_API_URL}?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions);

    // const response = await fetch(
    //   `${GEODB_API_URL}?namePrefix=${inputValue}&types=CITY&sort=-population`,
    //   {
    //     method: "GET",
    //     headers: {
    //       "X-RapidAPI-Key": `${import.meta.env.VITE_GEODB_API_KEY}`,
    //       "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
    //     },
    //     signal,
    //   },
    // );

    // const result = await response.json();
    // return result;

    const response = makeAPICall(
      `${GEODB_API_URL}?namePrefix=${inputValue}&types=CITY&sort=-population`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": `${import.meta.env.VITE_GEODB_API_KEY}`,
          "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
        },
        signal,
      },
    );
    return response;
  } catch (error) {
    return error;
  }

  // const response = makeAPICall(`http://localhost:9000/data`);
  // // console.log(response);
  // return response;
};
