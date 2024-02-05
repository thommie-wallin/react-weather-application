import React from "react";
import { LayersControl, TileLayer } from "react-leaflet";
import { MAPS_API_URL } from "../../utils/constants";

const MapTileLayer = ({ name, layerName, setLayerName, checked = false }) => {
  return (
    <LayersControl.Overlay name={name} checked={checked}>
      <TileLayer
        attribution=""
        url={`${MAPS_API_URL}/${layerName}/{z}/{x}/{y}.png?appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }`}
        eventHandlers={{
          add: (e) => {
            // console.log("Added Layer:", e);
            setLayerName(layerName);
          },
          // remove: (e) => {
          //   console.log("Removed layer:", e.target);
          // },
        }}
      />
    </LayersControl.Overlay>
  );
};

export default MapTileLayer;
