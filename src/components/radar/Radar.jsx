import React from "react";
import Card from "../ui/Card";
import "../../styles/Radar.css";
import { useForecastContext } from "../../services/contexts/forecast-context";
import RadarDisplay from "../layouts/page-container/pages/RadarDisplay";
import {
  MapContainer,
  TileLayer,
  Marker,
  ImageOverlay,
  LayersControl,
} from "react-leaflet";

const Radar = () => {
  const { locationName, position } = useForecastContext();
  return (
    <Card title={locationName}>
      <RadarDisplay position={position} />
    </Card>
  );
};

export default Radar;
