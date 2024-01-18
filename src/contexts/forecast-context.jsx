import React, { createContext, useContext, useMemo } from "react";
import { useGetForecast } from "../hooks/useGetForecast";

const ForecastContext = createContext(useGetForecast);

export function useForecast() {
  return useContext(ForecastContext);
}

export function ForecastProvider({ children }) {
  return (
    <ForecastContext.Provider value={useGetForecast()}>
      {children}
    </ForecastContext.Provider>
  );
}
