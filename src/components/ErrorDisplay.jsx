import React from "react";
import { useForecastContext } from "../services/contexts/forecast-context";

const ErrorDisplay = () => {
  const { error } = useForecastContext();
  return (
    <div>
      <p>
        Something went wrong! Please try again. Error:{" "}
        {JSON.stringify(error.error.message)}
      </p>
    </div>
  );
};

export default ErrorDisplay;
