import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header.jsx";
import { Search } from "./components/search/Search.jsx";
import Autocomplete from "./components/search/Autocomplete.jsx";

import useGetGeolocationPosition from "./hooks/useGetGeolocationPosition.jsx";
import { getForecast } from "./services/api/forecast.jsx";
import { getPosition } from "./services/api/position.jsx";
import { getAutocompleteItems } from "./services/api/autocomplete-list.jsx";
import { useForecast } from "./services/contexts/forecast-context.jsx";
import TodayPage from "./pages/dashboard/today.jsx";
import HourlyPage from "./pages/dashboard/hourly.jsx";
import FiveDayPage from "./pages/dashboard/five-day.jsx";
import { useGetForecast } from "./hooks/useGetForecast.jsx";

function App() {
  const {
    position,
    isLoading,
    setPosition,
    setForecast,
    loadingStart,
    loadingStop,
    setError,
  } = useForecast();

  // If allowed, get user position (Geolocation API).
  useGetGeolocationPosition();

  // Get weather data from updated position (OpenWeatherMap API).
  useGetForecast(position);

  // const [currentWeather, setCurrentWeather] = useState({});
  // const [forecast, setforecast] = useState({});

  // console.log(currentWeather);

  // const [cityName, setCityName] = useState("");

  // const [isTempUnitC, setisTempUnitC] = useState(true);

  // const [position, setPosition] = useState(null);
  const [searchResult, setSearchResult] = useState({});
  const [autocompleteOpen, setAutocompleteOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(null);
  let autocompleteRef = useRef();

  // Using useRef() to handle each API call in case of user aborting the request without a rerendering of app.
  const autocompleteAbortControllerRef = useRef();
  const weatherAbortControllerRef = useRef(null);
  const searchAbortControllerRef = useRef(null);

  // const [isLoading, setIsLoading] = useState(false);
  const [autocompleteIsLoading, setAutocompleteIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  // Callback to toggle isTempUnitC from header component
  // const handleTempUnit = (tempUnit) => {
  //   setisTempUnitC(tempUnit);
  // };

  // const addCityName = (name) => {
  //   // const context = useForecast();
  //   // console.log(context);
  //   setCityName((name) => {
  //     name;
  //   });
  // };

  // Get weather for searched location (Geocoded API OpenWeatherMap).
  async function handleSearch(searchData) {
    // Abort previous api call
    searchAbortControllerRef.current?.abort();
    // Create new abortcontroller for new api call
    searchAbortControllerRef.current = new AbortController();
    const signal = searchAbortControllerRef.current?.signal;

    loadingStart();
    try {
      const data = await getPosition(searchData, { signal });
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
      loadingStop();
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
        const data = await getAutocompleteItems(searchData, signal);
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

    loadingStart();
    try {
      const data = await getForecast(position, { signal });
      setForecast(data);
    } catch (error) {
      console.log(error);
      if (error.name === "AbortError") {
        console.error(error);
        return;
      }
      setError(error);
    } finally {
      loadingStop();
    }
  }

  // If allowed, get user position from Geolocation API before first render.
  // useEffect(() => {
  //   navigator.permissions.query({ name: "geolocation" }).then(async (res) => {
  //     setIsLoading(true);
  //     if (res.state === "granted") {
  //       try {
  //         const posObj = await getGeolocationPosition();
  //         // console.log(posObj);
  //         setPosition({
  //           latitude: posObj.coords.latitude,
  //           longitude: posObj.coords.longitude,
  //         });
  //       } catch (error) {
  //         setError(error);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     }
  //   });
  // }, []);

  // useGetGeolocationPosition(setPosition, setIsLoading, setError);

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
  // useEffect(() => {
  //   if (position !== null) {
  //     handlePositionChange(position);
  //   }
  // }, [position]);

  // const [cities, setCities] = useState([]);
  // const addCity = (name, temperature) => {
  //   const newCity = { name, temperature };
  //   setCities((prevCities) => [...prevCities, { name, temperature }]);
  // };

  return (
    <div className="content">
      <Router>
        <Header
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
