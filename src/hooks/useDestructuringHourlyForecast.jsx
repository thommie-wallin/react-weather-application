import useGetTime from "./useGetTime";
import { tempUnitConverter } from "../utils/numberUtils";

const useDestructuringHourlyForecast = (forecast, isTempUnitC) => {
  return forecast.list.slice(0, 8).map((d, i) => {
    // Get the hour
    const hour = useGetTime(d.dt);

    // Check if user choose celsius or fahrenheit, temp rounded to one decimal and parsed into an integer.
    const temperature = tempUnitConverter(isTempUnitC, d.main.temp);

    const windSpeed = d.wind.speed;
    const humidity = d.main.humidity;

    // Get weather icons URL endpoints
    const iconsURL = d.weather[0].icon;

    const description = d.weather[0].description;

    return {
      hour,
      temperature,
      windSpeed,
      humidity,
      iconsURL,
      description,
    };
  });
};

export default useDestructuringHourlyForecast;
