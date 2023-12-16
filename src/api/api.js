import { useState, useEffect } from 'react';
import { useGeolocation } from './geolocation';

export const useWeatherData = () => {
  const {latitude, longitude, error} = useGeolocation();
  const [weatherData, setWeatherData] = useState({});
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const parameter = 'alert,minutely';

  useEffect(() => {
    if (latitude && longitude) {
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=${parameter}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => setWeatherData(data));
    }
  }, [latitude, longitude, apiKey])

  return {weatherData, error};
}
