import React, { useEffect, useState, useLayoutEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { getWeatherData, getSearchResult } from "./api/api.jsx";
import Today from "./components/forecasts/Today.jsx";
import WeekOverview from "./components/forecasts/WeekOverview.jsx";
import Hourly from "./components/forecasts/Hourly.jsx";
import WeekForecast from "./components/forecasts/WeekForecast.jsx";
import { getGeolocationPos } from "./api/geolocation.jsx";
import { Header } from "./components/Header.jsx";
import { Search } from "./components/search/Search.jsx";
import Autocomplete from "./components/search/Autocomplete.jsx";
import { getSearchLocation } from "./api/geoDB.jsx";

function App() {
  const [position, setPosition] = useState(null);
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast, setforecast] = useState({});
  const [isTempUnit, setIsTempUnit] = useState(true);
  const [searchResult, setSearchResult] = useState({});
  const [autocompleteOpen, setAutocompleteOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(null);
  let autocompleteRef = useRef();
  const abortControllerRef = useRef();

  // Callback to toggle isTempUnit from header component
  const handleTempUnit = (tempUnit) => {
    setIsTempUnit(tempUnit);
  };

  // Get weather for searched location (Geocoded API OpenWeatherMap).
  async function handleSearch(searchData) {
    const data = await getSearchResult(searchData);
    setPosition({
      latitude: data[0].lat,
      longitude: data[0].lon,
    });
  }

  // Get search suggestions for autocomplete component (GeoDB-cities API).
  async function handleOnSearchChange(searchData) {
    if (searchData !== null) {
      // Abort unfinished api request.
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      // Create new abortController() for new request.
      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;

      const data = await getSearchLocation(searchData, signal);
      setSearchResult(data);
      setAutocompleteOpen(true);
    }
  }

  // Get weather data from updated position (OpenWeatherMap API).
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

  // Close autocomplete when click outside of search component.
  useEffect(() => {
    let handler = (e) => {
      if (
        !autocompleteRef.current?.contains(e.target) &&
        e.target.id !== "search-input"
      ) {
        setAutocompleteOpen(false);
      }
    };
    // document.addEventListener("mousedown", handler);
    document.addEventListener("click", handler);
    return () => {
      // document.removeEventListener("mousedown", handler);
      document.removeEventListener("click", handler);
    };
  }, []);

  // Get new forecast when position updates.
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
          search={
            <Search
              getSearchData={handleSearch}
              onSearchChange={handleOnSearchChange}
              setAutocompleteOpen={setAutocompleteOpen}
              setSearchTerm={setSearchTerm}
              autocomplete={
                // Object.keys(searchResult).length > 0 && (
                <Autocomplete
                  searchResult={searchResult}
                  setSearchResult={setSearchResult}
                  setPosition={setPosition}
                  autocompleteOpen={autocompleteOpen}
                  ref={autocompleteRef}
                />
                // )
              }
            />
          }
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
