import {
  CLOUDS_LAYER,
  PRECIPITATION_LAYER,
  PRESSURE_LAYER,
  TEMPERATURE_LAYER,
  WIND_LAYER,
} from "../utils/constants";

const legendData = [
  {
    name: TEMPERATURE_LAYER,
    title: "Temperature",
    scaleC: [-65, -55, -45, -40, -30, -20, -10, 0, 10, 20, 25, 30],
    scaleF: [-85, -67, -49, -40, -22, -4, 14, 32, 50, 68, 77, 86],
    className: "temperature",
  },
  {
    name: CLOUDS_LAYER,
    title: "Clouds, %",
    scale: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    className: "clouds",
  },
  {
    name: PRECIPITATION_LAYER,
    title: "Precipitation, mm",
    scale: [0, 0.1, 0.2, 0.5, 1, 10, 140],
    className: "precipitation",
  },
  {
    name: PRESSURE_LAYER,
    title: "Pressure, hPa",
    scale: [940, 960, 980, 1000, 1010, 1020, 1040, 1060, 1080],
    className: "pressure",
  },
  {
    name: WIND_LAYER,
    title: "Wind speed, m/s",
    scale: [1, 5, 15, 25, 50, 100, 200],
    className: "wind",
  },
];

export default legendData;
