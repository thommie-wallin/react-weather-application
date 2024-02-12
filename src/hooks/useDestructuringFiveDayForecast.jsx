import React from "react";
import { filterArr } from "../utils/numberUtils";
import { tempUnitConverter } from "../utils/numberUtils";
import { IMAGE_API_URL } from "../utils/constants";

const useDestructuringFiveDayForecast = (forecast, isTempUnitC) => {
  // Filter 5 day / 3 hour forecast-data (each day have 8 readings).
  const dailyForecasts = filterArr(forecast.list, 8);

  return dailyForecasts.map((d) => {
    //! Remake file path for iconsUrl.
    const iconsURL = `${IMAGE_API_URL}/${d.weather[0].icon}.png`;
    const windSpeed = d.wind.speed;
    const humidity = d.main.humidity;
    const dates = new Date(d.dt * 1000).toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
    });
    const temps = tempUnitConverter(isTempUnitC, d.main.temp);
    const description = d.weather[0].description;
    const mainDescription = d.weather[0].main;

    return {
      iconsURL,
      windSpeed,
      humidity,
      dates,
      temps,
      description,
      mainDescription,
    };
  });
};

export default useDestructuringFiveDayForecast;
