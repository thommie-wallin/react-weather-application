import { makeAPICall, makeMultipleAPICalls } from "../api/api";
import { GEOCODING_API_URL } from "../utils/constants";

// Geocoding API (Direct geocoding)(Limit(optional): number of search results).
export const getPosition = (searchTerm, signal) => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const response = makeAPICall(
    `${GEOCODING_API_URL}/direct?q=${searchTerm}&limit=${5}&appid=${apiKey}`,
    signal,
  );
  return response;

  // JSON Server
  // const response = makeAPICall(`http://localhost:9000/data`);
  // // console.log(response);
  // return response;
};
