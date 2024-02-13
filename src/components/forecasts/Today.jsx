import React from "react";
import "../../styles/Today.css";
import { tempUnitConverter } from "../../utils/numberUtils";
import { useForecastContext } from "../../services/contexts/forecast-context";
import HeroCard from "../ui/HeroCard";
import useGetTime from "../../hooks/useGetTime";
import TodayDisplay from "../layouts/page-container/pages/TodayDisplay";

const Today = () => {
  const { currentWeather, locationName, isTempUnitC } = useForecastContext();

  // Time of data calculation, unix, UTC
  const timeOfUpdate = useGetTime(currentWeather.dt);

  // Get sunrise/sunset.
  const sunrise = useGetTime(currentWeather.sys.sunrise);
  const sunset = useGetTime(currentWeather.sys.sunset);

  // Toggle celsius or fahrenheit, temp rounded to one decimal.
  const temp = tempUnitConverter(isTempUnitC, currentWeather.main.temp);
  const feelsLikeTemp = tempUnitConverter(
    isTempUnitC,
    currentWeather.main.feels_like,
  );

  // Get weather icons URL-endpoint.
  const iconsURL = currentWeather.weather[0].icon;

  return (
    <HeroCard title={locationName} timeOfUpdate={timeOfUpdate}>
      <TodayDisplay
        temp={temp}
        feelsLikeTemp={feelsLikeTemp}
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
