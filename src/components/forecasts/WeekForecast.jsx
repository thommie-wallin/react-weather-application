import React from "react";
import "./../../styles/WeekForecast.css";
import { IMAGE_API_URL } from "../../utils/constants.jsx";
import { filterArr, tempUnitConverter } from "../../utils/numberUtils.jsx";
import { useForecastContext } from "../../services/contexts/forecast-context.jsx";
import Card from "../ui/Card.jsx";

const WeekForecast = () => {
  const { forecast, isTempUnitC } = useForecastContext();
  // Filter 5 day / 3 hour forecast-data (each day have 8 readings).
  const dailyForecasts = filterArr(forecast.list, 8);

  // Get data from every third hour from a day
  const dateData = dailyForecasts.map((d, i) => {
    // Get the dates and weekdays
    const dates = new Date(d.dt * 1000).toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
    });

    // Check if user choose celsius or fahrenheit, temp rounded to one decimal and parsed into an integer.
    const temperature = tempUnitConverter(isTempUnitC, d.main.temp);

    const windSpeed = d.wind.speed;
    const humidity = d.main.humidity;

    // Get weather icons URL endpoints
    const iconsURL = `${IMAGE_API_URL}/${d.weather[0].icon}.png`;

    const element = (
      <li key={i} className="forecast-list-item">
        <p>{dates}</p>
        <p className="forecast-list-temp">
          {temperature}{" "}
          <span className="tempUnit-letter">{isTempUnitC ? "℃" : "℉"}</span>
          <span className="tempUnit-symbol">°</span>
        </p>
        <img src={iconsURL} alt={d.weather[0].main} />{" "}
        <p className="forecast-list-description">{d.weather[0].description}</p>
        <p>{windSpeed}m/s</p>
        <p>{humidity}%</p>
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
