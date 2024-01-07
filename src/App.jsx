import React, {
  useEffect,
  useState,
  useLayoutEffect,
  useRef,
  forwardRef,
} from "react";
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
import { Autocomplete } from "./components/search/Autocomplete.jsx";
import { getSearchLocation } from "./api/geoDB.jsx";
import data from "../json_server/searchGeoDB.json";

function App() {
  const [position, setPosition] = useState(null);
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast, setforecast] = useState({});
  const [isTempUnit, setIsTempUnit] = useState(true);
  const [searchResult, setSearchResult] = useState({});

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

  async function handleOnSearchChange(searchData) {
    if (searchData !== null) {
      const data = await getSearchLocation(searchData);
      setSearchResult(data);
      toggleAutocomplete();
    }
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

  const [autocompleteOpen, setAutocompleteOpen] = useState(false);
  let autocompleteRef = forwardRef();

  function toggleAutocomplete() {
    const autocomplete = document.querySelector(".autocomplete-container");
    autocomplete.classList.toggle("open");
  }

  useEffect(() => {
    let handler = (e) => {
      // if (autocompleteRef.current.contains(e.target)) {
      //   setAutocompleteOpen(false);
      //   console.log(autocompleteRef.current);
      // }

      // setAutocompleteOpen(false);
      // toggleAutocomplete();
      console.log(autocompleteRef);
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  // const autocomplete = document.querySelector(".body");

  // autocomplete.addEventListener("click", function (event) {
  //   // console.log(event);
  //   // console.log(event.target);
  //   // console.log(event.currentTarget);
  // });

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
              autocomplete={
                // Object.keys(searchResult).length > 0 && (
                <Autocomplete
                  searchResult={searchResult}
                  setSearchResult={setSearchResult}
                  setPosition={setPosition}
                  toggle={toggleAutocomplete}
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
