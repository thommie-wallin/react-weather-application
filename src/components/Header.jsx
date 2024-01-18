import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForecast } from "../contexts/forecast-context";
import { useGetForecast } from "../hooks/useGetForecast";

export const Header = ({ toggleTempUnit, search }) => {
  const [isTempUnit, setIsTempUnit] = useState(false);
  const { locationName } = useForecast();
  // console.log(useForecast());

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
