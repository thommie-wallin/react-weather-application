import "./../../styles/WeekForecast.css";
import { IMAGE_API_URL } from "./../../utils/constants.js";
import { filterArr, tempUnitConverter } from "./../../utils/numberUtils.js";

const WeekForecast = ({ weatherData, isTempUnit }) => {
  // Filter 5 day / 3 hour forecast-data (each day have 8 readings).
  const dailyForecasts = filterArr(weatherData.list, 8);

  // Get data from every third hour from a day
  const dateData = dailyForecasts.map((d, i) => {
    // Get the dates and weekdays
    const dates = new Date(d.dt * 1000).toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
    });

    // Check if user choose celsius or fahrenheit, temp rounded to one decimal and parsed into an integer.
    const temperature = tempUnitConverter(isTempUnit, d.main.temp);

    const windSpeed = d.wind.speed;
    const humidity = d.main.humidity;

    // Get weather icons URL endpoints
    const iconsURL = `${IMAGE_API_URL}/${d.weather[0].icon}.png`;

    const element = (
      <li key={i}>
        {dates} {temperature}
        {isTempUnit ? "℃" : "℉"} <img src={iconsURL} alt={d.weather[0].main} />{" "}
        {d.weather[0].description} {windSpeed}m/s {humidity}%
      </li>
    );

    return element;
  });

  return (
    <div className="content-forecast">
      <h3>5 Day Weather</h3>
      <ul className="list-forecast">{dateData}</ul>
    </div>
  );
};

export default WeekForecast;
