import React from "react";

const WeekOverviewDisplay = ({ fiveDayforecast, isTempUnitC }) => {
  return (
    <ul className="list-overview">
      {fiveDayforecast.map((d, i) => (
        <li key={i} className="list-item">
          <div className="item">
            <p>{d.dates}</p>
            <p className="overview-list-temp">
              {d.temps}{" "}
              <span className="tempUnit-letter">{isTempUnitC ? "℃" : "℉"}</span>
              <span className="tempUnit-symbol">°</span>
            </p>
            <img src={d.iconsURL} alt={d.mainDescription} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default WeekOverviewDisplay;
