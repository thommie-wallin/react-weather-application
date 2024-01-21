import React from "react";
import { Route } from "react-router-dom";

export const PageContainer = ({ children, path }) => {
  return <Route path={`${path}`}>{children}</Route>;
};
