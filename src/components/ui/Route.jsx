import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { routes } from "../../config/routes";

const RouterController = () => {
  return (
    <div>
      {routes.map(({ path, component }, i) => (
        <Route
          key={i}
          pathAdress={path}
          render={() => <div>{component}</div>}
          // element={}
        />
      ))}
      {/* <Route path={`${pathAdress}`}>{element}</Route> */}
    </div>
  );
};

export default RouterController;
