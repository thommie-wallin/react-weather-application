import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header.jsx";
import useGetGeolocationPosition from "./hooks/useGetGeolocationPosition.jsx";
import { useForecastContext } from "./services/contexts/forecast-context.jsx";
import TodayPage from "./pages/dashboard/today.jsx";
import HourlyPage from "./pages/dashboard/hourly.jsx";
import FiveDayPage from "./pages/dashboard/five-day.jsx";
import { useGetForecast } from "./hooks/useGetForecast.jsx";
// import { routes } from "./config/routes.jsx";
import RouterController from "./components/ui/Route.jsx";

function App() {
  const { position } = useForecastContext();

  // If allowed, get user position (Geolocation API).
  useGetGeolocationPosition();

  // Get weather data from updated position (OpenWeatherMap API).
  useGetForecast(position);

  // const [cities, setCities] = useState([]);
  // const addCity = (name, temperature) => {
  //   const newCity = { name, temperature };
  //   setCities((prevCities) => [...prevCities, { name, temperature }]);
  // };

  return (
    <div className="content">
      <Router>
        <Header />
        <div className="router-content">
          <Routes>
            <Route path="/today" element={<TodayPage />} />
            <Route path="/hourly" element={<HourlyPage />} />
            <Route path="/fivedays" element={<FiveDayPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
