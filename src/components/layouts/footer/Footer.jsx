import React from "react";
import OpenWeatherMapLogo from "../../../assets/images/OpenWeather.png";

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <span className="footer-text">
          Weather data provided by{" "}
          <a href="https://openweathermap.org/">OpenWeather</a>
        </span>
        <img src={OpenWeatherMapLogo} alt="Open Weather Map logo" />
      </div>
    </footer>
  );
};

export default Footer;
