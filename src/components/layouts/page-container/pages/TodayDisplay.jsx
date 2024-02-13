import React from "react";
import ForecastIcon from "../../../ui/ForecastIcon";

const TodayDisplay = ({
  temp,
  feelsLikeTemp,
  isTempUnitC,
  currentWeather,
  sunrise,
  sunset,
  iconsURL,
}) => {
  return (
    <div className="hero-list-today">
      <ul className="list-today">
        <li>
          <p className="today-list-temp">{temp}°</p>
        </li>
        <li className="today-list-feels-like">Feels like: {feelsLikeTemp}°</li>
        <li>Wind speed: {currentWeather.wind.speed} m/s</li>
        <li>Humidity: {currentWeather.main.humidity} %</li>
        <li>
          Sunrise/Sunset: {sunrise}/{sunset}
        </li>
      </ul>
      <ForecastIcon
        iconName={iconsURL}
        iconAlt={currentWeather.weather[0].main}
      />
    </div>
  );
};

export default TodayDisplay;
