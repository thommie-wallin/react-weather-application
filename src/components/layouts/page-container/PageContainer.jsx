import React from "react";
import { Route } from "react-router-dom";
import { useForecast } from "../../../services/contexts/forecast-context";

export const PageContainer = ({ children }) => {
  const { currentWeather } = useForecast();
  return (
    <div className="page-container">
      {Object.keys(currentWeather).length > 0 && children}
    </div>
  );
};
