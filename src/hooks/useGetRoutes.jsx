import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import { routes } from "../router/routes";
import Root from "../pages";
import LoadingDisplay from "../components/LoadingDisplay";
import { PageContainer } from "../components/layouts/page-container/PageContainer";

const useGetRoutes = () => {
  return (
    <Route path="/" element={<Root />}>
      {routes.map(({ path, element }, i) => (
        <Route
          key={i}
          path={path}
          element={
            <Suspense
              fallback={
                <PageContainer>
                  <LoadingDisplay />
                </PageContainer>
              }
            >
              {element}
            </Suspense>
          }
        />
      ))}
    </Route>
  );
};

export default useGetRoutes;
