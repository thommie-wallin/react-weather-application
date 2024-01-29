import { useEffect, useRef } from "react";
import { getForecast } from "../services/api/forecast";
import { useForecastContext } from "../services/contexts/forecast-context";
import { useNavigate } from "react-router-dom";

export const useGetForecast = (position) => {
  const { setForecast, loadingStart, loadingStop, setError } =
    useForecastContext();
  const weatherAbortControllerRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    async function handlePositionChange() {
      // Create new abortcontroller for new api call
      weatherAbortControllerRef.current = new AbortController();
      const signal = weatherAbortControllerRef.current.signal;

      loadingStart();
      try {
        const res = await getForecast(position, { signal });
        if (res[0].cod !== 200 || res[1].cod !== "200") {
          setError({ message: "Could not fetch the data from that resource." });
          return;
        } else {
          setForecast(res);
        }
      } catch (error) {
        if (error.name === "AbortError") {
          console.error(error);
          return;
        }
        setError(error);
      } finally {
        navigate("/today");
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
