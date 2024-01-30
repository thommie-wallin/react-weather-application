import React from "react";
import "./../../styles/WeekForecast.css";
import { IMAGE_API_URL } from "../../utils/constants.jsx";
import { filterArr } from "../../utils/numberUtils.jsx";
import { useForecastContext } from "../../services/contexts/forecast-context.jsx";
import Card from "../ui/Card.jsx";
import useGetDatesAndDays from "../../hooks/useGetDatesAndDays.jsx";
import useTempUnitConverter from "../../hooks/useTempUnitConverter.jsx";
import WeekForecastDisplay from "../layouts/forecast/WeekForecastDisplay.jsx";

const WeekForecast = () => {
  const { forecast, isTempUnitC } = useForecastContext();

  // Filter 5 day / 3 hour forecast-data (each day have 8 readings).
  const dailyForecasts = filterArr(forecast.list, 8);

  // Get the dates and weekdays
  const dates = useGetDatesAndDays(dailyForecasts);

  // Check if user choose celsius or fahrenheit, temp rounded to one decimal and parsed into an integer.
  const temps = useTempUnitConverter(dailyForecasts, isTempUnitC);

  // Get weather icons URL endpoints
  const iconsURL = dailyForecasts.map((d) => {
    return `${IMAGE_API_URL}/${d.weather[0].icon}.png`;
  });

  // Get forecast windspeed
  const windSpeed = dailyForecasts.map((d) => {
    return d.wind.speed;
  });

  // Get forecast humidity
  const humidity = dailyForecasts.map((d) => {
    return d.main.humidity;
  });

  return (
    <Card title={"5 Day Forecast"}>
      <WeekForecastDisplay
        dailyForecasts={dailyForecasts}
        dates={dates}
        temps={temps}
        isTempUnitC={isTempUnitC}
        iconsURL={iconsURL}
        windSpeed={windSpeed}
        humidity={humidity}
      />
    </Card>
  );
};

export default WeekForecast;
