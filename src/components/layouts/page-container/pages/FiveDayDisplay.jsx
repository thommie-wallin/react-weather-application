import React from "react";
import ForecastIcon from "../../../ui/ForecastIcon";

const FiveDayDisplay = ({ fiveDayforecast, isTempUnitC }) => {
  return (
    <table className="list-forecast">
      {fiveDayforecast.map((d, i) => (
        <tr key={i} className="forecast-list-item">
          <td>{d.dates}</td>
          <td className="forecast-list-temp">
            {d.temps}{" "}
            <span className="tempUnit-letter">{isTempUnitC ? "℃" : "℉"}</span>
            <span className="tempUnit-symbol">°</span>
          </td>
          <td>
            <ForecastIcon iconName={d.iconsURL} iconAlt={d.mainDescription} />
          </td>
          <td className="forecast-list-description">{d.description}</td>
          <td>{d.windSpeed}m/s</td>
          <td>{d.humidity}%</td>
        </tr>
      ))}
    </table>
  );
};

export default FiveDayDisplay;
