import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header.jsx";
import useGetGeolocationPosition from "./hooks/useGetGeolocationPosition.jsx";
import { useForecastContext } from "./services/contexts/forecast-context.jsx";
import TodayPage from "./pages/dashboard/today.jsx";
import HourlyPage from "./pages/dashboard/hourly.jsx";
import FiveDayPage from "./pages/dashboard/five-day.jsx";
import { useGetForecast } from "./hooks/useGetForecast.jsx";

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
          <Switch>
            <Route exact path="/">
              <TodayPage />
            </Route>
            <Route path="/hourly">
              <HourlyPage />
            </Route>
            <Route path="/fivedays">
              <FiveDayPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
