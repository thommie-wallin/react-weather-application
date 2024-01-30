import React from "react";

const WeekForecastDisplay = ({
  dailyForecasts,
  dates,
  temps,
  isTempUnitC,
  iconsURL,
  windSpeed,
  humidity,
}) => {
  return (
    <ul className="list-forecast">
      {dailyForecasts.map((d, i) => (
        <li key={i} className="forecast-list-item">
          <p>{dates[i]}</p>
          <p className="forecast-list-temp">
            {temps[i]}{" "}
            <span className="tempUnit-letter">{isTempUnitC ? "℃" : "℉"}</span>
            <span className="tempUnit-symbol">°</span>
          </p>
          <img src={iconsURL[i]} alt={d.weather[0].main} />{" "}
          <p className="forecast-list-description">
            {d.weather[0].description}
          </p>
          <p>{windSpeed[i]}m/s</p>
          <p>{humidity[i]}%</p>
        </li>
      ))}
    </ul>
  );
};

export default WeekForecastDisplay;
