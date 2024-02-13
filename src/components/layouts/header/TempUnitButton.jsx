import React from "react";

const TempUnitButton = ({ isTempUnitC, toggleTempUnit }) => {
  return (
    <button className="tempunit-button" onClick={toggleTempUnit}>
      <span>{isTempUnitC ? "℃" : "℉"}</span>
    </button>
  );
};

export default TempUnitButton;
