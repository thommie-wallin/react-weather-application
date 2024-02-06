import React from "react";
import { Popup } from "react-leaflet";
import { useForecastContext } from "../../services/contexts/forecast-context";
import { tempUnitConverter } from "../../utils/numberUtils";

const MapMarkerPopup = () => {
  const { currentWeather, isTempUnitC } = useForecastContext();

  // Toggle celsius or fahrenheit, temp rounded to one decimal.
  const temp = tempUnitConverter(isTempUnitC, currentWeather.main.temp);
  return (
    <Popup>
      <table>
        <colgroup>
          <col span={2} />
        </colgroup>
        <tbody>
          <tr>
            <th scope="col">{currentWeather.name}</th>
          </tr>
          <tr>
            <td>Temp</td>
            <td>
              {temp} {isTempUnitC ? "℃" : "℉"}
            </td>
          </tr>
          <tr>
            <td>Clouds</td>
            <td>{currentWeather.clouds.all}%</td>
          </tr>
          <tr>
            <td>Humidity</td>
            <td>{currentWeather.main.humidity}%</td>
          </tr>
          <tr>
            <td>Pressure</td>
            <td>{currentWeather.main.pressure} hPa</td>
          </tr>
          <tr>
            <td>Wind Direction</td>
            <td>{currentWeather.wind.deg}°</td>
          </tr>
          <tr>
            <td>Wind Speed</td>
            <td>{currentWeather.wind.speed} m/s</td>
          </tr>
        </tbody>
      </table>
    </Popup>
  );
};

export default MapMarkerPopup;
