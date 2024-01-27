import React from "react";
import { routes } from "../config/routes";
import RouteLink from "./ui/RouteLink";

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        {routes.map((route, i) => {
          return (
            <RouteLink key={i} linkAdress={route.path} pathName={route.name} />
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
