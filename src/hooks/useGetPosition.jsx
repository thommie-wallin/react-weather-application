import React, { useState, useRef, useEffect } from "react";
import { getPosition } from "../services/api/position";
import { useForecastContext } from "../services/contexts/forecast-context";

const useGetPosition = (cityName) => {
  const { setPosition, loadingStart, loadingStop, setError } =
    useForecastContext();
  const searchAbortControllerRef = useRef(null);

  useEffect(() => {
    // Get weather for searched location (Geocoded API OpenWeatherMap).
    async function handleSearch() {
      // Create new abortcontroller for new api call
      searchAbortControllerRef.current = new AbortController();
      const signal = searchAbortControllerRef.current?.signal;

      loadingStart();
      try {
        const res = await getPosition(cityName, { signal });
        setPosition({
          latitude: res[0].lat,
          longitude: res[0].lon,
        });
      } catch (error) {
        if (error.name === "AbortError") {
          console.error(error);
          return;
        }
        setError(error);
      } finally {
        loadingStop();
      }
    }

    if (cityName !== null) {
      handleSearch();
    }
    return () => {
      // Abort previous api call
      searchAbortControllerRef.current?.abort();
    };
  }, [cityName]);
};

export default useGetPosition;
