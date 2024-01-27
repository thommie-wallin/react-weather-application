import React from "react";
import { Link } from "react-router-dom";

const RouteLink = ({ linkAdress, pathName }) => {
  return (
    <Link to={`${linkAdress}`} className="nav-list-link">
      <li>{pathName}</li>
    </Link>
  );
};

export default RouteLink;
