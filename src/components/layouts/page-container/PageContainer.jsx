import React from "react";
import { useForecast } from "../../../services/contexts/forecast-context";
import ErrorDisplay from "../../ErrorDisplay";

export const PageContainer = ({ children }) => {
  const { currentWeather, forecast, error } = useForecast();
  return (
    <div className="page-container">
      {error && <ErrorDisplay error={error} />}
      {Object.keys(currentWeather).length > 0 &&
        Object.keys(forecast).length > 0 &&
        children}
    </div>
  );
};
