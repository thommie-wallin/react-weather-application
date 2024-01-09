import { GEODB_API_URL } from "../utils/constants";
import { makeAPICall } from "./api";

export const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": `${import.meta.env.VITE_GEODB_API_KEY}`,
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

export const getSearchLocation = async (inputValue) => {
  // try {
  //   // const response = await fetch(`${GEODB_API_URL}?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions);
  //   // const response = await fetch(
  //   //   `${GEODB_API_URL}?types=CITY&minPopulation=100000&namePrefix=${inputValue}&sort=-population`,
  //   //   geoApiOptions,
  //   // );
  //   const response = await fetch(
  //     `${GEODB_API_URL}?namePrefix=${inputValue}&sort=-population`,
  //     geoApiOptions,
  //   );
  //   const result = await response.json();
  //   // console.log(result);
  //   return result;
  // } catch (error) {
  //   console.error(error);
  // }

  const response = makeAPICall(`http://localhost:9000/data`);
  // console.log(response);
  return response;
};
