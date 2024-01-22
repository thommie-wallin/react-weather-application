import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
// import { useForecast } from "../App.jsx";
import { useGetForecast } from "../hooks/useGetForecast";
import { ForecastContext } from "../services/contexts/forecast-context";
import { useForecast } from "../services/contexts/forecast-context";

export const Header = ({ locationName, search }) => {
  // const { user, setuser } = useContext(ForecastContext);
  const { isTempUnitC, toggleTempUnit } = useForecast();
  // console.log(isTempUnitC);

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
        <ul className="navList">
          <li>
            <Link to="/today">Today</Link>
          </li>
          <li>
            <Link to="/hourly">Hourly</Link>
          </li>
          <li>
            <Link to="/fivedays">5 day</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
