import React from "react";
import "../../styles/WeekOverview.css";
import { useForecastContext } from "../../services/contexts/forecast-context.jsx";
import Card from "../ui/Card.jsx";
import WeekOverviewDisplay from "../layouts/forecast/WeekOverviewDisplay.jsx";
import useFiveDayForecastDestructure from "../../hooks/useDestructuringFiveDayForecast.jsx";

const WeekOverview = () => {
  const { forecast, isTempUnitC } = useForecastContext();
  const fiveDayforecast = useFiveDayForecastDestructure(forecast, isTempUnitC);

  return (
    <Card title={"Week overview"}>
      <WeekOverviewDisplay
        fiveDayforecast={fiveDayforecast}
        isTempUnitC={isTempUnitC}
      />
    </Card>
  );
};

export default WeekOverview;
