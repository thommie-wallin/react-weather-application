import "../../styles/WeekOverview.css";
import { filterTemps } from "../../utils/numberUtils";
import { tempUnitConverter } from "../../utils/numberUtils";

const WeekOverview = ({ weatherData, isTempUnit }) => {
  const imgUrl = "https://openweathermap.org/img/wn";

  // Get 5 dates and weekdays out of every week
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

  // Filter 5 day / 3 hour forecast data (each day have 8 readings).
  const dailyForecasts = filterTemps(weatherData.list, 8);

  // Get temperatures
  const temps = dailyForecasts.map((t) => {
    // Toggle celsius or fahrenheit, temp rounded to one decimal and parsed into an integer.
    const temp = tempUnitConverter(isTempUnit, t.main.temp);
    return temp;
  });

  return (
    <div className="content-overview">
      <h3>Week overview</h3>
      <ul className="list-overview">
        <li className="list-item">
          <div className="item">
            {/* <p>Today</p> */}
            <p>
              {dates[0].day} {dates[0].date}
            </p>
            <p>
              {temps[0]} {isTempUnit ? "℃" : "℉"}
            </p>
          </div>
          <img
            src={`${imgUrl}/${dailyForecasts[0].weather[0].icon}.png`}
            alt=""
          />
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
          <img
            src={`${imgUrl}/${dailyForecasts[1].weather[0].icon}.png`}
            alt=""
          />
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
          <img
            src={`${imgUrl}/${dailyForecasts[2].weather[0].icon}.png`}
            alt=""
          />
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
          <img
            src={`${imgUrl}/${dailyForecasts[3].weather[0].icon}.png`}
            alt=""
          />
        </li>
        <li>
          <div className="item">
            <p>
              {dates[4].day} {dates[4].date}
            </p>
            <p>
              {temps[4]} {isTempUnit ? "℃" : "℉"}
            </p>
          </div>
          <img
            src={`${imgUrl}/${dailyForecasts[4].weather[0].icon}.png`}
            alt=""
          />
        </li>
      </ul>
    </div>
  );
};

export default WeekOverview;
