import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
// import { useForecast } from "../App.jsx";
import { useGetForecast } from "../hooks/useGetForecast";
import { ForecastContext } from "../services/contexts/forecast-context";

export const Header = ({ toggleTempUnit, locationName, search }) => {
  // const { user, setuser } = useContext(ForecastContext);
  // const context = useForecast();
  // console.log(user);

  const [isTempUnit, setIsTempUnit] = useState(false);

  // Toggle temperature unit and send to parent
  const sendData = () => {
    setIsTempUnit(isTempUnit ? false : true);
    toggleTempUnit(isTempUnit);
  };

  return (
    <header>
      <div className="header">
        <div className="title">
          <h1>Weather App</h1>
          <button onClick={sendData}>Change to {isTempUnit ? "℃" : "℉"}</button>
        </div>
        <div className="search">{search}</div>
        <div className="location">
          <h3>{locationName ? locationName : "Welcome"}</h3>
          {/* <h3>{user ? user : "Welcome"}</h3> */}
        </div>
      </div>
      <nav className="navbar">
        <ul className="navList">
          <li>
            <Link to="/">Today</Link>
          </li>
          <li>
            <Link to="/hourly">Hourly</Link>
          </li>
          <li>
            <Link to="/fiveday">5 day</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
