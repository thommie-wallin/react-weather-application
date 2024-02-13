import React from "react";
import "./../../styles/FiveDay.css";
import { useForecastContext } from "../../services/contexts/forecast-context.jsx";
import Card from "../ui/Card.jsx";
import FiveDayDisplay from "../layouts/page-container/pages/FiveDayDisplay.jsx";
import useDestructuringFiveDayForecast from "../../hooks/useDestructuringFiveDayForecast.jsx";

const FiveDayForecast = () => {
  const { forecast, isTempUnitC } = useForecastContext();
  const fiveDayforecast = useDestructuringFiveDayForecast(
    forecast,
    isTempUnitC,
  );

  return (
    <Card title={"5 Day Forecast"}>
      <FiveDayDisplay fiveDayforecast={fiveDayforecast} />
    </Card>
  );
};

export default FiveDayForecast;
