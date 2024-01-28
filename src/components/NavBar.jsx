import React from "react";
import { routes } from "../config/routes";
import RouteLink from "./ui/RouteLink";

const NavBar = () => {
  return (
    <nav id="navbar">
      {routes.map(({ path, name }, i) => {
        return <RouteLink key={i} pathAdress={path} pathName={name} />;
      })}
    </nav>
  );
};

export default NavBar;
