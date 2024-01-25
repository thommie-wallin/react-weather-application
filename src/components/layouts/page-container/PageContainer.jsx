import React from "react";
import { useForecast } from "../../../services/contexts/forecast-context";
import ErrorDisplay from "../../ErrorDisplay";
import LoadingDisplay from "../../LoadingDisplay";

export const PageContainer = ({ children }) => {
  const { currentWeather, forecast, position, isLoading, error } =
    useForecast();
  //! All showing weather data when an error occur.
  return (
    <div className="page-container">
      {error ? (
        <ErrorDisplay />
      ) : isLoading && position !== null ? (
        <LoadingDisplay />
      ) : (
        Object.keys(currentWeather).length > 0 &&
        Object.keys(forecast).length > 0 &&
        children
      )}
    </div>
  );
};
