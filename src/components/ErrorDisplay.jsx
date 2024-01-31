import React from "react";
import { useForecastContext } from "../services/contexts/forecast-context";
import Card from "./ui/Card";

const ErrorDisplay = () => {
  const { error } = useForecastContext();
  return (
    <Card title={"Something went wrong! Please try again."}>
      <p className="error-text">Error: {JSON.stringify(error.error.message)}</p>
    </Card>
  );
};

export default ErrorDisplay;
