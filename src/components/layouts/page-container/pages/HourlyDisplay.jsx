import React from "react";

const HourlyDisplay = ({ hourlyData, isTempUnitC }) => {
  return (
    <ul className="list-hourly">
      {hourlyData.map((d, i) => (
        <li key={i} className="hourly-list-item">
          <p>{d.hour}</p>
          <p className="hourly-list-temp">
            {d.temperature}{" "}
            <span className="tempUnit-letter">{isTempUnitC ? "℃" : "℉"}</span>
            <span className="tempUnit-symbol">°</span>
          </p>
          <img src={d.iconsURL} />{" "}
          <p className="hourly-list-description">{d.description}</p>
          <p>{d.windSpeed}m/s</p>
          <p>{d.humidity}%</p>
        </li>
      ))}
    </ul>
  );
};

export default HourlyDisplay;
