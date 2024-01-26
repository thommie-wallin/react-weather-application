import React from "react";
import { Link } from "react-router-dom";
import { useForecastContext } from "../services/contexts/forecast-context";
import SearchBarContainer from "./layouts/searchbar/SearchBarContainer";

export const Header = () => {
  const { locationName, isTempUnitC, toggleTempUnit } = useForecastContext();

  //? PLace locationName at the top of every page box instead of in the header. Refactor the router component.

  return (
    <header>
      <div className="header">
        <div className="title">
          <h1>Weather App</h1>
          <button onClick={toggleTempUnit}>
            Change to {isTempUnitC ? "℉" : "℃"}
          </button>
        </div>
        <SearchBarContainer />
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
