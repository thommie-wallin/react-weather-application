import React from "react";
import { Link } from "react-router-dom";
import { useForecast } from "../services/contexts/forecast-context";

export const Header = ({ search }) => {
  const { locationName, isTempUnitC, toggleTempUnit } = useForecast();

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
