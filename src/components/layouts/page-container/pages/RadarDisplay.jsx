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
import legendData from "../../../../data/radar-map-legend";
import { useForecastContext } from "../../../../services/contexts/forecast-context";

function Legend({ layerName }) {
  const { isTempUnitC } = useForecastContext();
  const map = useMap();

  let title = "";
  let scaleTemp = [];
  let className = "";
  let tempUnit = isTempUnitC ? "℃" : "℉";
  legendData.filter((d, i) => {
    if (d.name === layerName) {
      title = d.title;
      scaleTemp =
        layerName !== "temperature"
          ? d.scale
          : isTempUnitC
            ? d.scaleC
            : d.scaleF;
      className = d.className;
    }
  });

  const scale = scaleTemp.map((d, i) => `<p key=${i}>${d}</p>`).join("");

  useEffect(() => {
    const legend = L.control({ position: "bottomright" });
    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "legend");
      div.style.margin = "5px";
      div.innerHTML = `
        <p class="legend-title">${title} ${
          layerName === "temperature" && tempUnit
        }</p>
        <div>
          <div class="scale-dividers">
            ${scale}
          </div>
          <div class="horizontal-gradient-scale ${className}"></div>
        </div>
      `;
      return div;
    };
    legend.addTo(map);

    return () => {
      legend.remove();
    };
  }, [layerName, isTempUnitC]);

  return null;
  // return (
  //   <div className="leaflet-bottom leaflet-right">
  //     <div className="info legend">
  //       <h4>{layerName}</h4>
  //       <div>
  //         <div className="scale-dividers">
  //           {scale.map((d, i) => (
  //             <p key={i}>{d}</p>
  //           ))}
  //         </div>
  //         <div className="horizontal-gradient-scale temperature"></div>
  //       </div>
  //     </div>
  //   </div>
  // );
}

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
                setLayerName("temperature");
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
                setLayerName("clouds");
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
                setLayerName("precipitation");
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
                setLayerName("pressure");
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
                setLayerName("wind");
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
