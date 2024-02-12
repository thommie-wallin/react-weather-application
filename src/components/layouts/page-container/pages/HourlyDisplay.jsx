import React from "react";

const HourlyDisplay = ({ hourlyData, isTempUnitC }) => {
  return (
    <table className="list-hourly">
      {hourlyData.map((d, i) => (
        <tr key={i} className="hourly-list-item">
          <td>{d.hour}</td>
          <td className="hourly-list-temp">
            {/* <div> */}
            {d.temperature}{" "}
            <span className="tempUnit-letter">{isTempUnitC ? "℃" : "℉"}</span>
            <span className="tempUnit-symbol">°</span>
            {/* </div> */}
          </td>
          <td className="hourly-icon">
            <img src={d.iconsURL} />
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
