import "../../styles/WeekOverview.css";
import { filterArr } from "../../utils/numberUtils";
import { tempUnitConverter } from "../../utils/numberUtils";
import { IMAGE_API_URL } from "./../../utils/constants.js";

const WeekOverview = ({ weatherData, isTempUnit }) => {
  // Get the next 5 dates and weekdays including today
  const date = new Date();
  const dateArr = [{}, {}, {}, {}, {}];
  const weekDayArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dates = dateArr.map((d, i) => {
    if (i === 0) {
      date.setDate(date.getDate());
    } else {
      date.setDate(date.getDate() + 1);
    }
    const weekDay = weekDayArr[date.getDay()];
    return (d = { day: weekDay, date: date.getDate() });
  });

  // Filter 5 day / 3 hour forecast-data (each day have 8 readings).
  const dailyForecasts = filterArr(weatherData.list, 8);

  // Get temperatures
  const temps = dailyForecasts.map((t) => {
    const temp = tempUnitConverter(isTempUnit, t.main.temp);
    return temp;
  });

  // Get weather icons URL endpoints
  const iconsURL = dailyForecasts.map((data) => {
    return `${IMAGE_API_URL}/${data.weather[0].icon}.png`;
  });

  return (
    <div className="content-overview">
      <h3>Week overview</h3>
      <ul className="list-overview">
        <li className="list-item">
          <div className="item">
            <p>
              {dates[0].day} {dates[0].date}
            </p>
            <p>
              {temps[0]} {isTempUnit ? "℃" : "℉"}
            </p>
          </div>
          <img src={iconsURL[0]} alt="" />
        </li>
        <li className="list-item">
          <div className="item">
            <p>
              {dates[1].day} {dates[1].date}
            </p>
            <p>
              {temps[1]} {isTempUnit ? "℃" : "℉"}
            </p>
          </div>
          <img src={iconsURL[1]} alt="" />
        </li>
        <li className="list-item">
          <div className="item">
            <p>
              {dates[2].day} {dates[2].date}
            </p>
            <p>
              {temps[2]} {isTempUnit ? "℃" : "℉"}
            </p>
          </div>
          <img src={iconsURL[2]} alt="" />
        </li>
        <li className="list-item">
          <div className="item">
            <p>
              {dates[3].day} {dates[3].date}
            </p>
            <p>
              {temps[3]} {isTempUnit ? "℃" : "℉"}
            </p>
          </div>
          <img src={iconsURL[3]} alt="" />
        </li>
        <li className="list-item">
          <div className="item">
            <p>
              {dates[4].day} {dates[4].date}
            </p>
            <p>
              {temps[4]} {isTempUnit ? "℃" : "℉"}
            </p>
          </div>
          <img src={iconsURL[4]} alt="" />
        </li>
      </ul>
    </div>
  );
};

export default WeekOverview;
