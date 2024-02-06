import React from "react";
import { LayersControl, TileLayer } from "react-leaflet";
import { MAPS_API_URL } from "../../utils/constants";

const MapLayersControlBaseLayer = ({
  layerName,
  title,
  mapLayer,
  checked,
  setLayerName,
}) => {
  return (
    <LayersControl.BaseLayer name={title} checked={checked}>
      <TileLayer
        attribution='Weather data provided by <a href="https://openweathermap.org/">OpenWeather</a>'
        url={`${MAPS_API_URL}/${mapLayer}/{z}/{x}/{y}.png?appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }`}
        eventHandlers={{
          add: () => {
            setLayerName(layerName);
          },
        }}
      />
    </LayersControl.BaseLayer>
  );
};

export default MapLayersControlBaseLayer;
