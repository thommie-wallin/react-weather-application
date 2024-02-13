import React from "react";
import ForecastIcon from "../../../ui/ForecastIcon";

const FiveDayDisplay = ({ fiveDayforecast }) => {
  return (
    <table className="list-forecast">
      <tbody>
        {fiveDayforecast.map((d, i) => (
          <tr key={i} className="forecast-list-item">
            <td>{d.dates}</td>
            <td className="forecast-list-temp">{d.temps}°</td>
            <td>
              <ForecastIcon
                iconName={d.iconsName}
                iconAlt={d.mainDescription}
              />
            </td>
            <td className="forecast-list-description">{d.description}</td>
            <td>{d.windSpeed}m/s</td>
            <td>{d.humidity}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FiveDayDisplay;
