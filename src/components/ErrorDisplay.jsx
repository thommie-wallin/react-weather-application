import React from "react";
import { useForecastContext } from "../services/contexts/forecast-context";
import Card from "./ui/Card";
import IndexContainer from "./layouts/page-container/IndexContainer";

const ErrorDisplay = () => {
  const { error } = useForecastContext();
  return (
    <IndexContainer>
      <Card title={"Something went wrong! Please try again."}>
        <p className="error-text">
          Error: {JSON.stringify(error.error.message)}
        </p>
      </Card>
    </IndexContainer>
  );
};

export default ErrorDisplay;
