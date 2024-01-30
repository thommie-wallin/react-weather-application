import React from "react";
import "./../../styles/WeekForecast.css";
import { useForecastContext } from "../../services/contexts/forecast-context.jsx";
import Card from "../ui/Card.jsx";
import WeekForecastDisplay from "../layouts/forecast/WeekForecastDisplay.jsx";
import useDestructuringFiveDayForecast from "../../hooks/useDestructuringFiveDayForecast.jsx";

const WeekForecast = () => {
  const { forecast, isTempUnitC } = useForecastContext();
  const fiveDayforecast = useDestructuringFiveDayForecast(
    forecast,
    isTempUnitC,
  );

  return (
    <Card title={"5 Day Forecast"}>
      <WeekForecastDisplay
        fiveDayforecast={fiveDayforecast}
        isTempUnitC={isTempUnitC}
      />
    </Card>
  );
};

export default WeekForecast;
