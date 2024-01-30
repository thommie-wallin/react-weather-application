import React from "react";
import "../../styles/WeekOverview.css";
import { filterArr } from "../../utils/numberUtils.jsx";
import { IMAGE_API_URL } from "../../utils/constants.jsx";
import { useForecastContext } from "../../services/contexts/forecast-context.jsx";
import Card from "../ui/Card.jsx";
import useGetDatesAndDays from "../../hooks/useGetDatesAndDays.jsx";
import useTempUnitConverter from "../../hooks/useTempUnitConverter.jsx";
import WeekOverviewDisplay from "../layouts/forecast/WeekOverviewDisplay.jsx";

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

  return (
    <Card title={"Week overview"}>
      <WeekOverviewDisplay
        dailyForecasts={dailyForecasts}
        dates={dates}
        temps={temps}
        isTempUnitC={isTempUnitC}
        iconsURL={iconsURL}
      />
    </Card>
  );
};

export default WeekOverview;
