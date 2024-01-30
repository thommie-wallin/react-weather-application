import React from "react";

const TodayDisplay = ({
  temp,
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
          <p className="today-list-temp">
            {temp}{" "}
            <span className="tempUnit-letter">{isTempUnitC ? "℃" : "℉"}</span>
            <span className="tempUnit-symbol">°</span>
          </p>
        </li>
        <li>Wind speed: {currentWeather.wind.speed} m/s</li>
        <li>Humidity: {currentWeather.main.humidity} %</li>
        <li>
          Sunrise/Sunset: {sunrise}/{sunset}
        </li>
      </ul>
      <img src={iconsURL} alt={currentWeather.weather[0].main} />
    </div>
  );
};

export default TodayDisplay;
