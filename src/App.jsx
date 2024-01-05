import React, { useEffect, useState, useLayoutEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
// import { WeatherData } from "./api/api.jsx";
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

function App() {
  const [position, setPosition] = useState(null);
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast, setforecast] = useState({});
  const [isTempUnit, setIsTempUnit] = useState(true);
  // const [searchChange, setSearchChange] = useState(null);
  const [searchResult, setSearchResult] = useState({});

  // Callback to toggle isTempUnit from header component
  const handleTempUnit = (tempUnit) => {
    setIsTempUnit(tempUnit);
  };

  async function handleSearch(searchData) {
    const data = await getSearchResult(searchData);
    // console.log(data);
    setPosition({
      latitude: data[0].lat,
      longitude: data[0].lon,
    });
  }

  // async function searchLocation(searchTerm) {
  //   const data = await getSearchLocation(searchTerm);
  //   setSearchResult(data);
  //   // console.log(data);
  //   // return data;
  // }

  async function handleOnSearchChange(searchData) {
    if (searchData.trim().length !== 0) {
      const data = await getSearchLocation(searchData);
      setSearchResult(data);
      // console.log(data);
      // setSearchChange(searchData);
      // setSearchResult(null);
      // const data = await getSearchLocation(searchData);
      // setSearchChange(searchData);
      // console.log(searchData);
    }
    // if (searchData) {
    //   const data = await getSearchLocation(searchData);
    //   setSearchResult(data);
    // }

    //
  }

  function searchTyping() {}

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

  // useEffect(() => {
  //   if (searchChange !== null) {
  //     searchLocation(searchChange);
  //   }
  // }, [searchChange]);

  // Get new longitude and latitude when position updates.
  useEffect(() => {
    if (position !== null) {
      handlePositionChange(position);
      console.log(position);
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
              Autocomplete={
                Object.keys(searchResult).length > 0 && (
                  <Autocomplete
                    searchResult={searchResult}
                    getSearchData={setPosition}
                  />
                )
              }
              // searchResult={searchResult}
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
