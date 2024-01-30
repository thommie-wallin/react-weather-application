import React from "react";

const HeaderButton = ({ isTempUnitC, toggleTempUnit }) => {
  return (
    <button className="header-button" onClick={toggleTempUnit}>
      Change to {isTempUnitC ? "℉" : "℃"}
    </button>
  );
};

export default HeaderButton;
