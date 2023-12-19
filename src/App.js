import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import { useWeatherData } from "./api/api.js";
import Today from "./components/Today";
import WeekOverview from "./components/WeekOverview";
import Hourly from "./components/Hourly";
import WeekForecast from "./components/WeekForecast";
import { getGeolocationPos } from "./api/geolocation.js";
import { Header } from "./components/Header.jsx";
import { Search } from "./components/search/Search.js";

function App() {
  // const { latitude, longitude, error } = useGeolocation();
  // const geolocationPosition = getGeolocationPos();
  // console.log(geolocationPosition);

  // useEffect(() => {}, []);

  // const { weatherData } = useWeatherData();
  // console.log(location);
  const [userLocation, setUserLocation] = useState(null);
  const [isTempUnit, setIsTempUnit] = useState(true);

  // Callback to toggle isTempUnit from header component
  const handleTempUnit = (tempUnit) => {
    setIsTempUnit(tempUnit);
  };

  navigator.permissions.query({ name: "geolocation" });
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
    <Router>
      <div className="content">
        <Header
          toggleTempUnit={handleTempUnit}
          search={<Search getSearchData={handleSearch} />}
        />
        <div className="router-content">
          <Switch>
            <Route exact path="/">
              {/* {Object.keys(weatherData).length > 0 && (
                <Today weatherData={weatherData} isTempUnit={isTempUnit} />
              )}
              {Object.keys(weatherData).length > 0 && (
                <WeekOverview
                  weatherData={weatherData}
                  isTempUnit={isTempUnit}
                />
              )} */}
            </Route>
            <Route path="/hourly">
              {/* {Object.keys(weatherData).length > 0 && (
                <Hourly weatherData={weatherData} isTempUnit={isTempUnit} />
              )} */}
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
      </div>
    </Router>
  );
}

export default App;
