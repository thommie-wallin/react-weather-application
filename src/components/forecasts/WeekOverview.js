import "../../styles/WeekOverview.css";
import { filterArr, getFiveDays } from "../../utils/numberUtils";
import { tempUnitConverter } from "../../utils/numberUtils";
import { IMAGE_API_URL } from "./../../utils/constants.js";

const WeekOverview = ({ weatherData, isTempUnit }) => {
  const dates = getFiveDays();

  // Filter 5 day / 3 hour forecast-data (each day have 8 readings).
  const dailyForecasts = filterArr(weatherData.list, 8);

  // Get temperatures
  const temps = dailyForecasts.map((d) => {
    const temp = tempUnitConverter(isTempUnit, d.main.temp);
    return temp;
  });

  // Get weather icons URL endpoints
  const iconsURL = dailyForecasts.map((d) => {
    return `${IMAGE_API_URL}/${d.weather[0].icon}.png`;
  });

  const renderElement = dailyForecasts.map((d, i) => {
    console.log(d);
    return (
      <li key={i} className="list-item">
        <div className="item">
          <p>
            {dates[i].day} {dates[i].date}
          </p>
          <p>
            {temps[i]} {isTempUnit ? "℃" : "℉"}
          </p>
        </div>
        <img src={iconsURL[i]} alt="" />
      </li>
    );
  });

  return (
    <div className="content-overview">
      <h3>Week overview</h3>
      <ul className="list-overview">{renderElement}</ul>
    </div>
  );
};

export default WeekOverview;
