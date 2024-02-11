import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
} from "react";
import { initialState, forecastReducer } from "./forecast-reducer";

const ForecastContext = createContext(undefined);

export function useForecastContext() {
  const context = useContext(ForecastContext);

  if (context === undefined) {
    throw new Error("useForecastContext must be used within ForecastContext");
  } else {
    return context;
  }
}

export function ForecastProvider({ children }) {
  const [state, dispatch] = useReducer(forecastReducer, {}, () => {
    const localStorageLocationList = localStorage.getItem("locationList");
    return {
      ...initialState,
      locationList: localStorageLocationList
        ? JSON.parse(localStorageLocationList)
        : [],
    };
  });

  // Update and set local storage.
  useEffect(() => {
    if (state.locationName !== null) {
      localStorage.setItem("locationList", JSON.stringify(state.locationList));
    }
  }, [state.locationList]);

  const updateLocationList = useCallback((updatedList) => {
    dispatch({
      type: "UPDATE_LOCATION_LIST",
      payload: updatedList,
    });
  }, []);

  const setPosition = useCallback((position) => {
    dispatch({
      type: "SET_POSITION",
      payload: position,
    });
  }, []);

  const setForecast = useCallback((forecastData) => {
    dispatch({
      type: "SET_FORECAST",
      payload: {
        currentWeather: forecastData[0],
        forecast: forecastData[1],
      },
    });
  }, []);

  const toggleTempUnit = useCallback(() => {
    dispatch({
      type: "SET_TEMPUNIT_C",
    });
  }, []);

  const loadingStart = useCallback(() => {
    dispatch({
      type: "LOADING_START",
    });
  }, []);

  const loadingStop = useCallback(() => {
    dispatch({
      type: "LOADING_STOP",
    });
  }, []);

  const setError = useCallback((error) => {
    dispatch({
      type: "ERROR",
      payload: {
        error,
      },
    });
  }, []);

  const value = {
    currentWeather: state.currentWeather,
    forecast: state.forecast,
    position: state.position,
    locationName: state.locationName,
    locationList: state.locationList,
    isLoading: state.isLoading,
    error: state.error,
    isTempUnitC: state.isTempUnitC,
    setForecast,
    setPosition,
    toggleTempUnit,
    loadingStart,
    loadingStop,
    setError,
    updateLocationList,
  };

  return (
    <ForecastContext.Provider value={value}>
      {children}
    </ForecastContext.Provider>
  );
}
