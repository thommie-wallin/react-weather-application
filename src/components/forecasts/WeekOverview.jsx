import React from "react";
import "../../styles/WeekOverview.css";
import { filterArr } from "../../utils/numberUtils.jsx";
import { tempUnitConverter } from "../../utils/numberUtils.jsx";
import { IMAGE_API_URL } from "../../utils/constants.jsx";
import { useForecastContext } from "../../services/contexts/forecast-context.jsx";

const WeekOverview = () => {
  const { forecast, isTempUnitC } = useForecastContext();
  // Filter 5 day / 3 hour forecast-data (each day have 8 readings).
  const dailyForecasts = filterArr(forecast.list, 8);

  // Get the dates and weekdays
  const dates = dailyForecasts.map((d) => {
    return new Date(d.dt * 1000).toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
    });
  });

  // Get temperatures
  const temps = dailyForecasts.map((d) => {
    const temp = tempUnitConverter(isTempUnitC, d.main.temp);
    return temp;
  });

  // Get weather icons URL endpoints
  const iconsURL = dailyForecasts.map((d) => {
    return `${IMAGE_API_URL}/${d.weather[0].icon}.png`;
  });

  const renderElement = dailyForecasts.map((d, i) => {
    return (
      <li key={i} className="list-item">
        <div className="item">
          <p>{dates[i]}</p>
          <p>
            {temps[i]} {isTempUnitC ? "℃" : "℉"}
          </p>
        </div>
        <img src={iconsURL[i]} alt={d.weather[0].main} />
      </li>
    );
  });

  return (
    <div className="content-overview">
      <h3>Week overview</h3>
      <ul className="list-overview">{renderElement}</ul>
    </div>
  );
};

export default WeekOverview;
