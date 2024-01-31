import React from "react";
import "../../styles/Hourly.css";
import { useForecastContext } from "../../services/contexts/forecast-context.jsx";
import Card from "../ui/Card.jsx";
import HourlyDisplay from "../layouts/page-container/pages/HourlyDisplay.jsx";
import useDestructuringHourlyForecast from "../../hooks/useDestructuringHourlyForecast.jsx";

const Hourly = () => {
  const { forecast, isTempUnitC } = useForecastContext();
  const hourlyData = useDestructuringHourlyForecast(forecast, isTempUnitC);

  // Get todays date
  const date = new Date(forecast.list[0].dt * 1000).toDateString();

  return (
    <Card title={`Hourly weather - ${date}`}>
      <HourlyDisplay hourlyData={hourlyData} isTempUnitC={isTempUnitC} />
    </Card>
  );
};

export default Hourly;
