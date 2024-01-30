import React from "react";
import { useForecastContext } from "../../../services/contexts/forecast-context";
import SearchBarContainer from "./searchbar/SearchBarContainer";
import NavBar from "./NavBar";
import HeaderButton from "./HeaderButton";

export const Header = () => {
  const { locationName, isTempUnitC, toggleTempUnit } = useForecastContext();

  return (
    <header>
      <div className="header">
        <div className="header-title">
          <h1 className="title">Weather App</h1>
          <HeaderButton
            isTempUnitC={isTempUnitC}
            toggleTempUnit={toggleTempUnit}
          />
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
