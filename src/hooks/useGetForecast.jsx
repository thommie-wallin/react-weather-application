import React, { useEffect, useState, useRef } from "react";
import { getForecast } from "../services/forecast";

export const useGetForecast = (position) => {
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast, setforecast] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const weatherAbortControllerRef = useRef(null);

  useEffect(() => {
    // Get weather data from updated position (OpenWeatherMap API).
    async function handlePositionChange() {
      // Create new abortcontroller for new api call
      weatherAbortControllerRef.current = new AbortController();
      const signal = weatherAbortControllerRef.current?.signal;

      setIsLoading(true);
      try {
        const data = await getForecast(position, { signal });
        setCurrentWeather(data[0]);
        setforecast(data[1]);
      } catch (error) {
        if (error.name === "AbortError") {
          console.error(error);
          return;
        }
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    handlePositionChange();

    return () => {
      // Abort previous api call
      weatherAbortControllerRef.current?.abort();
    };
  }, []);

  // console.log(currentWeather, forecast, isLoading, error);

  return { currentWeather, forecast, isLoading, error };
};
