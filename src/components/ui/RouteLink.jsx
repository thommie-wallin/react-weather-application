import React from "react";
import { NavLink } from "react-router-dom";

const RouteLink = ({ pathAdress, pathName }) => {
  return (
    <NavLink to={`${pathAdress}`} className="nav-list-link">
      {pathName}
    </NavLink>
  );
};

export default RouteLink;
