import React from "react";

const ErrorDisplay = (error) => {
  return (
    <div>
      <p>Something went wrong! Please try again. Error: {error}</p>
    </div>
  );
};

export default ErrorDisplay;
