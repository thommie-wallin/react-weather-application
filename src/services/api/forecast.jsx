import { makeMultipleAPICalls } from "../../adapters/api";
import { WEATHER_API_URL } from "../../utils/constants";

// OpenWeatherMap API
export const getForecast = (position, signal) => {
  const { latitude, longitude } = position;
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const responses = makeMultipleAPICalls(
    [
      `${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`,
      `${WEATHER_API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`,
    ],
    signal,
  );
  return responses;
};
