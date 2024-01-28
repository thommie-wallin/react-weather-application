import React from "react";
import "../../styles/Today.css";
import { tempUnitConverter } from "../../utils/numberUtils";
import { useForecastContext } from "../../services/contexts/forecast-context";

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

  return (
    <div className="content-today">
      {/* <h3>The weather today</h3> */}
      <h3>{locationName}</h3>
      <ul className="list-today">
        <li>
          <h1>
            {temp} {isTempUnitC ? "℃" : "℉"}
          </h1>
        </li>
        <li>Wind speed: {currentWeather.wind.speed} m/s</li>
        <li>Humidity: {currentWeather.main.humidity} %</li>
        <li>
          Sunrise/Sunset: {sunrise}/{sunset}
        </li>
      </ul>
    </div>
  );
};

export default Today;
