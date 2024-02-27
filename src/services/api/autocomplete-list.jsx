import { GEODB_API_URL } from "../../utils/constants";
import { makeAPICall } from "../../adapters/api";

// GeoDB Cities API (rapidapi.com)(Limit(optional): types=CITY, sort by larger population to smallest).
export const getAutocompleteItems = async (inputValue, signal) => {
  try {
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
};
