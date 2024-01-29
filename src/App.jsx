import React from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import useGetGeolocationPosition from "./hooks/useGetGeolocationPosition.jsx";
import { useForecastContext } from "./services/contexts/forecast-context.jsx";
import { useGetForecast } from "./hooks/useGetForecast.jsx";
import router from "./router/create-router.jsx";

function App() {
  // const { position } = useForecastContext();

  // // If allowed, get user position (Geolocation API).
  // useGetGeolocationPosition();

  // // Get weather data from updated position (OpenWeatherMap API).
  // useGetForecast(position);

  // const [cities, setCities] = useState([]);
  // const addCity = (name, temperature) => {
  //   const newCity = { name, temperature };
  //   setCities((prevCities) => [...prevCities, { name, temperature }]);
  // };

  return <RouterProvider router={router} />;
}

export default App;
