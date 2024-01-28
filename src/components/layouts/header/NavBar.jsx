import React from "react";
import { routes } from "../../../router/routes";
import RouteLink from "../../ui/RouteLink";

const NavBar = () => {
  return (
    <nav id="navbar">
      {routes.map(({ path, title }, i) => {
        return <RouteLink key={i} pathAdress={path} pathName={title} />;
      })}
    </nav>
  );
};

export default NavBar;
