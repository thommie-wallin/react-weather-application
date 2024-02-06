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
        <colgroup span={2}></colgroup>
        <tbody>
          <tr>
            <th colSpan="2" scope="colgroup" className="popup-header">
              {currentWeather.name}
            </th>
          </tr>
          <tr>
            <td className="popup-param-name">Temp</td>
            <td className="popup-param">
              {temp} {isTempUnitC ? "℃" : "℉"}
            </td>
          </tr>
          <tr>
            <td className="popup-param-name">Clouds</td>
            <td className="popup-param">{currentWeather.clouds.all}%</td>
          </tr>
          <tr>
            <td className="popup-param-name">Humidity</td>
            <td className="popup-param">{currentWeather.main.humidity}%</td>
          </tr>
          <tr>
            <td className="popup-param-name">Pressure</td>
            <td className="popup-param">{currentWeather.main.pressure} hPa</td>
          </tr>
          <tr>
            <td className="popup-param-name">Wind Direction</td>
            <td className="popup-param">{currentWeather.wind.deg}°</td>
          </tr>
          <tr>
            <td className="popup-param-name">Wind Speed</td>
            <td className="popup-param">{currentWeather.wind.speed} m/s</td>
          </tr>
        </tbody>
      </table>
    </Popup>
  );
};

export default MapMarkerPopup;
