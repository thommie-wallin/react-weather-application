import React from "react";
import "./../../styles/WeekForecast.css";
import { IMAGE_API_URL } from "../../utils/constants.jsx";
import { filterArr } from "../../utils/numberUtils.jsx";
import { useForecastContext } from "../../services/contexts/forecast-context.jsx";
import Card from "../ui/Card.jsx";
import useGetDatesAndDays from "../../hooks/useGetDatesAndDays.jsx";
import useTempUnitConverter from "../../hooks/useTempUnitConverter.jsx";

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

  // Array of five days.
  //! Refactor to layouts folder with forecast-components
  const dateData = dailyForecasts.map((d, i) => {
    const element = (
      <li key={i} className="forecast-list-item">
        <p>{dates[i]}</p>
        <p className="forecast-list-temp">
          {temps[i]}{" "}
          <span className="tempUnit-letter">{isTempUnitC ? "℃" : "℉"}</span>
          <span className="tempUnit-symbol">°</span>
        </p>
        <img src={iconsURL[i]} alt={d.weather[0].main} />{" "}
        <p className="forecast-list-description">{d.weather[0].description}</p>
        <p>{windSpeed[i]}m/s</p>
        <p>{humidity[i]}%</p>
      </li>
    );

    return element;
  });

  return (
    <Card title={"5 Day Forecast"}>
      <ul className="list-forecast">{dateData}</ul>
    </Card>
  );
};

export default WeekForecast;
