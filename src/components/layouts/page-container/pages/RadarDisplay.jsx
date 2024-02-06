import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  LayersControl,
  Popup,
} from "react-leaflet";
import { ScaleControl } from "react-leaflet/ScaleControl";
import Legend from "../../../radar/MapLegend";
import legendData from "../../../../data/radar-map-legend";
import MapLayersControlBaseLayer from "../../../radar/MapLayersControlBaseLayer";

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
        {legendData.map((d, i) => {
          return (
            <MapLayersControlBaseLayer
              key={i}
              layerName={d.name}
              title={d.title}
              mapLayer={d.mapLayer}
              checked={d.defaultChecked}
              setLayerName={setLayerName}
            />
          );
        })}
      </LayersControl>
    </MapContainer>
  );
};

export default RadarDisplay;
