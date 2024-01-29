import React from "react";
import "../../styles/Today.css";
import { tempUnitConverter } from "../../utils/numberUtils";
import { useForecastContext } from "../../services/contexts/forecast-context";
import HeroCard from "../ui/HeroCard";
import { IMAGE_API_URL } from "../../utils/constants";
import useGetTime from "../../hooks/useGetTime";

const Today = () => {
  const { currentWeather, locationName, isTempUnitC } = useForecastContext();

  // Get sunrise/sunset.
  const sunrise = useGetTime(currentWeather.sys.sunrise);
  const sunset = useGetTime(currentWeather.sys.sunset);

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
