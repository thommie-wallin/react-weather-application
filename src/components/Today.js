import "../styles/Today.css";
import { tempUnitConverter } from "./../utils/converters";

const Today = ({ weatherData, isTempUnit }) => {
  const sunrise = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(
    [],
    { hour: "2-digit", minute: "2-digit" }
  );
  const sunset = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(
    [],
    { hour: "2-digit", minute: "2-digit" }
  );

  // Toggle celsius or fahrenheit, temp rounded to one decimal.
  const temp = tempUnitConverter(isTempUnit, weatherData.main.temp);

  return (
    <div className="content-today">
      <h3>The weather today</h3>
      <ul className="list-today">
        <li>
          <h1>
            {temp} {isTempUnit ? "℃" : "℉"}
          </h1>
        </li>
        <li>Wind speed: {weatherData.wind.speed} m/s</li>
        <li>Humidity: {weatherData.main.humidity} %</li>
        <li>
          Sunrise/Sunset: {sunrise}/{sunset}
        </li>
      </ul>
    </div>
  );
};

export default Today;
