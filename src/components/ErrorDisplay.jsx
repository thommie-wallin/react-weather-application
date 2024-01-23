import React from "react";
import { useForecast } from "../services/contexts/forecast-context";

const ErrorDisplay = () => {
  const { error } = useForecast();
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
