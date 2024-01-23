import { useEffect, useRef } from "react";
import { getForecast } from "../services/api/forecast";
import { useForecast } from "../services/contexts/forecast-context";

export const useGetForecast = (position) => {
  const { setForecast, loadingStart, loadingStop, setError } = useForecast();
  const weatherAbortControllerRef = useRef();

  useEffect(() => {
    async function handlePositionChange() {
      // Create new abortcontroller for new api call
      weatherAbortControllerRef.current = new AbortController();
      const signal = weatherAbortControllerRef.current.signal;

      loadingStart();
      try {
        const res = await getForecast(position, { signal });
        if (!res.ok) {
          setError({ message: "Could not fetch the data from that resource." });
        } else {
          const data = await res.json();
          setForecast(data);
        }
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

    if (position !== null) {
      handlePositionChange();
    }

    return () => {
      // Abort previous api call
      if (weatherAbortControllerRef.current) {
        weatherAbortControllerRef.current.abort();
      }
    };
  }, [position]);
};
