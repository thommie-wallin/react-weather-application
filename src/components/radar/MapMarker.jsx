import React from "react";
import { Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import MapMarkerPopup from "./MapMarkerPopup";
import iconMarker from "leaflet/dist/images/marker-icon.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let defaultIcon = L.icon({
  iconRetinaUrl: iconRetina,
  iconUrl: iconMarker,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  tooltipAnchor: [13, -25],
});

const MapMarker = ({ position }) => {
  return (
    <Marker
      position={[position.latitude, position.longitude]}
      icon={defaultIcon}
    >
      <MapMarkerPopup />
      <Tooltip>Click me!</Tooltip>
    </Marker>
  );
};

export default MapMarker;
