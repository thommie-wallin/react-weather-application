import React from "react";
import ForecastIcon from "../../../ui/ForecastIcon";

const HourlyDisplay = ({ hourlyData }) => {
  return (
    <table className="list-hourly">
      {hourlyData.map((d, i) => (
        <tr key={i} className="hourly-list-item">
          <td>{d.hour}</td>
          <td className="hourly-list-temp">{d.temperature}°</td>
          <td>
            <ForecastIcon iconName={d.iconsName} iconAlt={d.mainDescription} />
          </td>
          <td className="hourly-list-description">{d.description}</td>
          <td>{d.windSpeed}m/s</td>
          <td>{d.humidity}%</td>
        </tr>
      ))}
    </table>
  );
};

export default HourlyDisplay;
