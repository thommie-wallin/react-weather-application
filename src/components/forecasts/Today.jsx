import React from "react";
import "../../styles/Today.css";
import { tempUnitConverter } from "../../utils/numberUtils";
import { useForecastContext } from "../../services/contexts/forecast-context";
import HeroCard from "../ui/HeroCard";
import { IMAGE_API_URL } from "../../utils/constants";
import useGetTime from "../../hooks/useGetTime";
import TodayDisplay from "../layouts/forecast/TodayDisplay";

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
      <TodayDisplay
        temp={temp}
        isTempUnitC={isTempUnitC}
        currentWeather={currentWeather}
        sunrise={sunrise}
        sunset={sunset}
        iconsURL={iconsURL}
      />
    </HeroCard>
  );
};

export default Today;
