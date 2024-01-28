import React from "react";
import { useForecastContext } from "../../../services/contexts/forecast-context";
import SearchBarContainer from "./searchbar/SearchBarContainer";
import NavBar from "./NavBar";

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
      <NavBar />
    </header>
  );
};
