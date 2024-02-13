import React from "react";
import getImageURL from "../../utils/image-util";

const ForecastIcon = ({ iconName, iconAlt }) => {
  return <img src={getImageURL(iconName)} alt={`${iconAlt} icon`} />;
};

export default ForecastIcon;
