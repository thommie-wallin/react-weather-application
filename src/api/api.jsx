import { useState, useEffect } from "react";
import { getGeolocationPos } from "./geolocation";
import {
  WEATHER_API_URL,
  IMAGE_API_URL,
  GEOCODING_API_URL,
} from "../utils/constants";
import fakeData from "../getWeatherData.json";

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

export const getWeatherData = (position) => {
  // const { latitude, longitude } = position;
  // const apiKey = import.meta.env.REACT_APP_WEATHER_API_KEY;
  // const responses = makeMultipleAPICalls([
  //   `${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`,
  //   `${WEATHER_API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`,
  // ]);
  // return responses;
  return fakeData;
};

// Geocoding API (Direct geocoding)(Limit(optional): number of search results).
export const getSearchResult = (searchTerm) => {
  const apiKey = import.meta.env.REACT_APP_WEATHER_API_KEY;
  const response = makeAPICall(
    `${GEOCODING_API_URL}/direct?q=${searchTerm}&limit=${1}&appid=${apiKey}`
  );
  return response;
};

// Multiple endpoints
// const responses = await makeMultipleAPICalls([
//   "https://api.example.com/v1/endpoint1",
//   "https://api.example.com/v1/endpoint2",
//   "https://api.example.com/v1/endpoint3",
// ]);

// Geolocation API weather
// Search term weather

export function WeatherData(position) {
  // const positionObj = await getGeolocationPos();
  const apiKey = import.meta.env.REACT_APP_WEATHER_API_KEY;
  // const [weatherData, setWeatherData] = useState({});
  // const [weatherData, setWeatherData] = useState(fakeData);

  const [latitude, setlatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  // const parameter = "alert,minutely";

  // return new Promise((resolve, reject) => {
  //   return { resolve, reject };
  // });

  // Multiple API requests in parallel
  // const responses = await makeMultipleAPICalls([
  //   `${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`,
  //   `${WEATHER_API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`,
  // ]);
  // const weatherResponse = await responses[0];
  // const forcastResponse = await responses[1];

  // setCurrentWeather({ ...weatherResponse });
  // setforecast({ ...forcastResponse });
  // console.log(currentWeather, forecast);

  // getGeolocationPos()
  //   .then(async (response) => {
  //     const { latitude, longitude } = await response.coords;
  //     setlatitude(latitude);
  //     setLongitude(longitude);
  //     // const res = response.coords.json();
  //     // console.log(res);
  //   })
  //   .then((data) => {
  //     console.log(latitude, longitude);
  //   })
  //   .catch((err) => {
  //     console.error(err.message);
  //   });

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
}
