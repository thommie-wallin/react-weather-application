import React from "react";
const openWeatherMapLogoUrl = new URL(
  "../../../assets/images/OpenWeather.png",
  import.meta.url,
).href;

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <span className="footer-text">
          Weather data provided by{" "}
          <a href="https://openweathermap.org/">OpenWeather</a>
        </span>
        <img
          src={openWeatherMapLogoUrl}
          alt="Open Weather Map logo"
          loading="lazy"
        />
      </div>
    </footer>
  );
};

export default Footer;
