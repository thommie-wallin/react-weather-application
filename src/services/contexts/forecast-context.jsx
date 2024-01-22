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

export const ForecastContext = createContext(undefined);
// export const ForecastContext = createContext();

export function useForecast() {
  const context = useContext(ForecastContext);

  if (context === undefined) {
    throw new Error("useForecast must be used within ForecastContext");
  }

  return context;
}

export function ForecastProvider({ children }) {
  const [user, setuser] = useState(null);

  // const [currentWeather, setCurrentWeather] = useState({});
  // const [forecast, setforecast] = useState({});

  const [state, dispatch] = useReducer(forecastReducer, initialState);

  // const setPosition = (position) => {
  //   // setForecast(position);

  //   dispatch({
  //     type: "SET_POSITION",
  //     payload: position,
  //   });
  // };

  const setForecast = (forecastData) => {
    // const { currentWeather, forecast } = useGetForecast(position);
    // console.log(forecastData[0]);
    dispatch({
      type: "SET_FORECAST",
      payload: {
        // forecastData,
        currentWeather: forecastData[0],
        forecast: forecastData[1],
      },
    });
  };

  const toggleTempUnit = () => {
    dispatch({
      type: "SET_TEMPUNIT",
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
    // user,
    // setuser,
    currentWeather: state.currentWeather,
    // setCurrentWeather,
    forecast: state.forecast,
    // setforecast,
    // locationName: state.locationName,
    // currentWeather: state.currentWeather,
    // forecast: state.forecast,
    // position: state.position,
    // isLoading: state.isLoading,
    // error: state.error,
    isTempUnitC: state.isTempUnitC,
    setForecast,
    toggleTempUnit,
    // setPosition,
  };

  return (
    // <ForecastContext.Provider value={useGetForecast()}>
    <ForecastContext.Provider value={value}>
      {children}
    </ForecastContext.Provider>
  );
}
