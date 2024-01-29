import React from "react";
import "../../styles/Today.css";
import { tempUnitConverter } from "../../utils/numberUtils";
import { useForecastContext } from "../../services/contexts/forecast-context";
import HeroCard from "../ui/HeroCard";
import { IMAGE_API_URL } from "../../utils/constants";

const Today = () => {
  const { currentWeather, locationName, isTempUnitC } = useForecastContext();
  const sunrise = new Date(
    currentWeather.sys.sunrise * 1000,
  ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const sunset = new Date(currentWeather.sys.sunset * 1000).toLocaleTimeString(
    [],
    { hour: "2-digit", minute: "2-digit" },
  );

  // Toggle celsius or fahrenheit, temp rounded to one decimal.
  const temp = tempUnitConverter(isTempUnitC, currentWeather.main.temp);

  // Get weather icons URL-endpoint.
  const iconsURL = `${IMAGE_API_URL}/${currentWeather.weather[0].icon}.png`;

  return (
    <HeroCard title={locationName}>
      <div className="hero-list-today">
        <ul className="list-today">
          <li>
            <p className="today-list-temp">
              {temp}{" "}
              <span className="tempUnit-letter">{isTempUnitC ? "℃" : "℉"}</span>
              <span className="tempUnit-symbol">°</span>
            </p>
          </li>
          <li>Wind speed: {currentWeather.wind.speed} m/s</li>
          <li>Humidity: {currentWeather.main.humidity} %</li>
          <li>
            Sunrise/Sunset: {sunrise}/{sunset}
          </li>
        </ul>
        <img src={iconsURL} alt={currentWeather.weather[0].main} />
      </div>
    </HeroCard>
  );
};

export default Today;
