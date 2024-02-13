import React from "react";
import ForecastIcon from "../../../ui/ForecastIcon";

const WeekOverviewDisplay = ({ fiveDayforecast }) => {
  return (
    <ul className="list-overview">
      {fiveDayforecast.map((d, i) => (
        <li key={i} className="list-item">
          <div className="item">
            <p>{d.dates}</p>
            <p className="overview-list-temp">{d.temps}°</p>
          </div>
          <ForecastIcon iconName={d.iconsName} iconAlt={d.mainDescription} />
        </li>
      ))}
    </ul>
  );
};

export default WeekOverviewDisplay;
