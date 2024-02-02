import React from "react";
import Card from "../ui/Card";
import "../../styles/Radar.css";
import { useForecastContext } from "../../services/contexts/forecast-context";
import RadarDisplay from "../layouts/page-container/pages/RadarDisplay";

const Radar = () => {
  const { locationName } = useForecastContext();
  return (
    <Card title={locationName}>
      <RadarDisplay />
    </Card>
  );
};

export default Radar;
