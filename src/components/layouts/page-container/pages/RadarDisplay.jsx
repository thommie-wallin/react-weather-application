import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  LayersControl,
  Popup,
} from "react-leaflet";
import { ScaleControl } from "react-leaflet/ScaleControl";
import {
  CLOUDS_LAYER,
  PRECIPITATION_LAYER,
  PRESSURE_LAYER,
  TEMPERATURE_LAYER,
  WIND_LAYER,
} from "../../../../utils/constants";
import Legend from "../../../radar/MapLegend";

const RadarDisplay = ({ position }) => {
  const [layerName, setLayerName] = useState("");
  return (
    <MapContainer center={[position.latitude, position.longitude]} zoom={5}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[position.latitude, position.longitude]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <ScaleControl position="bottomleft" />
      <Legend layerName={layerName} />
      <LayersControl position="topright">
        <LayersControl.BaseLayer name="Temperature" checked={true}>
          <TileLayer
            attribution=""
            url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${
              import.meta.env.VITE_WEATHER_API_KEY
            }`}
            eventHandlers={{
              add: (e) => {
                // console.log("Added Layer:", e);
                setLayerName(TEMPERATURE_LAYER);
              },
              remove: (e) => {
                // console.log("Removed layer:", e.target);
              },
            }}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Clouds" checked={false}>
          <TileLayer
            attribution=""
            url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${
              import.meta.env.VITE_WEATHER_API_KEY
            }`}
            eventHandlers={{
              add: (e) => {
                // console.log("Added Layer:", e.target);
                setLayerName(CLOUDS_LAYER);
              },
              remove: (e) => {
                // console.log("Removed layer:", e.target);
              },
            }}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Precipitation">
          <TileLayer
            attribution=""
            url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${
              import.meta.env.VITE_WEATHER_API_KEY
            }`}
            eventHandlers={{
              add: (e) => {
                // console.log("Added Layer:", e.target);
                setLayerName(PRECIPITATION_LAYER);
              },
              remove: (e) => {
                // console.log("Removed layer:", e.target);
              },
            }}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Sea level pressure">
          <TileLayer
            attribution=""
            url={`https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${
              import.meta.env.VITE_WEATHER_API_KEY
            }`}
            eventHandlers={{
              add: (e) => {
                // console.log("Added Layer:", e.target);
                setLayerName(PRESSURE_LAYER);
              },
              remove: (e) => {
                // console.log("Removed layer:", e.target);
              },
            }}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Wind speed">
          <TileLayer
            attribution=""
            url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${
              import.meta.env.VITE_WEATHER_API_KEY
            }`}
            eventHandlers={{
              add: (e) => {
                // console.log("Added Layer:", e.target);
                setLayerName(WIND_LAYER);
              },
              remove: (e) => {
                // console.log("Removed layer:", e.target);
              },
            }}
          />
        </LayersControl.BaseLayer>
      </LayersControl>
    </MapContainer>
  );
};

export default RadarDisplay;
