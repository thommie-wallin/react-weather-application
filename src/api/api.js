import { useState, useEffect } from "react";
import { getGeolocationPos } from "./geolocation";
import { WEATHER_API_URL } from "../utils/constants";
import fakeData from "../apiCall.json";

async function makeAPICall(endpoint) {
  const res = await fetch(endpoint);
  if (res.status !== 200) {
    throw new Error("Unable to send weather data");
  }
  const data = await res.json();
  return data;
}

async function makeMultipleAPICalls(endpoints) {
  const promises = endpoints.map(makeAPICall);
  const responses = await Promise.all(promises);
  return responses;
}

// Multiple endpoints
// const responses = await makeMultipleAPICalls([
//   "https://api.example.com/v1/endpoint1",
//   "https://api.example.com/v1/endpoint2",
//   "https://api.example.com/v1/endpoint3",
// ]);

// Geolocation API weather
// Search term weather

export const useWeatherData = async () => {
  // const positionObj = await getGeolocationPos();
  // console.log(positionObj);
  // const apiKey = process.env.WEATHER_API_KEY;
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  // const [weatherData, setWeatherData] = useState({});
  // const [weatherData, setWeatherData] = useState(fakeData);
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast, setforecast] = useState({});
  const [latitud, setlatitud] = useState(null);
  const [longitud, setLongitud] = useState(null);
  // const parameter = "alert,minutely";

  // getGeolocationPos()
  //   .then((data) => {
  //     setlatitud(data.coords.latitud);
  //     setLongitud(data.coords.longitud);
  //     console.log(data.coords);
  //   })
  //   .catch((err) => {
  //     console.error(err.message);
  //   });

  try {
    const res = await getGeolocationPos();
    const { latitude, longitude } = res.coords;

    // Multiple API requests in parallel
    // const responses = await makeMultipleAPICalls([
    //   `${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`,
    //   `${WEATHER_API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`,
    // ]);
    // console.log(latitude, longitude);
  } catch (err) {
    console.error(err.message);
  }

  // Multiple API requests in parallel
  // const responses = await makeMultipleAPICalls([
  //   `${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`,
  //   `${WEATHER_API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`,
  // ]);

  // console.log(latitude, longitude);
  // const currentWeatherPromise = fetch(
  //   `${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
  // );
  // const weatherForecastPromise = fetch(
  //   `${WEATHER_API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
  // );

  // useEffect(() => {
  //   if (latitude && longitude) {
  //     fetch(
  //       `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=${parameter}&appid=${apiKey}`
  //     )
  //       .then((response) => response.json())
  //       .then((data) => setWeatherData(data));
  //   }
  // }, [latitude, longitude, apiKey]);

  // return { weatherData, error };
  // return { weatherData };
};
