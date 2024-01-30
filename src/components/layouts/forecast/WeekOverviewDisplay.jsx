import React from "react";

const WeekOverviewDisplay = ({
  dailyForecasts,
  dates,
  temps,
  isTempUnitC,
  iconsURL,
}) => {
  return (
    <ul className="list-overview">
      {dailyForecasts.map((d, i) => (
        <li key={i} className="list-item">
          <div className="item">
            <p>{dates[i]}</p>
            <p className="overview-list-temp">
              {temps[i]}{" "}
              <span className="tempUnit-letter">{isTempUnitC ? "℃" : "℉"}</span>
              <span className="tempUnit-symbol">°</span>
            </p>
            <img src={iconsURL[i]} alt={d.weather[0].main} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default WeekOverviewDisplay;
