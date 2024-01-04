import React from "react";
import "../../styles/Hourly.css";
import { tempUnitConverter } from "../../utils/numberUtils.jsx";
import { IMAGE_API_URL } from "../../utils/constants.jsx";

const Hourly = ({ weatherData, isTempUnit }) => {
  // Get todays date
  const date = new Date(weatherData.list[0].dt * 1000).toDateString();

  // Get data from every third hour from a day
  const hourlyData = weatherData.list.slice(0, 8).map((d, i) => {
    // Get the hour
    const hour = new Date(d.dt * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Check if user choose celsius or fahrenheit, temp rounded to one decimal and parsed into an integer.
    const temperature = tempUnitConverter(isTempUnit, d.main.temp);

    const windSpeed = d.wind.speed;
    const humidity = d.main.humidity;

    // Get weather icons URL endpoints
    const iconsURL = `${IMAGE_API_URL}/${d.weather[0].icon}.png`;

    const element = (
      <li key={i}>
        {hour} {temperature}
        {isTempUnit ? "℃" : "℉"} <img src={iconsURL} alt={d.weather[0].main} />{" "}
        {d.weather[0].description} {windSpeed}m/s {humidity}%
      </li>
    );

    return element;
  });

  return (
    <div className="content-hourly">
      <h3>Hourly weather - {date}</h3>
      <ul className="list-hourly">{hourlyData}</ul>
    </div>
  );
};

export default Hourly;
