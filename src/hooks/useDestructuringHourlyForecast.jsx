import useGetTime from "./useGetTime";
import { tempUnitConverter } from "../utils/number-util";

const useDestructuringHourlyForecast = (forecast, isTempUnitC) => {
  return forecast.list.slice(0, 8).map((d, i) => {
    // Get the hour
    const hour = useGetTime(d.dt);

    // Check if user choose celsius or fahrenheit, temp rounded to one decimal and parsed into an integer.
    const temperature = tempUnitConverter(isTempUnitC, d.main.temp);

    const windSpeed = d.wind.speed;
    const humidity = d.main.humidity;

    // Get weather-icons name
    const iconsName = d.weather[0].icon;

    // Get short description of forecast
    const description = d.weather[0].description;

    return {
      hour,
      temperature,
      windSpeed,
      humidity,
      iconsName,
      description,
    };
  });
};

export default useDestructuringHourlyForecast;
