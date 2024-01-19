import React, {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useEffect,
} from "react";
import { useGetForecast } from "../hooks/useGetForecast";
import { initialState, forecastReducer } from "./forecast-reducer";
import useGetGeolocationPosition from "../hooks/useGetGeolocationPosition";
import getGeolocationPosition from "../hooks/useGetGeolocationPosition";

const ForecastContext = createContext(initialState);

// export function useForecast() {
//   const context = useContext(ForecastContext);

//   if (context === undefined) {
//     throw new Error("useForecast must be used within ForecastContext");
//   }

//   return context;
// }

export function ForecastProvider({ children }) {
  const [state, dispatch] = useReducer(forecastReducer, initialState);

  const setPosition = (position) => {
    // setForecast(position);

    dispatch({
      type: "SET_POSITION",
      payload: position,
    });
  };

  const setForecast = (position) => {
    const { locationName, currentWeather, forecast, isLoading, error } =
      useGetForecast(position);

    dispatch({
      type: "SET_FORECAST",
      payload: {
        locationName,
        currentWeather,
        forecast,
        isLoading,
        error,
      },
    });
  };

  // useGetGeolocationPosition();

  // useEffect(() => {
  //   navigator.permissions.query({ name: "geolocation" }).then(async (res) => {
  //     // setIsLoading(true);
  //     if (res.state === "granted") {
  //       try {
  //         const posObj = await getGeolocationPosition();
  //         console.log(posObj);
  //         setPosition({
  //           latitude: posObj.coords.latitude,
  //           longitude: posObj.coords.longitude,
  //         });
  //       } catch (error) {
  //         // setError(error);
  //       } finally {
  //         // setIsLoading(false);
  //       }
  //     }
  //   });
  // }, []);

  // Get new forecast when position updates.
  // useEffect(() => {
  //   if (state.position !== null) {
  //     // handlePositionChange(position);
  //     // console.log(useGetForecast(position));
  //     // const { currentWeather, forecast, isLoading, error } =
  //     //   useGetForecast(position);
  //     // setPosition(position);
  //   }
  //   // console.log(state.position);
  // }, [state.position]);

  const value = {
    locationName: state.locationName,
    currentWeather: state.currentWeather,
    forecast: state.forecast,
    // position: state.position,
    isLoading: state.isLoading,
    error: state.error,
    setForecast,
    setPosition,
  };

  return (
    // <ForecastContext.Provider value={useGetForecast()}>
    <ForecastContext.Provider value={value}>
      {children}
    </ForecastContext.Provider>
  );
}
