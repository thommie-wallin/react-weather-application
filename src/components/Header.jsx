import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
// import { useForecast } from "../App.jsx";
import { useGetForecast } from "../hooks/useGetForecast";
import { ForecastContext } from "../services/contexts/forecast-context";
import { useForecast } from "../services/contexts/forecast-context";

export const Header = ({ search }) => {
  // const { user, setuser } = useContext(ForecastContext);
  const { locationName, isTempUnitC, toggleTempUnit } = useForecast();

  // const [isTempUnitC, setisTempUnitC] = useState(false);

  // Toggle temperature unit and send to parent
  // const sendData = () => {
  //   setisTempUnitC(isTempUnitC ? false : true);
  //   toggleTempUnit(isTempUnitC);
  // };

  return (
    <header>
      <div className="header">
        <div className="title">
          <h1>Weather App</h1>
          <button onClick={toggleTempUnit}>
            Change to {isTempUnitC ? "℉" : "℃"}
          </button>
        </div>
        <div className="search">{search}</div>
        <div className="location">
          <h3>{locationName ? locationName : "Welcome"}</h3>
          {/* <h3>{user ? user : "Welcome"}</h3> */}
        </div>
      </div>
      <nav className="navbar">
        <ul className="nav-list">
          <Link to="/" className="nav-list-link">
            <li>Today</li>
          </Link>
          <Link to="/hourly" className="nav-list-link">
            <li>Hourly</li>
          </Link>
          <Link to="/fivedays" className="nav-list-link">
            <li>5 day</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
};
