import React from "react";
import { useForecastContext } from "../../../services/contexts/forecast-context";
import SearchBarContainer from "./search-bar/SearchBarContainer";
import NavBar from "./NavBar";
import TempUnitButton from "./TempUnitButton";
import LocationButton from "./LocationButton";
import LocationList from "./location-list/LocationList";

export const Header = () => {
  const { locationName, isTempUnitC, toggleTempUnit } = useForecastContext();

  return (
    <header>
      <div className="header">
        <div className="header-title">
          <h1 className="title">Weather App</h1>
          <div className="header-buttons">
            <LocationButton />
            <TempUnitButton
              isTempUnitC={isTempUnitC}
              toggleTempUnit={toggleTempUnit}
            />
          </div>
        </div>
        <SearchBarContainer />
        <LocationList />
      </div>
      <NavBar />
    </header>
  );
};
