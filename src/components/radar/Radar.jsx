import React from "react";
import Card from "../ui/Card";
import "../../styles/Radar.css";
import { useForecastContext } from "../../services/contexts/forecast-context";
import RadarDisplay from "../layouts/page-container/pages/RadarDisplay";

const Radar = () => {
  const { position } = useForecastContext();
  return (
    <Card title={"Current - updates every 3 hours"}>
      <RadarDisplay position={position} />
    </Card>
  );
};

export default Radar;
