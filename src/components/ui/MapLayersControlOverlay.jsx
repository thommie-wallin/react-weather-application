import React from "react";
import { LayersControl, TileLayer } from "react-leaflet";

const MapTileLayer = ({ url }) => {
  return (
    <LayersControl.Overlay name="Temperature">
      <TileLayer
        attribution=""
        url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }`}
      />
    </LayersControl.Overlay>
  );
};

export default MapTileLayer;
