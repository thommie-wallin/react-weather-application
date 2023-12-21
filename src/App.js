import { useEffect, useState, useLayoutEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import { WeatherData } from "./api/api.js";
import { getWeatherData } from "./api/api.js";
import Today from "./components/forecasts/Today.js";
import WeekOverview from "./components/forecasts/WeekOverview.js";
import Hourly from "./components/forecasts/Hourly.js";
import WeekForecast from "./components/WeekForecast";
import { getGeolocationPos } from "./api/geolocation.js";
import { Header } from "./components/Header.jsx";
import { Search } from "./components/search/Search.js";

function App() {
  const [position, setPosition] = useState(null);
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast, setforecast] = useState({});
  // const { latitude, longitude, error } = useGeolocation();
  // const geolocationPosition = getGeolocationPos();
  // console.log(geolocationPosition);

  async function handlePositionChange(position) {
    const data = await getWeatherData(position);
    setCurrentWeather(data[0]);
    setforecast(data[1]);
  }

  //! Kanske behöver lägga in useWeatherData i denna hook för att sidan ska ha data innan något syns på skärmen.
  useLayoutEffect(() => {
    navigator.permissions
      .query({ name: "geolocation" })
      .then(async (res) => {
        if (res.state === "granted") {
          const posObj = await getGeolocationPos();
          setPosition({
            latitude: posObj.coords.latitude,
            longitude: posObj.coords.longitude,
          });
          // console.log(position);
        }
      })
      .then(() => {
        // const data = handlePositionChange(position);
        // const data = await getWeatherData(position);
        // console.log(position);
        // const weatherData = WeatherData(position);
        // console.log(res);
      });
  }, []);

  // const { weatherData } = WeatherData(position);
  // console.log(weatherData);

  useEffect(() => {
    // handlePositionChange(position);
    // const { weatherData } = WeatherData();
    // console.log(weatherData);
    if (position !== null) {
      handlePositionChange(position);
      // console.log(position);
    }
  }, [position]);

  // const { weatherData } = useWeatherData();
  // console.log(location);

  const [isTempUnit, setIsTempUnit] = useState(true);

  // Callback to toggle isTempUnit from header component
  const handleTempUnit = (tempUnit) => {
    setIsTempUnit(tempUnit);
  };

  // navigator.permissions.query({ name: "geolocation" });
  // .then((res) => console.log(res.state));
  // console.log("geolocation" in navigator);
  // console.log(navigator);

  //! Behöver en komponent för att visa väder som får data antingen från Geoloaction API eller sök-komponent.

  // const getUserLocation = () => {
  //   // if geolocation is supported by the users browser
  //   if (navigator.geolocation) {
  //     // get the current users location
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         // save the geolocation coordinates in two variables
  //         const { latitude, longitude } = position.coords;
  //         // update the value of userlocation variable
  //         setUserLocation({ latitude, longitude });
  //         console.log(userLocation);
  //       },
  //       // if there was an error getting the users location
  //       (error) => {
  //         console.error("Error getting user location:", error);
  //       }
  //     );
  //   }
  //   // if geolocation is not supported by the users browser
  //   else {
  //     console.error("Geolocation is not supported by this browser.");
  //   }
  // };
  // useEffect(() => {
  //   getUserLocation();
  //   useGeolocation();
  // }, []);

  const handleSearch = (searchData) => {
    console.log(searchData);
  };

  return (
    <div className="content">
      <Router>
        <Header
          toggleTempUnit={handleTempUnit}
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
              {/* {Object.keys(weatherData).length > 0 && (
                <WeekForecast
                  weatherData={weatherData}
                  isTempUnit={isTempUnit}
                />
              )} */}
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
