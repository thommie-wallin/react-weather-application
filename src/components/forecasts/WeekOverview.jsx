import React from "react";
import "../../styles/WeekOverview.css";
import { filterArr } from "../../utils/numberUtils.jsx";
import { IMAGE_API_URL } from "../../utils/constants.jsx";
import { useForecastContext } from "../../services/contexts/forecast-context.jsx";
import Card from "../ui/Card.jsx";
import useGetDatesAndDays from "../../hooks/useGetDatesAndDays.jsx";
import useTempUnitConverter from "../../hooks/useTempUnitConverter.jsx";

const WeekOverview = () => {
  const { forecast, isTempUnitC } = useForecastContext();

  // Filter 5 day / 3 hour forecast-data (each day have 8 readings).
  const dailyForecasts = filterArr(forecast.list, 8);

  // Get the dates and weekdays
  const dates = useGetDatesAndDays(dailyForecasts);

  // Get temperatures
  const temps = useTempUnitConverter(dailyForecasts, isTempUnitC);

  // Get weather icons URL endpoints
  const iconsURL = dailyForecasts.map((d) => {
    return `${IMAGE_API_URL}/${d.weather[0].icon}.png`;
  });

  const renderElement = dailyForecasts.map((d, i) => {
    return (
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
    );
  });

  return (
    <Card title={"Week overview"}>
      <ul className="list-overview">{renderElement}</ul>
    </Card>
  );
};

export default WeekOverview;
