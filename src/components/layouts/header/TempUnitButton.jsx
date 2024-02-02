import React from "react";

const TempUnitButton = ({ isTempUnitC, toggleTempUnit }) => {
  return (
    <button className="tempunit-button" onClick={toggleTempUnit}>
      {/* Change to {isTempUnitC ? "℉" : "℃"} */}
      <p>{isTempUnitC ? "℉" : "℃"}</p>
    </button>
  );
};

export default TempUnitButton;
