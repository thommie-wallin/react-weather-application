import React from "react";
import "../../styles/Hourly.css";
import { tempUnitConverter } from "../../utils/numberUtils.jsx";
import { IMAGE_API_URL } from "../../utils/constants.jsx";
import { useForecastContext } from "../../services/contexts/forecast-context.jsx";
import Card from "../ui/Card.jsx";
import useGetTime from "../../hooks/useGetTime.jsx";
import HourlyDisplay from "../layouts/forecast/HourlyDisplay.jsx";

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

    const description = d.weather[0].description;

    return {
      hour,
      temperature,
      windSpeed,
      humidity,
      iconsURL,
      description,
    };
  });

  return (
    <Card title={`Hourly weather - ${date}`}>
      <HourlyDisplay hourlyData={hourlyData} isTempUnitC={isTempUnitC} />
    </Card>
  );
};

export default Hourly;
