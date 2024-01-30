import React from "react";

const WeekForecastDisplay = ({ fiveDayforecast, isTempUnitC }) => {
  return (
    <ul className="list-forecast">
      {fiveDayforecast.map((d, i) => (
        <li key={i} className="forecast-list-item">
          <p>{d.dates}</p>
          <p className="forecast-list-temp">
            {d.temps}{" "}
            <span className="tempUnit-letter">{isTempUnitC ? "℃" : "℉"}</span>
            <span className="tempUnit-symbol">°</span>
          </p>
          <img src={d.iconsURL} alt={d.mainDescription} />{" "}
          <p className="forecast-list-description">{d.description}</p>
          <p>{d.windSpeed}m/s</p>
          <p>{d.humidity}%</p>
        </li>
      ))}
    </ul>
  );
};

export default WeekForecastDisplay;
