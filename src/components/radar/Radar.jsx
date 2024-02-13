import React from "react";
import Card from "../ui/Card";
import "../../styles/Radar.css";
import { useForecastContext } from "../../services/contexts/forecast-context";
import RadarDisplay from "../layouts/page-container/pages/RadarDisplay";

const Radar = () => {
  const { position, locationName } = useForecastContext();
  return (
    <Card title={"Current - updates every 3 hours"}>
      <RadarDisplay position={position} locationName={locationName} />
    </Card>
  );
};

export default Radar;
