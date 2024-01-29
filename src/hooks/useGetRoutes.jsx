import React from "react";
import { Route } from "react-router-dom";
import { routes } from "../router/routes";
import Root from "../pages";

const useGetRoutes = () => {
  return (
    <Route path="/" element={<Root />}>
      {routes.map(({ path, element }, i) => (
        <Route key={i} path={path} element={element} />
      ))}
    </Route>
  );
};

export default useGetRoutes;
