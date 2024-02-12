import React from "react";
import weatherIcons from "../../assets/icons";

const ForecastIcon = ({ iconName, iconAlt }) => {
  const [icon] = weatherIcons.filter((d) => {
    if (d.name === iconName) {
      return d.src;
    }
  });
  return <img src={icon.src} alt={`${iconAlt} icon`} />;
};

export default ForecastIcon;
