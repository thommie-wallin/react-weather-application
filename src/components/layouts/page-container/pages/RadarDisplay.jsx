import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  LayersControl,
  Popup,
  useMapEvents,
  useMapEvent,
} from "react-leaflet";
import L from "leaflet";
import { useMap } from "react-leaflet/hooks";
import { ScaleControl } from "react-leaflet/ScaleControl";
import { AttributionControl } from "react-leaflet/AttributionControl";
import { Rectangle } from "react-leaflet/Rectangle";

function Legend({ layerName }) {
  const map = useMap();
  // const mapEvent = useMapEvents({
  //   // click: () => {
  //   //   map.locate();
  //   // },
  //   // locationfound: (location) => {
  //   //   console.log("location found:", location);
  //   // },
  //   add: (e) => {
  //     console.log("layer", e.target);
  //   },
  // });
  console.log(layerName);

  useEffect(() => {
    const legend = L.control({ position: "bottomright" });
    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "info legend");
      div.innerHTML = `<h4>${layerName}</h4>`;
      return div;
    };
    legend.addTo(map);
    // legend.onAdd();

    return () => {
      legend.remove();
    };
  }, [layerName]);

  return null;
  // return <div className="leaflet-bottom leaflet-right">Test</div>;
}

const RadarDisplay = ({ position }) => {
  const [layerName, setLayerName] = useState("");
  return (
    <MapContainer center={[position.latitude, position.longitude]} zoom={5}>
      {/* <AttributionControl position="bottomright" /> */}
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
        <LayersControl.BaseLayer name="Temperature" checked={false}>
          <TileLayer
            attribution=""
            url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${
              import.meta.env.VITE_WEATHER_API_KEY
            }`}
            eventHandlers={{
              add: (e) => {
                // console.log("Added Layer:", e);
                setLayerName("temperature");
              },
              remove: (e) => {
                console.log("Removed layer:", e.target);
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
                console.log("Added Layer:", e.target);
              },
              remove: (e) => {
                console.log("Removed layer:", e.target);
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
                console.log("Added Layer:", e.target);
              },
              remove: (e) => {
                console.log("Removed layer:", e.target);
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
                console.log("Added Layer:", e.target);
              },
              remove: (e) => {
                console.log("Removed layer:", e.target);
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
                console.log("Added Layer:", e.target);
              },
              remove: (e) => {
                console.log("Removed layer:", e.target);
              },
            }}
          />
        </LayersControl.BaseLayer>
      </LayersControl>
      {/* <LayersControl position="bottomright">
        <LayersControl.BaseLayer name="Wind speed">
          <TileLayer
            attribution=""
            url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${
              import.meta.env.VITE_WEATHER_API_KEY
            }`}
          />
        </LayersControl.BaseLayer>
      </LayersControl> */}
    </MapContainer>
  );
};

export default RadarDisplay;
