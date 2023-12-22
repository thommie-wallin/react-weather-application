import { useEffect, useState, useLayoutEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import { WeatherData } from "./api/api.js";
import { getWeatherData, getSearchResult } from "./api/api.js";
import Today from "./components/forecasts/Today.js";
import WeekOverview from "./components/forecasts/WeekOverview.js";
import Hourly from "./components/forecasts/Hourly.js";
import WeekForecast from "./components/forecasts/WeekForecast.js";
import { getGeolocationPos } from "./api/geolocation.js";
import { Header } from "./components/Header.jsx";
import { Search } from "./components/search/Search.js";

function App() {
  const [position, setPosition] = useState(null);
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast, setforecast] = useState({});
  const [isTempUnit, setIsTempUnit] = useState(true);

  // Callback to toggle isTempUnit from header component
  const handleTempUnit = (tempUnit) => {
    setIsTempUnit(tempUnit);
  };

  async function handleSearch(searchData) {
    const data = await getSearchResult(searchData);
    setPosition({
      latitude: data[0].lat,
      longitude: data[0].lon,
    });
  }

  async function handlePositionChange(position) {
    const data = await getWeatherData(position);
    setCurrentWeather(data[0]);
    setforecast(data[1]);
  }

  // If allowed, get user position from Geolocation API before first render.
  useLayoutEffect(() => {
    navigator.permissions.query({ name: "geolocation" }).then(async (res) => {
      if (res.state === "granted") {
        const posObj = await getGeolocationPos();
        setPosition({
          latitude: posObj.coords.latitude,
          longitude: posObj.coords.longitude,
        });
      }
    });
  }, []);

  // Get new longitude and latitude when position updates.
  useEffect(() => {
    if (position !== null) {
      handlePositionChange(position);
    }
  }, [position]);

  return (
    <div className="content">
      <Router>
        <Header
          toggleTempUnit={handleTempUnit}
          locationName={currentWeather.name}
          search={<Search getSearchData={handleSearch} />}
        />
        <div className="router-content">
          <Switch>
            <Route exact path="/">
              {Object.keys(currentWeather).length > 0 && (
                <Today weatherData={currentWeather} isTempUnit={isTempUnit} />
              )}
              {Object.keys(forecast).length > 0 && (
                <WeekOverview weatherData={forecast} isTempUnit={isTempUnit} />
              )}
            </Route>
            <Route path="/hourly">
              {Object.keys(forecast).length > 0 && (
                <Hourly weatherData={forecast} isTempUnit={isTempUnit} />
              )}
            </Route>
            <Route path="/fiveday">
              {Object.keys(forecast).length > 0 && (
                <WeekForecast weatherData={forecast} isTempUnit={isTempUnit} />
              )}
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
