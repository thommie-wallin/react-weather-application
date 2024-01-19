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

export const useGetForecast = (position) => {
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast, setforecast] = useState({});
  const [locationName, setLocationName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const weatherAbortControllerRef = useRef(null);

  // const [
  //   { locationName, currentWeather, forecast, isLoading, error },
  //   // state,
  //   dispatch,
  // ] = useReducer(
  //   (state, action) => {
  //     switch (action.type) {
  //       case "setForecast":
  //         // console.log(action);
  //         return {
  //           ...state,
  //           locationName: action.payload[0].name,
  //           currentWeather: action.payload[0],
  //           forecast: action.payload[1],
  //           isLoading: false,
  //           position: null,
  //         };
  //       case "setPosition":
  //         // console.log(action.payload);
  //         return {
  //           ...state,
  //           position: action.payload,
  //         };
  //       case "isLoading":
  //         return {
  //           ...state,
  //           isLoading: true,
  //         };
  //       case "error":
  //         return {
  //           ...state,
  //           isLoading: false,
  //           error: action.error,
  //         };
  //       case "isLoadingFalse":
  //         return {
  //           ...state,
  //           isLoading: false,
  //         };
  //       default:
  //         return state;
  //     }
  //   },
  //   {
  //     locationName: "",
  //     currentWeather: {},
  //     forecast: {},
  //     // position: null,
  //     isLoading: false,
  //     error: null,
  //   },
  // );

  useEffect(() => {
    // Get weather data from updated position (OpenWeatherMap API).
    async function handlePositionChange() {
      // Create new abortcontroller for new api call
      weatherAbortControllerRef.current = new AbortController();
      const signal = weatherAbortControllerRef.current?.signal;

      setIsLoading(true);
      // dispatch({ type: "isLoading" });
      try {
        const data = await getForecast(position, { signal });
        setLocationName(data[0].name);
        setCurrentWeather(data[0]);
        setforecast(data[1]);
        // dispatch({ type: "setForecast", payload: data });
        // console.log(position);
      } catch (error) {
        if (error.name === "AbortError") {
          console.error(error);
          return;
        }
        setError(error);
        // dispatch({ type: "error", payload: error });
      } finally {
        setIsLoading(false);
        // dispatch({ type: "isLoadingFalse" });
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

  // const setPosition = (position) => {
  //   // console.log(position);
  //   dispatch({
  //     type: "setPosition",
  //     payload: position,
  //   });
  // };

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
    isLoading,
    error,
  };
};
