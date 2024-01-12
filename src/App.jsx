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
  const autocompleteAbortControllerRef = useRef();
  const weatherAbortControllerRef = useRef(null);
  const searchAbortControllerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [autocompleteIsLoading, setAutocompleteIsLoading] = useState(false);
  const [error, setError] = useState();

  // Callback to toggle isTempUnit from header component
  const handleTempUnit = (tempUnit) => {
    setIsTempUnit(tempUnit);
  };

  // Get weather for searched location (Geocoded API OpenWeatherMap).
  async function handleSearch(searchData) {
    // Abort previous api call
    searchAbortControllerRef.current?.abort();
    // Create new abortcontroller for new api call
    searchAbortControllerRef.current = new AbortController();
    const signal = searchAbortControllerRef.current?.signal;

    setIsLoading(true);
    try {
      const data = await getSearchResult(searchData, { signal });
      setPosition({
        latitude: data[0].lat,
        longitude: data[0].lon,
      });
    } catch (error) {
      if (error.name === "AbortError") {
        console.error(error);
        return;
      }
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  // Get search suggestions for autocomplete component (GeoDB-cities API).
  async function handleOnSearchChange(searchData) {
    if (searchData !== null) {
      // Check if searchdata existed before correcting validation invalid.
      if (searchData === searchTerm) {
        setAutocompleteOpen(true);
        return;
      }

      // Cache search term in state
      setSearchTerm(searchData);

      // Abort unfinished api request.
      if (autocompleteAbortControllerRef.current) {
        autocompleteAbortControllerRef.current.abort();
      }
      // Create new abortController() for new request.
      autocompleteAbortControllerRef.current = new AbortController();
      const signal = autocompleteAbortControllerRef.current.signal;

      setAutocompleteIsLoading(true);
      setAutocompleteOpen(true);
      try {
        const data = await getSearchLocation(searchData, signal);
        setSearchResult(data);
      } catch (error) {
        if (error.name === "AbortError") {
          console.error(error);
          return;
        }
        setError(error);
      } finally {
        setAutocompleteIsLoading(false);
      }
    }
  }

  // Get weather data from updated position (OpenWeatherMap API).
  async function handlePositionChange(position) {
    // Abort previous api call
    weatherAbortControllerRef.current?.abort();
    // Create new abortcontroller for new api call
    weatherAbortControllerRef.current = new AbortController();
    const signal = weatherAbortControllerRef.current?.signal;

    setIsLoading(true);
    try {
      const data = await getWeatherData(position, { signal });
      setCurrentWeather(data[0]);
      setforecast(data[1]);
    } catch (error) {
      if (error.name === "AbortError") {
        console.error(error);
        return;
      }
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  // If allowed, get user position from Geolocation API before first render.
  useLayoutEffect(() => {
    navigator.permissions.query({ name: "geolocation" }).then(async (res) => {
      setIsLoading(true);
      if (res.state === "granted") {
        try {
          const posObj = await getGeolocationPos();
          setPosition({
            latitude: posObj.coords.latitude,
            longitude: posObj.coords.longitude,
          });
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      }
    });
  }, []);

  // Close autocomplete when click outside of search component.
  useEffect(() => {
    let clickOutsideHandler = (e) => {
      if (
        !autocompleteRef.current?.contains(e.target) &&
        e.target.id !== "search"
      ) {
        setAutocompleteOpen(false);
      }
    };
    document.addEventListener("click", clickOutsideHandler);
    return () => {
      document.removeEventListener("click", clickOutsideHandler);
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
              autocomplete={
                <Autocomplete
                  searchResult={searchResult}
                  setSearchResult={setSearchResult}
                  setPosition={setPosition}
                  autocompleteOpen={autocompleteOpen}
                  ref={autocompleteRef}
                  autocompleteIsLoading={autocompleteIsLoading}
                />
              }
            />
          }
        />
        <div className="router-content">
          {error && (
            <p>Something went wrong! Please try again. Error:{error}</p>
          )}
          {isLoading && position !== null && <p>Loading...</p>}
          {currentWeather && forecast && (
            <Switch>
              <Route exact path="/">
                {Object.keys(currentWeather).length > 0 && (
                  <Today weatherData={currentWeather} isTempUnit={isTempUnit} />
                )}
                {Object.keys(forecast).length > 0 && (
                  <WeekOverview
                    weatherData={forecast}
                    isTempUnit={isTempUnit}
                  />
                )}
              </Route>
              <Route path="/hourly">
                {Object.keys(forecast).length > 0 && (
                  <Hourly weatherData={forecast} isTempUnit={isTempUnit} />
                )}
              </Route>
              <Route path="/fiveday">
                {Object.keys(forecast).length > 0 && (
                  <WeekForecast
                    weatherData={forecast}
                    isTempUnit={isTempUnit}
                  />
                )}
              </Route>
            </Switch>
          )}

          {/* {isLoading ? (
          <div className="router-content">
            {error ? (
              <p>Something went wrong! Please try again. Error: {error}</p>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        ) : (
          <div className="router-content">
            <Switch>
              <Route exact path="/">
                {Object.keys(currentWeather).length > 0 && (
                  <Today weatherData={currentWeather} isTempUnit={isTempUnit} />
                )}
                {Object.keys(forecast).length > 0 && (
                  <WeekOverview
                    weatherData={forecast}
                    isTempUnit={isTempUnit}
                  />
                )}
              </Route>
              <Route path="/hourly">
                {Object.keys(forecast).length > 0 && (
                  <Hourly weatherData={forecast} isTempUnit={isTempUnit} />
                )}
              </Route>
              <Route path="/fiveday">
                {Object.keys(forecast).length > 0 && (
                  <WeekForecast
                    weatherData={forecast}
                    isTempUnit={isTempUnit}
                  />
                )}
              </Route>
            </Switch>
          </div>
        )} */}
        </div>
      </Router>
    </div>
  );
}

export default App;
