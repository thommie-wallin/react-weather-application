import React from "react";
import { useForecastContext } from "../services/contexts/forecast-context";
import useGetGeolocationPosition from "../hooks/useGetGeolocationPosition";
import { useGetForecast } from "../hooks/useGetForecast";
import RootLayout from "../components/layouts/RootLayout";

const Root = () => {
  const { position } = useForecastContext();

  // If allowed, get user position (Geolocation API).
  useGetGeolocationPosition();

  // Get weather data from updated position (OpenWeatherMap API).
  useGetForecast(position);

  return <RootLayout />;
};

export default Root;
