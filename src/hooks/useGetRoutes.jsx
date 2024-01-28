import React from "react";
import { Route } from "react-router-dom";
import { routes } from "../router/routes";
import RootLayout from "../components/layouts/RootLayout";

const useGetRoutes = () => {
  return (
    <Route path="/" element={<RootLayout />}>
      {routes.map(({ path, element }, i) => (
        <Route key={i} path={path} element={element} />
      ))}
    </Route>
  );
};

export default useGetRoutes;
