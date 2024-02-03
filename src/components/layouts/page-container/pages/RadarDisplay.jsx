import React from "react";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  LayersControl,
  Popup,
} from "react-leaflet";

const RadarDisplay = ({ position }) => {
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
      <LayersControl position="topright">
        <LayersControl.Overlay name="Temperature">
          <TileLayer
            attribution=""
            url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${
              import.meta.env.VITE_WEATHER_API_KEY
            }`}
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Clouds">
          <TileLayer
            attribution=""
            url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${
              import.meta.env.VITE_WEATHER_API_KEY
            }`}
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Precipitation">
          <TileLayer
            attribution=""
            url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${
              import.meta.env.VITE_WEATHER_API_KEY
            }`}
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Sea level pressure">
          <TileLayer
            attribution=""
            url={`https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${
              import.meta.env.VITE_WEATHER_API_KEY
            }`}
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Wind speed">
          <TileLayer
            attribution=""
            url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${
              import.meta.env.VITE_WEATHER_API_KEY
            }`}
          />
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
};

export default RadarDisplay;
