import React, {
  useState,
  createContext,
  useContext,
  useMemo,
  useReducer,
  useEffect,
} from "react";
import { useGetForecast } from "../../hooks/useGetForecast";
import { initialState, forecastReducer } from "./forecast-reducer";
import useGetGeolocationPosition from "../../hooks/useGetGeolocationPosition";
import getGeolocationPosition from "../../hooks/useGetGeolocationPosition";

const ForecastContext = createContext(undefined);

export function useForecast() {
  const context = useContext(ForecastContext);

  if (context === undefined) {
    throw new Error("useForecast must be used within ForecastContext");
  } else {
    return context;
  }
}

export function ForecastProvider({ children }) {
  const [state, dispatch] = useReducer(forecastReducer, initialState);

  const setPosition = (position) => {
    // setForecast(position);

    dispatch({
      type: "SET_POSITION",
      payload: position,
    });
  };

  // const getForecast = (position) => {
  //   const { currentWeather, forecast } = useGetForecast(position);
  //   console.log(currentWeather);
  // };

  const setForecast = (forecastData) => {
    dispatch({
      type: "SET_FORECAST",
      payload: {
        currentWeather: forecastData[0],
        forecast: forecastData[1],
      },
    });
  };

  const toggleTempUnit = () => {
    dispatch({
      type: "SET_TEMPUNIT_C",
    });
  };

  const loadingStart = () => {
    dispatch({
      type: "LOADING_START",
    });
  };

  const setError = (error) => {
    dispatch({
      type: "ERROR",
      payload: {
        error: error,
      },
    });
  };

  const loadingStop = () => {
    dispatch({
      type: "LOADING_STOP",
    });
  };

  const value = {
    currentWeather: state.currentWeather,
    forecast: state.forecast,
    position: state.position,
    locationName: state.locationName,
    isLoading: state.isLoading,
    error: state.error,
    isTempUnitC: state.isTempUnitC,
    setForecast,
    toggleTempUnit,
    loadingStart,
    loadingStop,
    setError,
  };

  return (
    <ForecastContext.Provider value={value}>
      {children}
    </ForecastContext.Provider>
  );
}
