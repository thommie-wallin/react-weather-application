import React, {
  useEffect,
  useState,
  useRef,
  useReducer,
  useCallback,
  useMemo,
} from "react";
import { getForecast } from "../services/forecast";
import useGetGeolocationPosition from "./useGetGeolocationPosition";

export const useGetForecast = () => {
  // const [currentWeather, setCurrentWeather] = useState({});
  // const [forecast, setforecast] = useState({});
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();
  const weatherAbortControllerRef = useRef(null);

  const [
    { locationName, currentWeather, forecast, position, isLoading, error },
    // state,
    dispatch,
  ] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "setForecast":
          // console.log(action.payload);
          return {
            ...state,
            locationName: action.payload[0].name,
            currentWeather: action.payload[0],
            forecast: action.payload[1],
          };
        case "setPosition":
          // console.log(action.payload);
          return {
            ...state,
            position: action.payload,
          };
        default:
          break;
      }
    },
    {
      locationName: null,
      currentWeather: {},
      forecast: {},
      position: null,
      isLoading: false,
      error: null,
    },
  );

  useEffect(() => {
    // Get weather data from updated position (OpenWeatherMap API).
    async function handlePositionChange() {
      // Create new abortcontroller for new api call
      weatherAbortControllerRef.current = new AbortController();
      const signal = weatherAbortControllerRef.current?.signal;

      // setIsLoading(true);
      try {
        const data = await getForecast(position, { signal });
        // setCurrentWeather(data[0]);
        // setforecast(data[1]);
        dispatch({ type: "setForecast", payload: data });
        // console.log(position);
      } catch (error) {
        if (error.name === "AbortError") {
          console.error(error);
          return;
        }
        // setError(error);
      } finally {
        // setIsLoading(false);
      }
    }

    if (position !== null) {
      handlePositionChange();
      // console.log(position);
    }

    return () => {
      // Abort previous api call
      weatherAbortControllerRef.current?.abort();
    };
  }, [position]);

  const setPosition = (position) => {
    console.log(position);
    dispatch({
      type: "setPosition",
      payload: position,
    });
  };

  // console.log(
  //   locationName,
  //   currentWeather,
  //   forecast,
  //   // search,
  //   // setPosition,
  //   // isLoading,
  //   // error,
  // );

  return {
    locationName,
    currentWeather,
    forecast,
    // search,
    setPosition,
    isLoading,
    error,
  };
};
