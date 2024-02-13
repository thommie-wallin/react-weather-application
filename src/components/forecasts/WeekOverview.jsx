import React from "react";
import "../../styles/WeekOverview.css";
import { useForecastContext } from "../../services/contexts/forecast-context.jsx";
import Card from "../ui/Card.jsx";
import WeekOverviewDisplay from "../layouts/page-container/pages/WeekOverviewDisplay.jsx";
import useFiveDayForecastDestructure from "../../hooks/useDestructuringFiveDayForecast.jsx";

const WeekOverview = () => {
  const { forecast, isTempUnitC } = useForecastContext();
  const fiveDayforecast = useFiveDayForecastDestructure(forecast, isTempUnitC);

  return (
    <Card title={"Week overview"}>
      <WeekOverviewDisplay fiveDayforecast={fiveDayforecast} />
    </Card>
  );
};

export default WeekOverview;
