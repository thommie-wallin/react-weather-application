import React, { useState, useRef, useEffect } from "react";
import { getPosition } from "../services/position";

const useGetPosition = (cityName) => {
  const [position, setPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const searchAbortControllerRef = useRef(null);

  useEffect(() => {
    // Get weather for searched location (Geocoded API OpenWeatherMap).
    async function handleSearch() {
      // Create new abortcontroller for new api call
      searchAbortControllerRef.current = new AbortController();
      const signal = searchAbortControllerRef.current?.signal;

      setIsLoading(true);
      try {
        const data = await getPosition(cityName, { signal });
        setPosition({
          latitude: data[0].lat,
          longitude: data[0].lon,
        });
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
    handleSearch();
    return () => {
      // Abort previous api call
      searchAbortControllerRef.current?.abort();
    };
  }, []);

  return { position, isLoading, error };
};

export default useGetPosition;
