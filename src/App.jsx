import React from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./router/create-router.jsx";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
