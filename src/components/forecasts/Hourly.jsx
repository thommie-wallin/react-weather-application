import React from "react";
import "../../styles/Hourly.css";
import { tempUnitConverter } from "../../utils/numberUtils.jsx";
import { IMAGE_API_URL } from "../../utils/constants.jsx";
import { useForecastContext } from "../../services/contexts/forecast-context.jsx";
import Card from "../ui/Card.jsx";
import useGetTime from "../../hooks/useGetTime.jsx";

const Hourly = () => {
  const { forecast, isTempUnitC } = useForecastContext();

  // Get todays date
  const date = new Date(forecast.list[0].dt * 1000).toDateString();

  // Get data from every third hour from a day
  const hourlyData = forecast.list.slice(0, 8).map((d, i) => {
    // Get the hour
    const hour = useGetTime(d.dt);

    // Check if user choose celsius or fahrenheit, temp rounded to one decimal and parsed into an integer.
    const temperature = tempUnitConverter(isTempUnitC, d.main.temp);

    const windSpeed = d.wind.speed;
    const humidity = d.main.humidity;

    // Get weather icons URL endpoints
    const iconsURL = `${IMAGE_API_URL}/${d.weather[0].icon}.png`;

    const element = (
      <li key={i} className="hourly-list-item">
        <p>{hour}</p>
        <p className="hourly-list-temp">
          {temperature}{" "}
          <span className="tempUnit-letter">{isTempUnitC ? "℃" : "℉"}</span>
          <span className="tempUnit-symbol">°</span>
        </p>
        <img src={iconsURL} alt={d.weather[0].main} />{" "}
        <p className="hourly-list-description">{d.weather[0].description}</p>
        <p>{windSpeed}m/s</p>
        <p>{humidity}%</p>
      </li>
    );

    return element;
  });

  return (
    <Card title={`Hourly weather - ${date}`}>
      <ul className="list-hourly">{hourlyData}</ul>
    </Card>
  );
};

export default Hourly;
